import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ViabilityMetrics } from '../types';

interface ViabilityChartProps {
  data: ViabilityMetrics;
}

const ViabilityChart: React.FC<ViabilityChartProps> = ({ data }) => {
  const chartData = [
    { subject: 'Innovation', A: data.innovation, fullMark: 100 },
    { subject: 'Scalability', A: data.scalability, fullMark: 100 },
    { subject: 'Monetization', A: data.monetization, fullMark: 100 },
    { subject: 'Market Demand', A: data.marketDemand, fullMark: 100 },
    { subject: 'Feasibility', A: data.feasibility, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Viability"
            dataKey="A"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="#8b5cf6"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
            itemStyle={{ color: '#c4b5fd' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViabilityChart;