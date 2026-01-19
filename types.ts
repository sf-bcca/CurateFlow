export enum DepthLevel {
  ELI5 = "Explain Like I'm 5",
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
  ACADEMIC = "Academic/Technical"
}

export enum VibeType {
  EDUCATIONAL = "Fast-Paced Educational",
  ENERGETIC = "High Energy",
  RELAXING = "Relaxing/ASMR",
  DEEP_DIVE = "Deep Dive",
  WORKSHOP = "Workshop/Tutorial"
}

export interface VideoItem {
  title: string;
  channelName: string;
  duration: string;
  description: string;
  reasoning: string;
}

export interface PlaylistResponse {
  playlistName: string;
  totalDuration: string;
  description: string;
  items: VideoItem[];
}

export interface CurateOptions {
  durationMinutes: number;
  depth: DepthLevel;
  vibe: VibeType;
  isCourseMode: boolean;
}