import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowDown, 
  ArrowUp, 
  Plus, 
  Minus, 
  Wallet, 
  AlertCircle, 
  Loader2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useSiloDeposit, useSiloWithdraw, useSiloBorrow, useSiloRepay } from '@/hooks/silo';
import { toast } from "sonner"
import ConnectButton from "../connect-button";

interface ActionPanelProps {
  marketData: any;
  userData?: any;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ marketData, userData }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [activeSilo, setActiveSilo] = useState("silo0");
  const { isConnected } = useAccount();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSiloChange = (value: string) => {
    setActiveSilo(value);
  };
  
  const activeSiloData = activeSilo === "silo0" ? marketData.silo0 : marketData.silo1;
  const otherSiloData = activeSilo === "silo0" ? marketData.silo1 : marketData.silo0;
  const activeUserData = userData ? (activeSilo === "silo0" ? userData.silo0 : userData.silo1) : null;

  // Get token addresses for transactions
  const token0Address = activeSiloData.symbol;
  const token1Address = otherSiloData.symbol;

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 w-full rounded-none">
            <TabsTrigger value="deposit" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Plus className="h-4 w-4 mr-1" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <Minus className="h-4 w-4 mr-1" />
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="borrow" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <ArrowDown className="h-4 w-4 mr-1" />
              Borrow
            </TabsTrigger>
            <TabsTrigger value="repay" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              <ArrowUp className="h-4 w-4 mr-1" />
              Repay
            </TabsTrigger>
          </TabsList>
          
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">Select Token</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button 
                variant={activeSilo === "silo0" ? "default" : "outline"} 
                onClick={() => handleSiloChange("silo0")}
                className="flex items-center justify-center"
              >
                <Image
                  src={marketData.silo0.logos.coinGecko?.large || "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png"}
                  alt={marketData.silo0.symbol}
                  width={20}
                  height={20}
                  className="rounded-full mr-2"
                />
                {marketData.silo0.symbol}
              </Button>
              <Button 
                variant={activeSilo === "silo1" ? "default" : "outline"} 
                onClick={() => handleSiloChange("silo1")}
                className="flex items-center justify-center"
              >
                <Image
                  src={marketData.silo1.logos.coinGecko?.large || "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png"}
                  alt={marketData.silo1.symbol}
                  width={20}
                  height={20}
                  className="rounded-full mr-2"
                />
                {marketData.silo1.symbol}
              </Button>
            </div>
          </div>
          
          {!isConnected ? (
            <div className="px-4 py-6 text-center flex items-center flex-col">
              <Wallet className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Connect Wallet</h3>
              <p className="text-sm text-gray-500 mb-4">Connect your wallet to interact with Silo Finance markets</p>
              <ConnectButton />
            </div>
          ) : (
            <>
              <TabsContent value="deposit" className="p-4">
                <DepositPanel 
                  siloData={activeSiloData} 
                  userData={activeUserData} 
                  token0={token0Address} 
                  token1={token1Address} 
                />
              </TabsContent>
              
              <TabsContent value="withdraw" className="p-4">
                <WithdrawPanel 
                  siloData={activeSiloData} 
                  userData={activeUserData} 
                  token0={token0Address} 
                  token1={token1Address} 
                />
              </TabsContent>
              
              <TabsContent value="borrow" className="p-4">
                <BorrowPanel 
                  siloData={activeSiloData} 
                  userData={activeUserData} 
                  token0={token0Address} 
                  token1={token1Address} 
                />
              </TabsContent>
              
              <TabsContent value="repay" className="p-4">
                <RepayPanel 
                  siloData={activeSiloData} 
                  userData={activeUserData} 
                  token0={token0Address} 
                  token1={token1Address} 
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Action subcomponents
const DepositPanel = ({ siloData, userData, token0, token1 }: { siloData: any, userData?: any, token0: string, token1: string }) => {
  const [amount, setAmount] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const { deposit, loading } = useSiloDeposit();
  const depositAmount = (userData?.position?.totalCollateral / (10**siloData.decimals)).toFixed(6) || "0.00";

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    // Set to user's balance if available
    if (userData?.walletBalance) {
      setAmount(userData.walletBalance);
    }
  };

  const handleDeposit = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error("Invalid amount", {
        description: "Please enter a valid amount to deposit"
      });
      return;
    }

    try {
      await deposit(token0, token1, parseFloat(amount), isProtected ? 0 : 1);
      toast.success("Deposit successful", {
        description: `Successfully deposited ${amount} ${siloData.symbol}`
      });
      setAmount("");
      window.location.reload();
    } catch (error: any) {
      toast.error("Deposit failed", {
        description: error.message || "Failed to deposit. Please try again."
      });
    }
  };

  return (
    <div className="space-y-4">
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Deposit</label>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button variant="outline" className="rounded-l-none border-l-0 px-3" onClick={handleMaxClick}>
            MAX
          </Button>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Deposit Balance: {depositAmount} {siloData.symbol}</span>
          <span>Deposit APR: {((Number(siloData.collateralBaseApr) / 10**18) * 100).toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <div>
          <span className="text-sm font-medium">Protected Mode</span>
          <p className="text-xs text-gray-500">Protected deposits have priority during liquidations</p>
        </div>
        <Switch 
          checked={isProtected}
          onCheckedChange={setIsProtected}
        />
      </div>
      
      <Button 
        className="w-full" 
        onClick={handleDeposit} 
        disabled={loading || !amount}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Depositing...
          </>
        ) : (
          `Deposit ${siloData.symbol}`
        )}
      </Button>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>By depositing your assets into Silo Finance, your tokens become available for borrowers to use. In return, you earn interest on your deposit.</p>
      </div>
    </div>
  );
};

const WithdrawPanel = ({ siloData, userData, token0, token1 }: { siloData: any, userData?: any, token0: string, token1: string }) => {
  const [amount, setAmount] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const { withdraw, loading } = useSiloWithdraw();
  
  const depositAmount = (userData?.position?.totalCollateral / (10**siloData.decimals)).toFixed(6) || "0.00";
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    setAmount(depositAmount);
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error("Invalid amount", {
        description: "Please enter a valid amount to withdraw"
      });
      return;
    }

    try {
      await withdraw(token0, token1, parseFloat(amount), undefined, isProtected ? 0 : 1);
      toast.success("Withdraw successful", {
        description: `Successfully withdrawn ${amount} ${siloData.symbol}`
      });
      setAmount("");
      window.location.reload();
    } catch (error: any) {
      toast.error("Withdraw failed", {
        description: error.message || "Failed to withdraw. Please try again."
      });
    }
  };
  
  return (
    <div className="space-y-4">
      
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Your {siloData.symbol} Deposit</span>
          <span className="font-bold">{depositAmount} {siloData.symbol}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Withdraw</label>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button 
            variant="outline" 
            className="rounded-l-none border-l-0 px-3" 
            onClick={handleMaxClick}
            disabled={!parseFloat(depositAmount)}
          >
            MAX
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2">
        <div>
          <span className="text-sm font-medium">Protected Mode</span>
          <p className="text-xs text-gray-500">Protected borrows have priority during liquidations</p>
        </div>
        <Switch 
          checked={isProtected}
          onCheckedChange={setIsProtected}
        />
      </div>
      
      <Button 
        className="w-full" 
        disabled={!parseFloat(depositAmount) || loading || !amount} 
        onClick={handleWithdraw}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Withdrawing...
          </>
        ) : (
          `Withdraw ${siloData.symbol}`
        )}
      </Button>
      
      {/* Show warning if user has active borrows */}
      {userData?.position?.borrowedAmount && Number(userData.position.borrowedAmount) > 0 && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-700 dark:text-amber-400">You have active borrows</p>
            <p className="text-amber-600 dark:text-amber-500">
              Withdrawing collateral may affect your health factor. Ensure your position remains healthy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const BorrowPanel = ({ siloData, userData, token0, token1 }: { siloData: any, userData?: any, token0: string, token1: string }) => {
  const [amount, setAmount] = useState("");
  const { borrow, loading } = useSiloBorrow();
  
  const maxBorrow = userData?.position 
    ? (userData.position.maxBorrowAmount) / 10**siloData.decimals 
    : 0;
    
  const isBorrowDisabled = !siloData || siloData.isNonBorrowable || maxBorrow <= 0;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    if (maxBorrow > 0) {
      setAmount(maxBorrow.toFixed(4));
    }
  };

  const handleBorrow = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error("Invalid amount", {
        description: "Please enter a valid amount to borrow"
      });
      return;
    }

    try {
      await borrow(token0, token1, parseFloat(amount));
      toast.success("Borrow successful", {
        description: `Successfully borrowed ${amount} ${siloData.symbol}`
      });
      setAmount("");
      window.location.reload();
    } catch (error: any) {
      toast.error("Borrow failed", {
        description: error.message || "Failed to borrow. Please try again."
      });
    }
  };
  
  return (
    <div className="space-y-4">
      
      {siloData.isNonBorrowable && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-700 dark:text-amber-400">Borrowing not available</p>
            <p className="text-amber-600 dark:text-amber-500">
              This token is currently not available for borrowing.
            </p>
          </div>
        </div>
      )}
      
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Available to Borrow</span>
          <span className="font-bold">{maxBorrow.toFixed(4)} {siloData.symbol}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Borrow</label>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            disabled={isBorrowDisabled}
            value={amount}
            onChange={handleAmountChange}
          />
          <Button 
            variant="outline" 
            className="rounded-l-none border-l-0 px-3" 
            disabled={isBorrowDisabled}
            onClick={handleMaxClick}
          >
            MAX
          </Button>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Borrow APR: {((Number(siloData.debtBaseApr) / 10**18) * 100).toFixed(2)}%</span>
          <span>Max LTV: {((Number(siloData.maxLtv) / 10**18) * 100).toFixed(2)}%</span>
        </div>
      </div>
      
      <Button 
        className="w-full" 
        disabled={isBorrowDisabled || loading || !amount}
        onClick={handleBorrow}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Borrowing...
          </>
        ) : (
          `Borrow ${siloData.symbol}`
        )}
      </Button>
      
      {userData?.position && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            By borrowing, you&apos;re taking a loan against your deposited collateral. 
            Maintain a healthy position to avoid liquidation.
          </p>
        </div>
      )}
    </div>
  );
};

const RepayPanel = ({ siloData, userData, token0, token1 }: { siloData: any, userData?: any, token0: string, token1: string }) => {
  const [amount, setAmount] = useState("");
  const { repay, loading } = useSiloRepay();
  
  const borrowAmount = (userData?.position?.borrowedAmount / (10**siloData.decimals)).toFixed(6) || "0.00";
  const hasBorrow = parseFloat(borrowAmount) > 0;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleMaxClick = () => {
    if (hasBorrow) {
      setAmount(borrowAmount);
    }
  };

  const handleRepay = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error("Invalid amount", {
        description: "Please enter a valid amount to repay"
      });
      return;
    }

    try {
      await repay(token0, token1, parseFloat(amount));
      toast.success("Repay successful", {
        description: `Successfully repaid ${amount} ${siloData.symbol}`
      });
      setAmount("");
      window.location.reload();
    } catch (error: any) {
      toast.error("Repay failed", {
        description: error.message || "Failed to repay. Please try again."
      });
    }
  };
  
  return (
    <div className="space-y-4">
      
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Your {siloData.symbol} Debt</span>
          <span className="font-bold">{borrowAmount} {siloData.symbol}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Repay</label>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            disabled={!hasBorrow}
            value={amount}
            onChange={handleAmountChange}
          />
          <Button 
            variant="outline" 
            className="rounded-l-none border-l-0 px-3" 
            disabled={!hasBorrow}
            onClick={handleMaxClick}
          >
            MAX
          </Button>
        </div>
      </div>
      
      <Button 
        className="w-full" 
        disabled={!hasBorrow || loading || !amount}
        onClick={handleRepay}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Repaying...
          </>
        ) : (
          `Repay ${siloData.symbol}`
        )}
      </Button>
      
      {!hasBorrow && (
        <div className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg text-sm">
          <div className="text-center w-full text-gray-600 dark:text-gray-400">
            You don&apos;t have any {siloData.symbol} debt to repay
          </div>
        </div>
      )}
    </div>
  );
};
