import { NextRequest, NextResponse } from "next/server";
import { runDebate } from "@/lib/agents/debate-engine";
import { AGENT_IDS } from "@/lib/agents/config";
import type { AgentId } from "@/lib/agents/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Auth check — only logged-in admins can run debates
    const cookieStore = await cookies();
    const authClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { topic, context, rounds = 3, agents } = body;

    if (!topic || !context) {
      return NextResponse.json(
        { error: "topic and context are required" },
        { status: 400 }
      );
    }

    const agentIds: AgentId[] = agents || AGENT_IDS;
    const numRounds = Math.min(rounds, 5); // cap at 5 rounds

    // Create debate session in Supabase
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    const { data: session, error: sessionError } = await supabase
      .from("debate_sessions")
      .insert({ topic, context, status: "running" })
      .select("id")
      .single();

    if (sessionError) {
      console.error("Session create error:", sessionError);
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    // Run the debate
    const result = await runDebate({
      topic,
      context,
      rounds: numRounds,
      agents: agentIds,
      onMessage: async (msg) => {
        // Save each message to Supabase in real-time
        await supabase.from("debate_messages").insert({
          session_id: session.id,
          agent: msg.agentId,
          round: msg.round,
          position: msg.position,
          content: msg.content,
          tokens_used: msg.tokensUsed,
        });
      },
    });

    // Update session with consensus
    await supabase
      .from("debate_sessions")
      .update({
        status: "completed",
        consensus: result.consensus,
        completed_at: new Date().toISOString(),
      })
      .eq("id", session.id);

    return NextResponse.json({
      sessionId: session.id,
      rounds: result.rounds,
      consensus: result.consensus,
      totalTokens: result.totalTokens,
    });
  } catch (err) {
    console.error("Debate API error:", err);
    return NextResponse.json({ error: "Debate failed" }, { status: 500 });
  }
}
