import React from 'react';
import { VideoItem } from '../types';
import { Play, Clock, Info } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
  index: number;
  isCourseMode: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index, isCourseMode }) => {
  // Use picsum with a consistent seed based on index/length for visual variety
  const thumbnailUrl = `https://picsum.photos/320/180?random=${index}`;

  return (
    <div className="group relative flex flex-col md:flex-row gap-4 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-brand-500/50 rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1">
      {/* Index Badge */}
      <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-900/50 z-10">
        {index + 1}
      </div>

      {/* Thumbnail Placeholder */}
      <div className="relative shrink-0 w-full md:w-48 h-32 rounded-lg overflow-hidden bg-black">
        <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
           <Play className="w-10 h-10 text-white fill-current" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-mono text-white flex items-center gap-1">
          <Clock size={10} />
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-100 leading-tight mb-1 group-hover:text-brand-300 transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-brand-400 font-medium mb-2">{video.channelName}</p>
          
          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
            {video.description}
          </p>
        </div>

        {/* AI Reasoning Badge */}
        <div className="mt-auto bg-dark-900/50 border border-dark-700 rounded-lg p-2 flex gap-2 items-start">
            <Info size={14} className="text-brand-500 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 italic">
              <span className="text-brand-500 font-semibold not-italic">Why: </span>
              {video.reasoning}
            </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;