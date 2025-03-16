import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Info } from "lucide-react";
import { Agent } from "../types";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { toast } from "sonner";
import { useAccount, useSignMessage } from "wagmi";

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INTERVALS = [
  { value: "3", label: "Every 3 hours" },
  { value: "6", label: "Every 6 hours" },
  { value: "12", label: "Every 12 hours" },
  { value: "24", label: "Daily" },
  { value: "168", label: "Weekly" },
];

const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [ticker, setTicker] = useState("");
  const [email, setEmail] = useState("");
  const [interval, setInterval] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const client = new ZerePyClient("http://localhost:8001");

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = ticker && email && interval && isValidEmail(email);

  const createPriceAlertAgent = async () => {
    if (!address) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to create an agent",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a descriptive name and task
      const workflowName = `${ticker} Price Alert (${interval}h)`;
      const task = `Send me a price alert for token symbol ${ticker} to ${email} every ${interval} hours`;

      // Create the agents sequence
      const agents: Agent[] = [
        {
          title: "scheduler",
          type: "scheduler",
          prompt: `Schedule a task`,
          next: "price-checker",
        },
        {
          title: "price-checker",
          type: "price_predictor",
          prompt: `Check the current price of ${ticker} and provide detailed information including 24h change and market cap.`,
          next: "email_formatter",
        },
        {
          title: "email_formatter",
          type: "text",
          prompt: `Format the price data into a clean, readable email template that includes the price, 24h change, volume, and a brief market summary for ${ticker}. It should just return (recepient, body)`,
          next: "notifier",
        },
        {
          title: "notifier",
          type: "email",
          prompt: `Send the formatted price alert information to ${email}. Make sure the subject line includes "${ticker} Price Alert" and the current price.`,
          next: "FINISH",
        },
      ];

      const agentNames = agents.map((agent) => agent.title);

      const prompts: Record<string, string> = {};
      agents.forEach((agent) => {
        prompts[agent.title] = agent.prompt;
      });

      const data: Record<string, Record<string, any>> = {};
      agents.forEach((agent) => {
        data[agent.title] = {
          name: agent.type,
          next: agent.next,
        };
      });

      // Sign the authorization message
      const messageToSign = `I authorize creating an agent with my address: ${address}`;

      try {
        const signature = await signMessageAsync({ message: messageToSign });

        await toast.promise(
          client.createAgent(
            agentNames,
            prompts,
            data,
            task,
            address,
            workflowName,
            false, // Not a one-time agent
            signature
          ),
          {
            loading: "Creating price alert agent...",
            success: () => {
              setIsSubmitting(false);
              onClose();
              onSuccess();
              return "Price alert agent created successfully!";
            },
            error: (err) => {
              setIsSubmitting(false);
              return `Error: ${
                err.message || "Failed to create price alert agent"
              }`;
            },
          }
        );
      } catch {
        toast.error("Signature rejected", {
          description: "You need to sign the message to create an agent",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Error creating price alert agent", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Configure Price Alert
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="crypto-ticker" className="text-right">
              Cryptocurrency
            </Label>
            <Input
              id="crypto-ticker"
              placeholder="Select cryptocurrency"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alert-interval" className="text-right">
              Alert Interval
            </Label>
            <div className="col-span-3">
              <Select value={interval} onValueChange={setInterval}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  {INTERVALS.map((int) => (
                    <SelectItem key={int.value} value={int.value}>
                      {int.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 mt-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-sm text-blue-800 dark:text-blue-300">
              This will create a reusable agent workflow that sends price
              updates at your chosen interval.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={createPriceAlertAgent}
            disabled={!isFormValid || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              "Create Price Alert"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriceAlertModal;
