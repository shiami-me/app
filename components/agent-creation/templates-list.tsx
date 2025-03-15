import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Sparkles } from "lucide-react";
import PriceAlertModal from './templates/price-alert-modal';

interface TemplateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  icon,
  onSelect
}) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary/50 hover:border-l-primary" onClick={onSelect}>
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-primary-foreground flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};

interface TemplatesListProps {
  onSelect: (templateId: string) => void;
}

const TemplatesList: React.FC<TemplatesListProps> = () => {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  
  // Success handler for when the price alert agent is created
  const handlePriceAlertSuccess = () => {
    // You could add additional functionality here like showing a success message,
    // redirecting to the agents list, etc.
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Popular Templates</h2>
        <p className="text-muted-foreground mb-4">
          Start with a pre-configured agent workflow to solve common tasks
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <TemplateCard 
            title="Crypto Price Alert"
            description="Monitor cryptocurrency prices and receive alerts based on custom conditions"
            icon={<TrendingUp className="h-6 w-6" />}
            onSelect={() => setIsPriceModalOpen(true)}
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground mb-4">
          More templates are being developed to expand your agent capabilities
        </p>
        
        <Card className="p-6 bg-muted/50 border border-dashed">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary/50">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-muted-foreground">More Templates</h3>
              <p className="text-muted-foreground/70">
                More coming soon
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Price Alert Modal */}
      <PriceAlertModal 
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onSuccess={handlePriceAlertSuccess}
      />
    </div>
  );
};

export default TemplatesList;
