import React, { useState, useEffect, useRef } from 'react';
import { generateStartupIdea } from './services/geminiService';
import { IdeaData, AppState } from './types';
import Dashboard from './components/Dashboard';
import { Sparkles, Search, Loader2, Save, History as HistoryIcon, Share } from 'lucide-react';

const INITIAL_PROMPT = "An app that helps people read books efficiently";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [ideaData, setIdeaData] = useState<IdeaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Ref for the input to focus on mount
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setAppState(AppState.LOADING);
    setError(null);
    setIdeaData(null); // Clear previous data for dramatic effect, or keep it. Let's clear.

    try {
      const data = await generateStartupIdea(prompt);
      setIdeaData(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to spark idea. The AI might be taking a coffee break. Try again.");
      setAppState(AppState.ERROR);
    }
  };

  // Example automatic load (optional, can be removed if user should start blank)
  useEffect(() => {
    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Gemini Spark</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
            <button className="hidden md:flex items-center gap-2 hover:text-white transition-colors">
              <HistoryIcon className="w-4 h-4" /> History
            </button>
            <button className="hidden md:flex items-center gap-2 hover:text-white transition-colors">
              <Save className="w-4 h-4" /> Saved
            </button>
             <button className="flex items-center gap-2 hover:text-white transition-colors">
              <Share className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search/Input Section - Centered when idle, Top when success */}
        <div className={`transition-all duration-500 ease-in-out w-full max-w-2xl mx-auto ${appState === AppState.IDLE || appState === AppState.ERROR ? 'mt-[20vh]' : 'mt-0 mb-8'}`}>
          <div className="text-center mb-8">
            {appState === AppState.IDLE && (
              <>
                <h2 className="text-4xl font-bold text-white mb-3">What are you building?</h2>
                <p className="text-slate-400">Describe your idea, and let Gemini architect your startup.</p>
              </>
            )}
          </div>

          <form onSubmit={handleGenerate} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A social network for cat lovers..."
                className="w-full bg-[#151b2b] border border-slate-700 text-white placeholder-slate-500 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 shadow-2xl transition-all"
                disabled={appState === AppState.LOADING}
              />
              <Search className="absolute left-4 w-5 h-5 text-slate-500" />
              <button 
                type="submit" 
                disabled={!prompt.trim() || appState === AppState.LOADING}
                className="absolute right-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-700 text-white p-2 rounded-lg transition-colors"
              >
                {appState === AppState.LOADING ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {/* Quick suggestions if Idle */}
          {appState === AppState.IDLE && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Fitness tracker for gamers", 
                "AI powered recipe generator", 
                "Blockchain voting system",
                "CognitoFlow"
              ].map((suggestion) => (
                <button 
                  key={suggestion}
                  onClick={() => {
                    setPrompt(suggestion);
                    // Optional: auto-submit
                  }}
                  className="bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {appState === AppState.LOADING && (
          <div className="flex-1 flex flex-col items-center justify-center mt-12 animate-in fade-in duration-500">
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-violet-500/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-violet-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-slate-300 font-light animate-pulse">Consulting the digital oracle...</p>
            <p className="text-sm text-slate-500 mt-2">Generating market analysis and tech stacks</p>
          </div>
        )}

        {/* Error State */}
        {appState === AppState.ERROR && (
          <div className="text-center mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg max-w-lg mx-auto">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Results Dashboard */}
        {appState === AppState.SUCCESS && ideaData && (
          <Dashboard data={ideaData} />
        )}
      </main>
    </div>
  );
};

export default App;