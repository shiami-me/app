"use client";

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTheme } from 'next-themes';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TokenWeight {
  symbol: string;
  weight: number;
  color: string;
  logoURI?: string;
}

interface PoolTokenChartProps {
  tokens: TokenWeight[];
}

export const PoolTokenChart: React.FC<PoolTokenChartProps> = ({ tokens }) => {
  const { resolvedTheme } = useTheme();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Create chart data
    const data = {
      labels: tokens.map(t => t.symbol),
      datasets: [
        {
          data: tokens.map(t => t.weight * 100),
          backgroundColor: tokens.map(t => t.color),
          borderColor: resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, [tokens, resolvedTheme]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.toFixed(2)}%`;
          }
        }
      }
    },
    cutout: '40%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // Custom rendering for chart to include token logos
  const plugins = [{
    id: 'tokenLogos',
    afterDraw: (chart: any) => {
      const { ctx, chartArea } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      
      ctx.save();
      
      // Draw a semi-transparent circle in the middle
      ctx.beginPath();
      ctx.arc(centerX, centerY, chart.getDatasetMeta(0).data[0].outerRadius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = resolvedTheme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
      ctx.closePath();
      
      // Display total percentage or other info
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
      ctx.font = '14px Arial';
      ctx.fillText('Token Weights', centerX, centerY - 10);
      ctx.font = 'bold 16px Arial';
      ctx.fillText('100%', centerX, centerY + 10);
      
      ctx.restore();
    }
  }];

  if (!chartData) {
    return <div className="flex items-center justify-center h-full">Loading chart data...</div>;
  }

  return (
    <div className="w-full h-full">
      <Pie data={chartData} options={options} plugins={plugins} />
    </div>
  );
};
