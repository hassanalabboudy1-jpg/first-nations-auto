export type AgentId =
  | "researcher"
  | "philosopher"
  | "growth_hacker"
  | "cultural_advisor"
  | "builder";

export interface AgentConfig {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
  color: string;
  systemPrompt: string;
}

export interface DebateMessage {
  agentId: AgentId;
  round: number;
  position: string;
  content: string;
  respondingTo?: string;
  tokensUsed?: number;
  timestamp: string;
}

export interface DebateSession {
  id: string;
  topic: string;
  context: string;
  rounds: DebateRound[];
  consensus?: string;
  status: "running" | "completed" | "error";
}

export interface DebateRound {
  roundNumber: number;
  messages: DebateMessage[];
}

export interface DebateRequest {
  topic: string;
  context: string;
  rounds?: number;
  agents?: AgentId[];
}
