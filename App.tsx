import React, { useState } from 'react';
import { generateCuratedPlaylist } from './services/geminiService';
import { CurateOptions, DepthLevel, VibeType, PlaylistResponse } from './types';
import Controls from './components/Controls';
import VideoCard from './components/VideoCard';
import { Sparkles, Search, PlayCircle, Layers, ArrowRight, Loader2, Youtube } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playlistData, setPlaylistData] = useState<PlaylistResponse | null>(null);

  const [options, setOptions] = useState<CurateOptions>({
    durationMinutes: 45,
    depth: DepthLevel.BEGINNER,
    vibe: VibeType.EDUCATIONAL,
    isCourseMode: false,
  });

  const handleCurate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setPlaylistData(null);

    try {
      const data = await generateCuratedPlaylist(prompt, options);
      setPlaylistData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 selection:bg-brand-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center">
                <Layers className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CurateFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                <span className="hover:text-brand-400 cursor-pointer transition-colors">How it Works</span>
                <span className="hover:text-brand-400 cursor-pointer transition-colors">Pricing</span>
                <button className="bg-white text-dark-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                    Join Alpha
                </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header / Hero */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-brand-500 mb-6">
            Stop Scrolling. <br /> Start Curating.
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Bypass the algorithm trap. Tell us what you want to learn, feel, or experience, and we'll build the perfect structured flow for you in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-3 lg:order-1 order-2">
             <Controls options={options} setOptions={setOptions} disabled={isLoading} />
          </div>

          {/* Center/Right - Input & Results */}
          <div className="lg:col-span-9 lg:order-2 order-1 space-y-8">
            
            {/* Input Area */}
            <form onSubmit={handleCurate} className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative bg-dark-800 border border-dark-600 rounded-2xl p-2 flex items-center shadow-2xl">
                  <div className="p-3">
                     <Search className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your perfect playlist... (e.g., 'Learn to bake sourdough from scratch')"
                    className="w-full bg-transparent border-none text-lg text-white placeholder-gray-500 focus:ring-0 focus:outline-none py-3"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                    <span className="hidden sm:inline">Generate Flow</span>
                  </button>
               </div>
               
               {/* Quick Chips */}
               {!playlistData && !isLoading && (
                   <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start px-2">
                       {["Intro to React", "30m HIIT Workout", "History of Rome", "Jazz for Reading"].map(suggestion => (
                           <button 
                                key={suggestion}
                                type="button"
                                onClick={() => setPrompt(suggestion)}
                                className="text-xs bg-dark-800 hover:bg-dark-700 text-gray-400 border border-dark-700 rounded-full px-3 py-1 transition-colors"
                           >
                               {suggestion}
                           </button>
                       ))}
                   </div>
               )}
            </form>

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="relative w-20 h-20">
                         <div className="absolute top-0 left-0 w-full h-full border-4 border-dark-700 rounded-full"></div>
                         <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-brand-300 font-medium animate-pulse">Analyzing Video DNA...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-200 p-6 rounded-xl text-center">
                    <p>{error}</p>
                </div>
            )}

            {/* Results */}
            {playlistData && !isLoading && (
                <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                    
                    {/* Playlist Header */}
                    <div className="bg-gradient-to-r from-dark-800 to-dark-900 border border-dark-700 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-white">{playlistData.playlistName}</h2>
                                <span className="bg-brand-900/50 text-brand-300 text-xs font-mono py-1 px-2 rounded border border-brand-500/30">
                                    {playlistData.items.length} Videos
                                </span>
                                <span className="bg-dark-700 text-gray-300 text-xs font-mono py-1 px-2 rounded border border-dark-600">
                                    ~{playlistData.totalDuration}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm max-w-2xl">
                                {playlistData.description}
                            </p>
                        </div>
                        <div className="flex gap-3">
                             <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                                <Youtube size={16} />
                                Export to YouTube
                             </button>
                             <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                                <PlayCircle size={16} />
                                Start Flow
                             </button>
                        </div>
                    </div>

                    {/* Timeline / List */}
                    <div className="relative space-y-6">
                        {playlistData.items.map((video, idx) => (
                             <VideoCard 
                                key={idx} 
                                video={video} 
                                index={idx} 
                                isCourseMode={options.isCourseMode} 
                             />
                        ))}
                         
                         {/* End of Flow */}
                         <div className="flex flex-col items-center justify-center py-8 text-gray-600 gap-2">
                             <div className="w-1 h-12 bg-dark-700 rounded-full mb-2"></div>
                             <div className="w-3 h-3 bg-dark-600 rounded-full"></div>
                             <span className="text-sm font-medium">Flow Complete</span>
                         </div>
                    </div>

                </div>
            )}

          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-dark-800 bg-dark-900 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
              <p>&copy; 2026 CurateFlow Inc. All rights reserved.</p>
          </div>
      </footer>

    </div>
  );
};

export default App;