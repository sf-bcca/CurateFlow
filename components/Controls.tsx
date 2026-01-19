import React from 'react';
import { CurateOptions, DepthLevel, VibeType } from '../types';
import { Sliders, Clock, GraduationCap, Zap, BookOpen } from 'lucide-react';

interface ControlsProps {
  options: CurateOptions;
  setOptions: React.Dispatch<React.SetStateAction<CurateOptions>>;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({ options, setOptions, disabled }) => {
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({ ...prev, durationMinutes: parseInt(e.target.value) }));
  };

  const toggleCourseMode = () => {
    setOptions(prev => ({ ...prev, isCourseMode: !prev.isCourseMode }));
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 space-y-8 h-fit sticky top-6">
      <div className="flex items-center gap-2 mb-2 text-brand-400">
        <Sliders size={20} />
        <h2 className="font-semibold uppercase tracking-wider text-sm">Flow Controls</h2>
      </div>

      {/* Duration Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-300">
                <Clock size={16} />
                Time Availability
            </label>
            <span className="text-brand-300 font-mono font-bold">{options.durationMinutes} min</span>
        </div>
        <input 
            type="range" 
            min="10" 
            max="180" 
            step="5"
            value={options.durationMinutes}
            onChange={handleDurationChange}
            disabled={disabled}
            className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
        <div className="flex justify-between text-xs text-gray-500 font-mono">
            <span>10m</span>
            <span>3h</span>
        </div>
      </div>

      {/* Depth Select */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm text-gray-300">
            <BookOpen size={16} />
            Instructional Depth
        </label>
        <div className="grid grid-cols-1 gap-2">
            {(Object.values(DepthLevel) as DepthLevel[]).map((level) => (
                <button
                    key={level}
                    onClick={() => setOptions(prev => ({ ...prev, depth: level }))}
                    disabled={disabled}
                    className={`text-xs py-2 px-3 rounded-md text-left transition-all border ${
                        options.depth === level 
                        ? 'bg-brand-900/30 border-brand-500 text-brand-200' 
                        : 'bg-dark-900 border-transparent text-gray-400 hover:bg-dark-700'
                    }`}
                >
                    {level}
                </button>
            ))}
        </div>
      </div>

       {/* Vibe Select */}
       <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm text-gray-300">
            <Zap size={16} />
            Vibe Check
        </label>
        <select 
            value={options.vibe}
            onChange={(e) => setOptions(prev => ({ ...prev, vibe: e.target.value as VibeType }))}
            disabled={disabled}
            className="w-full bg-dark-900 border border-dark-700 text-gray-200 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2.5"
        >
            {(Object.values(VibeType) as VibeType[]).map((vibe) => (
                <option key={vibe} value={vibe}>{vibe}</option>
            ))}
        </select>
      </div>

      {/* Course Mode Toggle */}
      <div className="pt-4 border-t border-dark-700">
          <button
            onClick={toggleCourseMode}
            disabled={disabled}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                options.isCourseMode 
                ? 'bg-brand-900/20 border-brand-500 text-brand-300'
                : 'bg-dark-900 border-dark-700 text-gray-400 hover:border-gray-500'
            }`}
          >
              <div className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap size={18} />
                Course Mode
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${options.isCourseMode ? 'bg-brand-500' : 'bg-gray-600'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${options.isCourseMode ? 'left-6' : 'left-1'}`}></div>
              </div>
          </button>
          <p className="text-[10px] text-gray-500 mt-2 px-1">
            Structures output into a syllabus format (Lesson 1, Lesson 2...)
          </p>
      </div>

    </div>
  );
};

export default Controls;