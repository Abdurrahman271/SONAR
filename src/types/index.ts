export type PlatformType = 'x' | 'tiktok' | 'telegram' | 'facebook' | 'news';

export type SentimentType = 'positif' | 'netral' | 'negatif' | 'provokatif';

export type ThreatLevel = 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'CRITICAL';

export interface ThreatInfo {
  level: ThreatLevel;
  code: 1 | 2 | 3 | 4;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  description: string;
}

export interface PropagandaTechnique {
  name: string;
  confidence: number;
  description: string;
}

export interface BotMetrics {
  botProbability: number; // 0 - 100
  accountAgeDays: number;
  burstFrequencyPerHour: number;
  textRepetitionScore: number; // 0 - 100
  networkCoordinationScore: number; // 0 - 100
  isSuspectedBot: boolean;
  classification: 'ORGANIK' | 'AMBIGU' | 'PROBABILITAS TINGGI' | 'BOT TERKONFIRMASI';
}

export interface NarrativePost {
  id: string;
  author: string;
  authorHandle: string;
  authorAvatar?: string;
  platform: PlatformType;
  timestamp: string;
  content: string;
  topic: string;
  sentiment: SentimentType;
  sentimentScore: number; // -1 to 1
  emotions: {
    anger: number;
    fear: number;
    joy: number;
    trust: number;
    anticipation: number;
  };
  botMetrics: BotMetrics;
  propagandaDetected: PropagandaTechnique[];
  reachEstimate: number;
  engagement: {
    shares: number;
    likes: number;
    comments: number;
  };
  region: string;
  threatLevel: ThreatLevel;
  factCheckStatus: 'BELUM_DIVERIFIKASI' | 'BENAR' | 'MENYESATKAN' | 'HOAKS_TOTAL';
  clusterId?: string;
}

export interface CognitiveCluster {
  id: string;
  name: string;
  hashtag: string;
  coreNarrative: string;
  totalVolume: number;
  botPercentage: number;
  growthRatePercent: number;
  primarySentiment: SentimentType;
  threatScore: number; // 0 - 100
  keyAmplifiers: string[];
  recommendedMitigation: string;
}

export interface Scenario {
  id: string;
  name: string;
  badge: string;
  description: string;
  threatLevel: ThreatLevel;
  simulatedTime: string;
  narratives: NarrativePost[];
  clusters: CognitiveCluster[];
  summary: {
    totalPosts: number;
    avgBotProbability: number;
    sentimentBreakdown: {
      positif: number;
      netral: number;
      negatif: number;
      provokatif: number;
    };
    disinfoDetectedCount: number;
    threatIndex: number;
  };
  agentBriefing: {
    headline: string;
    analysisParagraph: string;
    anomalyDetected: string[];
    tacticalActions: string[];
    counterNarrativeDraft: string;
  };
}

export interface AnalysisInputResult {
  text: string;
  sentiment: SentimentType;
  sentimentScore: number;
  sentimentExplanation: string;
  emotions: {
    anger: number;
    fear: number;
    joy: number;
    sadness: number;
    surprise: number;
  };
  botProbability: number;
  botAnalysisFactors: {
    factor: string;
    impact: 'RENDAH' | 'SEDANG' | 'TINGGI';
    detail: string;
  }[];
  propagandaDetected: PropagandaTechnique[];
  disinformationRiskScore: number; // 0 - 100
  threatLevel: ThreatLevel;
  tacticalRecommendation: string;
  counterNarrativeTemplate: string;
  suggestedHashtags: string[];
}

export interface RegionData {
  id: string;
  name: string;
  code: string;
  volume: number;
  threatIndex: number;
  botPercentage: number;
  dominantSentiment: SentimentType;
  topIssues: string[];
  coordinates: { x: number; y: number }; // SVG Map percentage position
}

