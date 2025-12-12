import React from 'react';
import { IdeaData } from '../types';
import ViabilityChart from './ViabilityChart';
import FeatureCard from './FeatureCard';
import { Rocket, Layers, Code, Target, BarChart3, BookOpen } from 'lucide-react';

interface DashboardProps {
  data: IdeaData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      {/* Header Section */}
      <div className="text-center py-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4 tracking-tight">
          {data.appName}
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 italic font-light">
          "{data.tagline}"
        </p>
      </div>

      {/* Elevator Pitch */}
      <div className="bg-[#151b2b] rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Rocket className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Elevator Pitch</h2>
        </div>
        <p className="text-lg text-slate-300 leading-relaxed">
          {data.elevatorPitch}
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-[#151b2b] rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Layers className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Key Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-[#151b2b] rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Code className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Recommended Tech Stack</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Frontend</h3>
            <p className="text-slate-200">{data.techStack.frontend}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Backend</h3>
            <p className="text-slate-200">{data.techStack.backend}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Database</h3>
            <p className="text-slate-200">{data.techStack.database}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AI Integration</h3>
            <p className="text-violet-300 font-medium">{data.techStack.aiIntegration}</p>
          </div>
        </div>
      </div>

      {/* Analysis Grid: Viability & Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Viability Analysis */}
        <div className="bg-[#151b2b] rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Viability Analysis</h2>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <ViabilityChart data={data.viability} />
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-[#151b2b] rounded-2xl p-6 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <Target className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Target Audience</h2>
          </div>
          <ul className="space-y-4">
            {data.targetAudience.map((audience, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
                <span className="text-slate-300 leading-relaxed">{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-20" /> {/* Bottom spacer */}
    </div>
  );
};

export default Dashboard;