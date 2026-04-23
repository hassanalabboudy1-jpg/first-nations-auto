"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Lead {
  id: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  community_name: string | null;
  vehicle_type: string | null;
  budget_range: string | null;
  employment_status: string | null;
  monthly_income: string | null;
  credit_score_range: string | null;
  has_status_card: boolean;
  trade_in: boolean;
  status: string;
  source: string;
  lead_score: number;
  created_at: string;
}

interface Note {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

interface DashboardStats {
  totalLeads: number;
  newToday: number;
  qualified: number;
  conversionRate: number;
  topCommunity: string;
  topSource: string;
  urgentCount: number;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isUrgent(dateStr: string): boolean {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  return diffMs < 60 * 60 * 1000;
}

function priorityBadge(score: number) {
  if (score >= 70) return { label: "HOT", color: "bg-red-500/20 text-red-400 border-red-500/30" };
  if (score >= 45) return { label: "WARM", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" };
  return { label: "NEW", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, Note[]>>({});
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [, setTick] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) => [payload.new as Lead, ...prev]);
        }
      )
      .subscribe();

    const interval = setInterval(() => setTick((t) => t + 1), 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadData() {
    const { data: leadsData } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (leadsData) {
      setLeads(leadsData);
      computeStats(leadsData);
    }
    setLoading(false);
  }

  function computeStats(data: Lead[]) {
    const today = new Date().toISOString().split("T")[0];
    const newToday = data.filter((l) => l.created_at.startsWith(today)).length;
    const qualified = data.filter(
      (l) => l.status === "qualified" || l.status === "approved"
    ).length;
    const urgentCount = data.filter(
      (l) => l.status === "new" && isUrgent(l.created_at)
    ).length;

    const communityCount: Record<string, number> = {};
    const sourceCount: Record<string, number> = {};
    for (const l of data) {
      if (l.community_name) communityCount[l.community_name] = (communityCount[l.community_name] || 0) + 1;
      sourceCount[l.source] = (sourceCount[l.source] || 0) + 1;
    }

    setStats({
      totalLeads: data.length,
      newToday,
      qualified,
      conversionRate: data.length > 0 ? Math.round((qualified / data.length) * 100) : 0,
      topCommunity: Object.entries(communityCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
      topSource: Object.entries(sourceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A",
      urgentCount,
    });
  }

  async function updateLeadStatus(leadId: string, status: string) {
    const { error } = await supabase.from("leads").update({ status }).eq("id", leadId);
    if (error) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  }

  async function toggleExpand(leadId: string) {
    if (expandedLead === leadId) {
      setExpandedLead(null);
      setNewNote("");
      setDeleteConfirm(null);
      return;
    }
    setExpandedLead(leadId);
    setNewNote("");
    setDeleteConfirm(null);

    // Load notes for this lead
    if (!notes[leadId]) {
      const { data } = await supabase
        .from("lead_activities")
        .select("id, title, description, created_at")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });
      if (data) {
        setNotes((prev) => ({ ...prev, [leadId]: data }));
      }
    }
  }

  async function addNote(leadId: string) {
    if (!newNote.trim()) return;
    setSavingNote(true);

    const { data, error } = await supabase
      .from("lead_activities")
      .insert({
        lead_id: leadId,
        activity: "note_added",
        title: "Note",
        description: newNote.trim(),
      })
      .select("id, title, description, created_at")
      .single();

    if (!error && data) {
      setNotes((prev) => ({
        ...prev,
        [leadId]: [data, ...(prev[leadId] || [])],
      }));
      setNewNote("");
    }
    setSavingNote(false);
  }

  async function deleteLead(leadId: string) {
    const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      setExpandedLead(null);
      setDeleteConfirm(null);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const sortedLeads = [...leads].sort((a, b) => {
    const aUrgent = a.status === "new" && isUrgent(a.created_at);
    const bUrgent = b.status === "new" && isUrgent(b.created_at);
    if (aUrgent && !bUrgent) return -1;
    if (!aUrgent && bUrgent) return 1;
    if (a.lead_score !== b.lead_score) return b.lead_score - a.lead_score;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const filteredLeads = filter === "all"
    ? sortedLeads
    : sortedLeads.filter((l) => l.status === filter);

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    qualified: "bg-green-500/20 text-green-400 border-green-500/30",
    approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    application_sent: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    vehicle_matched: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    delivered: "bg-brand-teal/20 text-brand-teal border-brand-teal/30",
    closed_won: "bg-brand-teal/20 text-brand-teal border-brand-teal/30",
    closed_lost: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-display text-sm text-gray-500 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="border-b border-brand-border bg-brand-darker px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h1 className="font-display text-sm font-bold tracking-wider gradient-text uppercase">
                Command Center
              </h1>
              <p className="text-xs text-gray-500">
                First Nations Auto — Lead Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {stats && stats.urgentCount > 0 && (
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg animate-pulse">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-bold text-red-400">
                  {stats.urgentCount} NEED CALLBACK
                </span>
              </div>
            )}
            <Link
              href="/admin/war-room"
              className="text-xs bg-brand-purple/20 text-brand-purple border border-brand-purple/30 px-4 py-2 rounded-lg font-display font-bold tracking-wider hover:bg-brand-purple/30 transition"
            >
              WAR ROOM
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full pulse-dot" />
              <span className="text-xs text-gray-500">Live</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-white transition px-2 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
            {[
              { label: "Total Leads", value: stats.totalLeads, color: "text-white" },
              { label: "New Today", value: stats.newToday, color: "text-brand-gold" },
              { label: "Need Callback", value: stats.urgentCount, color: stats.urgentCount > 0 ? "text-red-400" : "text-gray-500" },
              { label: "Qualified", value: stats.qualified, color: "text-brand-teal" },
              { label: "Conversion", value: `${stats.conversionRate}%`, color: "text-green-400" },
              { label: "Top Community", value: stats.topCommunity, color: "text-brand-red", small: true },
              { label: "Top Source", value: stats.topSource, color: "text-brand-purple", small: true },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-brand-darker border border-brand-border rounded-xl p-4"
              >
                <div className="text-xs text-gray-500 font-display tracking-wider uppercase mb-1">
                  {s.label}
                </div>
                <div
                  className={`font-display font-bold ${s.color} ${s.small ? "text-sm truncate" : "text-2xl"}`}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          {["all", "new", "contacted", "qualified", "approved", "closed_won", "closed_lost"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg font-display tracking-wider uppercase whitespace-nowrap transition ${
                  filter === f
                    ? "bg-brand-red text-white"
                    : "bg-brand-darker border border-brand-border text-gray-400 hover:text-white"
                }`}
              >
                {f === "all" ? "All" : f.replace("_", " ")}
              </button>
            )
          )}
        </div>

        {/* Leads */}
        <div className="bg-brand-darker border border-brand-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-brand-border flex items-center justify-between">
            <h2 className="font-display text-sm font-bold tracking-wider uppercase">
              Leads — Click to expand
            </h2>
            <span className="text-xs text-gray-500">
              {filteredLeads.length} leads
            </span>
          </div>

          <div className="divide-y divide-brand-border/50">
            {filteredLeads.map((lead) => {
              const urgent = lead.status === "new" && isUrgent(lead.created_at);
              const badge = priorityBadge(lead.lead_score);
              const isExpanded = expandedLead === lead.id;
              const leadNotes = notes[lead.id] || [];

              return (
                <div key={lead.id}>
                  {/* Lead Row */}
                  <div
                    onClick={() => toggleExpand(lead.id)}
                    className={`flex items-center gap-4 px-5 py-3 cursor-pointer transition ${
                      urgent
                        ? "bg-red-500/[0.03] hover:bg-red-500/[0.06]"
                        : isExpanded
                          ? "bg-white/[0.03]"
                          : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {/* Priority */}
                    <div className="flex items-center gap-2 w-20 flex-shrink-0">
                      <span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Name + badges */}
                    <div className="w-40 flex-shrink-0">
                      <div className="text-sm font-semibold text-white">
                        {lead.first_name} {lead.last_name || ""}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {lead.has_status_card && (
                          <span className="text-[10px] bg-brand-teal/20 text-brand-teal px-1.5 py-0.5 rounded">
                            Status Card
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <a
                      href={`tel:${lead.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-brand-teal hover:underline w-32 flex-shrink-0"
                    >
                      {lead.phone}
                    </a>

                    {/* Community */}
                    <div className="text-sm text-gray-400 w-32 flex-shrink-0 truncate hidden md:block">
                      {lead.community_name || "—"}
                    </div>

                    {/* Vehicle */}
                    <div className="text-sm text-gray-400 capitalize w-20 flex-shrink-0 hidden lg:block">
                      {lead.vehicle_type || "—"}
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-md border bg-transparent cursor-pointer ${statusColors[lead.status] || "text-gray-400 border-brand-border"}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="application_sent">App Sent</option>
                        <option value="approved">Approved</option>
                        <option value="vehicle_matched">Matched</option>
                        <option value="delivered">Delivered</option>
                        <option value="closed_won">Won</option>
                        <option value="closed_lost">Lost</option>
                      </select>
                    </div>

                    {/* Time */}
                    <span className={`text-xs ml-auto flex-shrink-0 ${urgent ? "text-red-400 font-bold" : "text-gray-500"}`}>
                      {urgent && "🔥 "}
                      {timeAgo(lead.created_at)}
                    </span>

                    {/* Expand arrow */}
                    <span className={`text-gray-500 text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </div>

                  {/* Expanded Panel */}
                  {isExpanded && (
                    <div className="bg-brand-dark/50 border-t border-brand-border/30 px-5 py-5">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Left: Lead Details */}
                        <div>
                          <h3 className="text-xs font-display font-bold text-gray-400 tracking-wider uppercase mb-3">
                            Lead Details
                          </h3>
                          <div className="bg-brand-darker rounded-xl p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Name</span>
                              <span className="text-white">{lead.first_name} {lead.last_name || ""}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Phone</span>
                              <a href={`tel:${lead.phone}`} className="text-brand-teal">{lead.phone}</a>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Email</span>
                              <span className="text-white">{lead.email || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Community</span>
                              <span className="text-white">{lead.community_name || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Vehicle</span>
                              <span className="text-white capitalize">{lead.vehicle_type || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Budget</span>
                              <span className="text-white">{lead.budget_range?.replace(/_/g, " ") || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Trade-In</span>
                              <span className="text-white">{lead.trade_in ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Employment</span>
                              <span className="text-white capitalize">{lead.employment_status?.replace(/_/g, " ") || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Monthly Income</span>
                              <span className="text-white">{lead.monthly_income?.replace(/_/g, " ") || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Credit</span>
                              <span className="text-white capitalize">{lead.credit_score_range?.replace(/_/g, " ") || "—"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status Card</span>
                              <span className="text-white">{lead.has_status_card ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Source</span>
                              <span className="text-white">{lead.source.replace(/_/g, " ")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Submitted</span>
                              <span className="text-white">{formatDate(lead.created_at)}</span>
                            </div>
                          </div>

                          {/* Delete */}
                          <div className="mt-4">
                            {deleteConfirm === lead.id ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-red-400">Are you sure?</span>
                                <button
                                  onClick={() => deleteLead(lead.id)}
                                  className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition"
                                >
                                  Yes, Delete
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="text-xs text-gray-500 hover:text-white px-3 py-1.5 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(lead.id)}
                                className="text-xs text-red-400/60 hover:text-red-400 transition"
                              >
                                Delete this lead
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Right: Notes */}
                        <div>
                          <h3 className="text-xs font-display font-bold text-gray-400 tracking-wider uppercase mb-3">
                            Notes & Activity
                          </h3>

                          {/* Add Note */}
                          <div className="mb-4">
                            <textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add a note about this lead..."
                              rows={3}
                              className="w-full bg-brand-darker border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-brand-teal focus:outline-none resize-none"
                            />
                            <button
                              onClick={() => addNote(lead.id)}
                              disabled={!newNote.trim() || savingNote}
                              className="mt-2 text-xs bg-brand-teal/20 text-brand-teal border border-brand-teal/30 px-4 py-2 rounded-lg font-bold hover:bg-brand-teal/30 disabled:opacity-40 transition"
                            >
                              {savingNote ? "Saving..." : "Save Note"}
                            </button>
                          </div>

                          {/* Notes List */}
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {leadNotes.length === 0 && (
                              <p className="text-xs text-gray-600">No notes yet.</p>
                            )}
                            {leadNotes.map((note) => (
                              <div
                                key={note.id}
                                className="bg-brand-darker border border-brand-border/50 rounded-lg px-4 py-3"
                              >
                                <p className="text-sm text-white/80">{note.description || note.title}</p>
                                <p className="text-[10px] text-gray-600 mt-1">{formatDate(note.created_at)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredLeads.length === 0 && (
              <div className="px-5 py-12 text-center text-gray-500 text-sm">
                {filter === "all"
                  ? "No leads yet. Share your community pages to start generating leads."
                  : `No ${filter.replace("_", " ")} leads.`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
