import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-[#1e2538] border border-slate-800/50 hover:border-violet-500/30 transition-colors">
      <div className="flex-shrink-0 pt-1">
        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-100 mb-1">{feature.title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;