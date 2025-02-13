import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { Label } from './label';

interface ConfigOption {
  name: string;
  type: string;
  description: string;
  required: boolean;
  default?: string;
}

interface Tool {
  id: string;
  name: string;
  type: string;
  description: string;
  config_options: ConfigOption[];
}

interface ToolCardProps {
  tool: Tool;
  onConfigChange?: (config: Record<string, any>) => void;
  onRemove?: () => void;
}

export function ToolCard({ tool, onConfigChange, onRemove }: ToolCardProps) {
  const [config, setConfig] = useState<Record<string, any>>({});

  const handleConfigChange = (optionName: string, value: any) => {
    const newConfig = {
      ...config,
      [optionName]: value,
    };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{tool.name}</span>
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
        <div className="space-y-4">
          {tool.config_options.map((option) => (
            <div key={option.name}>
              <Label htmlFor={option.name}>
                {option.name}
                {option.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id={option.name}
                placeholder={option.description}
                defaultValue={option.default}
                onChange={(e) => handleConfigChange(option.name, e.target.value)}
                className="mt-1"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}