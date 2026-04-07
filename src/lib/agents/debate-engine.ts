import Anthropic from "@anthropic-ai/sdk";
import { AGENTS } from "./config";
import type { AgentId, DebateMessage, DebateRound } from "./types";

const anthropic = new Anthropic();

interface DebateConfig {
  topic: string;
  context: string;
  rounds: number;
  agents: AgentId[];
  onMessage?: (message: DebateMessage) => void;
}

/**
 * Run a single agent's turn in the debate.
 * Each agent sees the full conversation history and responds with their perspective.
 */
async function runAgentTurn(
  agentId: AgentId,
  topic: string,
  context: string,
  round: number,
  conversationHistory: DebateMessage[]
): Promise<DebateMessage> {
  const agent = AGENTS[agentId];

  // Build the conversation context for this agent
  const historyText = conversationHistory
    .map(
      (msg) =>
        `[${AGENTS[msg.agentId].name} — Round ${msg.round}]\nPosition: ${msg.position}\n${msg.content}`
    )
    .join("\n\n---\n\n");

  const roundInstructions =
    round === 1
      ? `This is Round 1 — OPENING ARGUMENTS. Present your initial analysis and position on the topic. Be bold, specific, and data-driven.`
      : round === 2
        ? `This is Round 2 — REBUTTALS & DEEP DIVE. You've heard the other agents. Challenge their assumptions, build on their good ideas, and go deeper on your specialty. Reference specific points other agents made.`
        : `This is Round 3 — SYNTHESIS & ACTION PLAN. The debate is concluding. Synthesize the best ideas from all agents into concrete, actionable recommendations. Prioritize what to do FIRST. Be specific — include timelines, tools, and metrics.`;

  const userPrompt = `DEBATE TOPIC: ${topic}

CONTEXT: ${context}

${historyText ? `CONVERSATION SO FAR:\n${historyText}\n\n` : ""}${roundInstructions}

Respond with:
1. POSITION: (one sentence — your core argument this round)
2. ARGUMENT: (your full argument — be specific, use data, reference competitors, cite tools/repos where relevant)

Keep your response focused and under 400 words. Be direct. No filler.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: agent.systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Parse position and content
  const positionMatch = text.match(/POSITION:\s*(.+?)(?:\n|$)/);
  const argumentMatch = text.match(
    /ARGUMENT:\s*([\s\S]+?)(?:$)/
  );

  return {
    agentId,
    round,
    position: positionMatch?.[1]?.trim() || "Position stated in argument",
    content: argumentMatch?.[1]?.trim() || text,
    tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Run a full multi-agent debate.
 *
 * Architecture: Each round, ALL agents argue in parallel (Promise.all).
 * Each subsequent round includes the full history so agents can reference
 * and challenge each other's points.
 */
export async function runDebate(config: DebateConfig): Promise<{
  rounds: DebateRound[];
  consensus: string;
  totalTokens: number;
}> {
  const { topic, context, rounds = 3, agents, onMessage } = config;
  const allMessages: DebateMessage[] = [];
  const debateRounds: DebateRound[] = [];
  let totalTokens = 0;

  for (let round = 1; round <= rounds; round++) {
    // All agents argue in parallel within each round
    const roundMessages = await Promise.all(
      agents.map((agentId) =>
        runAgentTurn(agentId, topic, context, round, allMessages)
      )
    );

    for (const msg of roundMessages) {
      totalTokens += msg.tokensUsed || 0;
      allMessages.push(msg);
      onMessage?.(msg);
    }

    debateRounds.push({ roundNumber: round, messages: roundMessages });
  }

  // Generate consensus from all arguments
  const consensusPrompt = buildConsensusPrompt(topic, allMessages);
  const consensusResponse = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    system: `You are a master strategist synthesizing a multi-agent debate about First Nations auto financing in Ontario, Quebec, New Brunswick, and Nova Scotia. Your job is to extract the BEST ideas from all agents and create a unified, actionable strategy. Be specific. Include priorities, timelines, and success metrics.`,
    messages: [{ role: "user", content: consensusPrompt }],
  });

  const consensus =
    consensusResponse.content[0].type === "text"
      ? consensusResponse.content[0].text
      : "";

  totalTokens +=
    consensusResponse.usage.input_tokens +
    consensusResponse.usage.output_tokens;

  return { rounds: debateRounds, consensus, totalTokens };
}

function buildConsensusPrompt(
  topic: string,
  messages: DebateMessage[]
): string {
  const agentArguments = messages
    .map(
      (msg) =>
        `[${AGENTS[msg.agentId].name} — Round ${msg.round}]\n${msg.position}\n${msg.content}`
    )
    .join("\n\n---\n\n");

  return `DEBATE TOPIC: ${topic}

FULL DEBATE TRANSCRIPT:
${agentArguments}

Now synthesize the best ideas from ALL agents into a CONSENSUS STRATEGY. Structure it as:

1. **CORE STRATEGY** (2-3 sentences — the unified vision)
2. **IMMEDIATE ACTIONS** (next 7 days — 3-5 specific steps)
3. **30-DAY MILESTONES** (what should be live and measurable)
4. **90-DAY TARGETS** (revenue, leads, community partnerships)
5. **RED LINES** (non-negotiable cultural/ethical guardrails from the Cultural Advisor)
6. **TECH PRIORITIES** (what to build first, from the Builder)
7. **KEY METRICS** (how we measure success)

Be ruthlessly specific. No generic advice.`;
}

/**
 * Run a quick single-agent analysis (for lead qualification, content generation, etc.)
 */
export async function runSingleAgent(
  agentId: AgentId,
  prompt: string
): Promise<string> {
  const agent = AGENTS[agentId];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: agent.systemPrompt,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

/**
 * Qualify a lead using the Researcher agent
 */
export async function qualifyLead(leadData: {
  name: string;
  phone: string;
  community?: string;
  vehicleType?: string;
  employmentStatus?: string;
  creditRange?: string;
}): Promise<{ score: number; notes: string }> {
  const prompt = `Analyze this lead for our First Nations auto financing business:

Name: ${leadData.name}
Phone: ${leadData.phone}
Community: ${leadData.community || "Not specified"}
Vehicle Interest: ${leadData.vehicleType || "Not specified"}
Employment: ${leadData.employmentStatus || "Not specified"}
Credit Range: ${leadData.creditRange || "Not specified"}

Score this lead 0-100 based on:
- Likelihood to convert (community engagement, employment, etc.)
- Estimated deal value
- Urgency signals

Respond in JSON format:
{"score": <number>, "notes": "<brief qualification notes for the sales team>"}`;

  const result = await runSingleAgent("researcher", prompt);

  try {
    const parsed = JSON.parse(result);
    return { score: parsed.score || 50, notes: parsed.notes || result };
  } catch {
    return { score: 50, notes: result };
  }
}
