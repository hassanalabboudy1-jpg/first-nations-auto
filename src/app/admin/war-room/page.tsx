"use client";

import { useState } from "react";
import { AGENT_LIST } from "@/lib/agents/config";
import type { DebateMessage } from "@/lib/agents/types";

interface DebateResult {
  sessionId: string;
  rounds: { roundNumber: number; messages: DebateMessage[] }[];
  consensus: string;
  totalTokens: number;
}

const PRESET_TOPICS = [
  {
    topic: "How do we acquire our first 100 leads in 30 days?",
    context:
      "We just launched. No existing customer base. Budget: $5,000 for first month. Need to establish presence in Ontario, Quebec, Manitoba, New Brunswick, and Nova Scotia First Nations communities.",
  },
  {
    topic: "Which 10 communities should we target first and why?",
    context:
      "We can't serve all 248+ communities at once. Need to prioritize based on population, accessibility, competition, and strategic value.",
  },
  {
    topic: "Should we focus on Facebook Ads or SEO first?",
    context:
      "Limited marketing budget. Need to decide where to allocate resources for maximum ROI. Both have potential but different timelines.",
  },
  {
    topic: "How do we differentiate from existing competitors?",
    context:
      "8 known competitors (First Nations Car Financing, Miigwetch, Aboriginal Auto, etc.). Most are outside Ontario/Quebec. Need a unique positioning strategy.",
  },
  {
    topic: "Build vs. buy: CRM and automation stack",
    context:
      "GoHighLevel at $97/mo vs HubSpot free tier vs custom Supabase solution. Need SMS automation, lead scoring, pipeline management.",
  },
];

const agentColors: Record<string, string> = {
  researcher: "#E63946",
  philosopher: "#457B9D",
  growth_hacker: "#E9C46A",
  cultural_advisor: "#2A9D8F",
  builder: "#9B5DE5",
};

export default function WarRoomPage() {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [rounds, setRounds] = useState(3);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<DebateResult | null>(null);
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);

  async function startDebate() {
    if (!topic || !context) return;
    setRunning(true);
    setResult(null);

    try {
      const res = await fetch("/api/agents/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, context, rounds }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error("Debate failed:", err);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="border-b border-brand-border bg-brand-darker px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚔️</span>
          <div>
            <h1 className="font-display text-sm font-bold tracking-wider uppercase">
              <span className="text-brand-red">AGENT</span>{" "}
              <span className="text-brand-gold">WAR</span>{" "}
              <span className="text-brand-teal">ROOM</span>
            </h1>
            <p className="text-xs text-gray-500">
              Multi-Agent Strategy Debate Engine — Powered by Claude
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Agent Roster */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {AGENT_LIST.map((agent) => (
            <div
              key={agent.id}
              className="min-w-[120px] p-3 rounded-xl text-center"
              style={{
                background: `${agent.color}11`,
                border: `1px solid ${agent.color}33`,
              }}
            >
              <div className="text-2xl mb-1">{agent.avatar}</div>
              <div
                className="font-display text-[10px] font-bold tracking-wider"
                style={{ color: agent.color }}
              >
                {agent.name}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                {agent.role}
              </div>
            </div>
          ))}
        </div>

        {/* Debate Setup */}
        {!result && (
          <div className="bg-brand-darker border border-brand-border rounded-xl p-6 mb-6">
            <h2 className="font-display text-sm font-bold text-brand-gold tracking-wider uppercase mb-4">
              Start a New Debate
            </h2>

            {/* Preset topics */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 block mb-2">
                Quick Topics:
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_TOPICS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTopic(preset.topic);
                      setContext(preset.context);
                    }}
                    className="text-xs bg-brand-dark border border-brand-border rounded-lg px-3 py-2 hover:border-brand-gold/50 hover:text-brand-gold transition text-left"
                  >
                    {preset.topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Debate Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What should the agents debate?"
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Context & Constraints
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Give the agents context: budget, timeline, specific challenges..."
                  rows={3}
                  className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-gold focus:outline-none transition resize-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Rounds
                  </label>
                  <select
                    value={rounds}
                    onChange={(e) => setRounds(Number(e.target.value))}
                    className="bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value={2}>2 Rounds (Quick)</option>
                    <option value={3}>3 Rounds (Standard)</option>
                    <option value={5}>5 Rounds (Deep)</option>
                  </select>
                </div>
                <button
                  onClick={startDebate}
                  disabled={running || !topic || !context}
                  className="ml-auto bg-brand-red hover:bg-red-700 disabled:opacity-40 text-white px-8 py-3 rounded-lg font-display font-bold text-sm tracking-wider transition"
                >
                  {running ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      AGENTS DEBATING...
                    </span>
                  ) : (
                    "🚀 LAUNCH DEBATE"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Running indicator */}
        {running && (
          <div className="bg-brand-darker border border-brand-gold/30 rounded-xl p-8 text-center mb-6">
            <div className="text-4xl mb-4 animate-pulse">⚔️</div>
            <h3 className="font-display text-lg font-bold text-brand-gold mb-2">
              Agents are debating...
            </h3>
            <p className="text-sm text-gray-400">
              {rounds} rounds, 5 agents arguing in parallel. This takes 30-90
              seconds.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              {AGENT_LIST.map((agent) => (
                <div
                  key={agent.id}
                  className="text-xl animate-bounce"
                  style={{ animationDelay: `${Math.random() * 0.5}s` }}
                >
                  {agent.avatar}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Debate Results */}
        {result && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold">
                Debate Complete
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">
                  {result.totalTokens.toLocaleString()} tokens used
                </span>
                <button
                  onClick={() => {
                    setResult(null);
                    setTopic("");
                    setContext("");
                  }}
                  className="text-xs bg-brand-dark border border-brand-border rounded-lg px-4 py-2 hover:border-gray-500 transition"
                >
                  New Debate
                </button>
              </div>
            </div>

            {/* Rounds */}
            {result.rounds.map((round) => (
              <div key={round.roundNumber} className="mb-8">
                <h3 className="font-display text-sm font-bold text-brand-gold tracking-wider uppercase mb-4">
                  Round {round.roundNumber}
                  {round.roundNumber === 1
                    ? " — Opening Arguments"
                    : round.roundNumber === 2
                      ? " — Rebuttals"
                      : " — Synthesis"}
                </h3>
                <div className="space-y-3">
                  {round.messages.map((msg, i) => {
                    const msgKey = `${round.roundNumber}-${i}`;
                    const isExpanded = expandedMsg === msgKey;
                    const color =
                      agentColors[msg.agentId] || "#888";
                    const agent = AGENT_LIST.find(
                      (a) => a.id === msg.agentId
                    );

                    return (
                      <div
                        key={msgKey}
                        className="rounded-xl overflow-hidden cursor-pointer transition-all"
                        style={{
                          background: `${color}08`,
                          border: `1px solid ${color}22`,
                        }}
                        onClick={() =>
                          setExpandedMsg(isExpanded ? null : msgKey)
                        }
                      >
                        <div className="flex items-center gap-3 p-4">
                          <span className="text-xl">
                            {agent?.avatar || "🤖"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-display text-[10px] font-bold tracking-wider"
                              style={{ color }}
                            >
                              {agent?.name || msg.agentId}
                            </div>
                            <div className="text-sm font-semibold text-white mt-0.5 truncate">
                              {msg.position}
                            </div>
                          </div>
                          <span
                            className="text-sm transition-transform"
                            style={{
                              color,
                              transform: isExpanded
                                ? "rotate(180deg)"
                                : "rotate(0)",
                            }}
                          >
                            ▼
                          </span>
                        </div>
                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                              {msg.content}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Consensus */}
            {result.consensus && (
              <div className="bg-brand-darker border-2 border-brand-gold/30 rounded-xl p-6 mt-8">
                <h3 className="font-display text-sm font-bold text-brand-gold tracking-wider uppercase mb-4">
                  🎯 Consensus Strategy
                </h3>
                <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.consensus}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
