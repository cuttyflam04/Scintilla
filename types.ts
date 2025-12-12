export interface Feature {
  title: string;
  description: string;
}

export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  aiIntegration: string;
}

export interface ViabilityMetrics {
  innovation: number;
  feasibility: number;
  marketDemand: number;
  monetization: number;
  scalability: number;
}

export interface IdeaData {
  appName: string;
  tagline: string;
  elevatorPitch: string;
  features: Feature[];
  techStack: TechStack;
  viability: ViabilityMetrics;
  targetAudience: string[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}