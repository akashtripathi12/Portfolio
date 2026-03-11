'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

// ─── Types ─────────────────────────────────────────────────────────────────
interface CfRatingPoint { rating: number; date: string; contestName: string }
interface CfData {
  handle: string; rating: number; maxRating: number; rank: string; maxRank: string;
  contestsCount: number; problemsSolved: number; ratingHistory: CfRatingPoint[];
}
interface LcCalPoint { ts: number; count: number }
interface LcData {
  username: string; totalSolved: number; easySolved: number; mediumSolved: number;
  hardSolved: number; contestRating: number; contestsAttended: number; ranking: number;
  calendar: LcCalPoint[];
}

// ─── Rank meta ──────────────────────────────────────────────────────────────
function rankMeta(rank: string) {
  const r = rank?.toLowerCase() ?? '';
  if (r.includes('legendary') || r.includes('international grandmaster')) return { color: '#e11d48', text: 'text-rose-400', glow: 'shadow-[0_0_30px_rgba(225,29,72,0.2)]', border: 'border-rose-500/40' };
  if (r.includes('grandmaster')) return { color: '#f43f5e', text: 'text-rose-400', glow: 'shadow-[0_0_25px_rgba(244,63,94,0.2)]', border: 'border-rose-500/30' };
  if (r.includes('master') && r.includes('candidate')) return { color: '#aa00aa', text: 'text-violet-400', glow: 'shadow-[0_0_25px_rgba(170,0,170,0.25)]', border: 'border-violet-500/40' };
  if (r.includes('master')) return { color: '#fb923c', text: 'text-orange-400', glow: 'shadow-[0_0_25px_rgba(251,146,60,0.2)]', border: 'border-orange-500/30' };
  if (r.includes('expert')) return { color: '#4169e1', text: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(65,105,225,0.25)]', border: 'border-blue-500/40' };
  if (r.includes('specialist')) return { color: '#03a89e', text: 'text-cyan-400', glow: 'shadow-[0_0_20px_rgba(3,168,158,0.25)]', border: 'border-cyan-500/40' };
  if (r.includes('pupil')) return { color: '#77ff77', text: 'text-green-400', glow: 'shadow-[0_0_20px_rgba(100,255,100,0.2)]', border: 'border-green-500/30' };
  return { color: '#808080', text: 'text-gray-400', glow: '', border: 'border-white/10' };
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ value, duration = 1.8, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [cur, setCur] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  useEffect(() => {
    if (!inView) { setCur(0); return; }
    let t0: number;
    const raf = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setCur(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(raf);
      else setCur(value);
    };
    requestAnimationFrame(raf);
  }, [inView, value, duration]);
  return <span ref={ref}>{cur.toLocaleString()}{suffix}</span>;
}

// ─── CF Tooltip ──────────────────────────────────────────────────────────────
function CfTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: CfRatingPoint }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-[#0d0a14] border border-violet-900/50 rounded-xl px-4 py-3 text-xs shadow-2xl max-w-[220px] backdrop-blur-sm">
      <p className="text-violet-300 font-bold text-base mb-1">{d.rating}</p>
      <p className="text-gray-300 leading-snug">{d.contestName}</p>
      <p className="text-gray-500 mt-1.5">{d.date}</p>
    </div>
  );
}

// ─── LC Donut ────────────────────────────────────────────────────────────────
function LcDonut({ total, easy, medium, hard }: { total: number; easy: number; medium: number; hard: number }) {
  const LC_TOTAL = 3500;
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });

  const r = 70;
  const cx = 90, cy = 90;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(total / LC_TOTAL, 1);

  const segments = [
    { value: easy, color: '#22c55e' },
    { value: medium, color: '#eab308' },
    { value: hard, color: '#d946ef' },
  ];
  const segTotal = easy + medium + hard || 1;

  let offset = 0;
  const arcs = segments.map(s => {
    const fraction = s.value / segTotal;
    const dash = fraction * circumference * pct;
    const gap = circumference - dash;
    const arc = { ...s, dash, gap, offset, strokeDashoffset: circumference - offset };
    offset += dash;
    return arc;
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        {/* Animated arc */}
        {arcs.map((arc, i) => (
          <motion.circle
            key={i}
            ref={i === 0 ? ref : undefined}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="14"
            strokeLinecap="butt"
            strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference - offset + (circumference - arc.dash) - circumference + arc.dash } : {}}
            style={{
              strokeDashoffset: arc.strokeDashoffset - arc.dash,
            }}
          />
        ))}
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{total.toLocaleString()}</span>
        <span className="text-xs text-gray-500 mt-0.5">/ {LC_TOTAL.toLocaleString()}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Solved</span>
      </div>
    </div>
  );
}

// ─── LC Heatmap ────────────────────────────────────────────────────────────
function LcHeatmap({ calendar }: { calendar: LcCalPoint[] }) {
  const dateMap = new Map<string, number>();
  for (const { ts, count } of calendar) {
    const d = new Date(ts * 1000);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    dateMap.set(key, (dateMap.get(key) ?? 0) + count);
  }

  const today = new Date();
  const startDay = new Date(today);
  startDay.setDate(startDay.getDate() - 51 * 7 - today.getDay());

  const weeks: Array<Array<{ key: string; count: number }>> = [];
  const monthLabels: Array<{ label: string; weekIndex: number }> = [];
  const cursor = new Date(startDay);
  let lastMonth = -1;

  for (let w = 0; w < 52; w++) {
    const week: typeof weeks[0] = [];
    for (let d = 0; d < 7; d++) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
      week.push({ key, count: dateMap.get(key) ?? 0 });
      if (d === 0 && cursor.getMonth() !== lastMonth) {
        lastMonth = cursor.getMonth();
        monthLabels.push({ label: cursor.toLocaleDateString('en-US', { month: 'short' }), weekIndex: w });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  const maxCount = Math.max(...calendar.map(c => c.count), 1);
  const cellColor = (c: number) => {
    if (c === 0) return 'rgba(255,255,255,0.04)';
    const p = c / maxCount;
    if (p < 0.2) return 'rgba(124,58,237,0.25)';
    if (p < 0.45) return 'rgba(124,58,237,0.45)';
    if (p < 0.7) return 'rgba(124,58,237,0.65)';
    return 'rgba(124,58,237,0.9)';
  };

  const total = calendar.reduce((s, c) => s + c.count, 0);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Submission Activity</p>
        <span className="text-xs text-violet-400/70 font-medium">{total.toLocaleString()} this year</span>
      </div>
      
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="min-w-max pr-4">
          
          {/* Month labels row */}
          <div className="flex gap-[3px] mb-1.5">
            {(() => {
              const items: React.ReactElement[] = [];
              let cursor = 0;
              for (const ml of monthLabels) {
                const gap = ml.weekIndex - cursor;
                if (gap > 0) items.push(<div key={`gap-${ml.weekIndex}`} style={{ flex: gap }} />);
                items.push(<div key={ml.label + ml.weekIndex} className="text-[10px] text-gray-600" style={{ flex: 0, minWidth: 24 }}>{ml.label}</div>);
                cursor = ml.weekIndex + 1;
              }
              return items;
            })()}
          </div>
          {/* Cell grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px] flex-1">
                {week.map(day => (
                  <div
                    key={day.key}
                    className="aspect-square rounded-[3px] transition-all duration-200 hover:ring-1 hover:ring-violet-400/50 cursor-default"
                    style={{ backgroundColor: cellColor(day.count) }}
                    title={`${day.key}: ${day.count} submissions`}
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="text-[10px] text-gray-600">Less</span>
        {['rgba(255,255,255,0.04)', 'rgba(124,58,237,0.25)', 'rgba(124,58,237,0.45)', 'rgba(124,58,237,0.65)', 'rgba(124,58,237,0.9)'].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        <span className="text-[10px] text-gray-600">More</span>
      </div>
    </div>
    
  );
}

// ─── Stat Box ──────────────────────────────────────────────────────────────
function StatBox({ label, value, accent, icon, duration }: { label: string; value: number; accent?: string; icon: string; duration?: number }) {
  return (
    <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center overflow-hidden group hover:border-white/15 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      <div className="text-lg sm:text-xl mb-0.5 sm:mb-1 opacity-60">{icon}</div>
      <p className={`text-lg sm:text-2xl md:text-3xl font-bold ${accent ?? 'text-white'}`}>
        <Counter value={value} duration={duration} />
      </p>
      <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 mt-0.5 sm:mt-1 uppercase tracking-wider font-medium leading-tight">{label}</p>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="animate-pulse space-y-4 py-6">
      <div className="grid grid-cols-4 gap-3">{[1,2,3,4].map(i=><div key={i} className="h-20 bg-white/5 rounded-2xl"/>)}</div>
      <div className="h-48 bg-white/5 rounded-2xl"/>
      <div className="h-24 bg-white/5 rounded-2xl"/>
    </div>
  );
}

// ─── Logos ────────────────────────────────────────────────────────────────
function LcLogo() {
  return <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg>;
}
function CfLogo() {
  return <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V15c0-.828.672-1.5 1.5-1.5h3z"/></svg>;
}

// ════════════════════════ MAIN COMPONENT ════════════════════════════════════
export function CodingProfiles() {
  const [cf, setCf] = useState<CfData | null>(null);
  const [lc, setLc] = useState<LcData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => { setCf(d.codeforces); setLc(d.leetcode); }).finally(() => setLoading(false));
  }, []);

  const cfMeta = rankMeta(cf?.rank ?? '');

  return (
    <section id="skills" className="relative py-32 px-6">

      <div className="container mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <div className="text-center mb-20 relative z-10">
          <motion.p initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-gray-500 tracking-[0.25em] font-semibold uppercase text-xs mb-5">
            Competitive Programming
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-5xl md:text-7xl font-black tracking-tight">
            Coding{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-400 to-fuchsia-400 drop-shadow-[0_0_30px_rgba(167,139,250,0.4)]">
              Arena
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.15 }} className="text-gray-500 mt-5 max-w-xl mx-auto text-sm">
            Live stats fetched from competitive programming profiles · refreshes every hour
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* ══ CODEFORCES CARD ══════════════════════════════════════════════ */}
          <motion.div className="min-w-0 w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.7 }}>
            {/* Outer glow shell */}
            <div className={`relative rounded-3xl p-px ${loading ? '' : cfMeta.glow}`} style={{ background: loading ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, ${cfMeta.color}33, transparent 60%, rgba(255,255,255,0.04))` }}>
              <div className="relative rounded-3xl bg-[#080404] overflow-hidden">
                {/* Rank-colored top bar */}
                {!loading && cf && (
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, transparent, ${cfMeta.color}, transparent)` }} />
                )}
                <div className="p-4 sm:p-5 flex flex-col gap-5 min-w-0 w-full">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl" style={{ background: loading ? 'rgba(255,255,255,0.06)' : `${cfMeta.color}22`, border: `1px solid ${cfMeta.color}44` }}>
                      <div style={{ color: cfMeta.color }}><CfLogo /></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Codeforces</h3>
                      <a href="https://codeforces.com/profile/akashtripathiak04" target="_blank" rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 mt-0.5 w-fit">
                        @akashtripathiak04
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                    {!loading && cf && (
                      <div className={`shrink-0 text-xs font-bold capitalize px-3 py-1.5 rounded-full ${cfMeta.text}`}
                        style={{ background: `${cfMeta.color}18`, border: `1px solid ${cfMeta.color}44` }}>
                        {cf.rank}
                      </div>
                    )}
                  </div>

                  {loading ? <Skeleton /> : cf ? (
                    <>
                      {/* Stats grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <StatBox label="Rating" value={cf.rating} icon="📈" accent={cfMeta.text} />
                        <StatBox label="Max Rating" value={cf.maxRating} icon="🏆" accent={cfMeta.text} />
                        <StatBox label="Contests" value={cf.contestsCount} icon="⚔️" />
                        <StatBox label="Solved" value={cf.problemsSolved} icon="✅" />
                      </div>

                      {/* Peak rank */}
                      <div className="flex items-center gap-2 text-sm -mt-2 pl-1">
                        <span className="text-gray-600 text-xs">Peak:</span>
                        <span className={`font-bold capitalize text-xs ${rankMeta(cf.maxRank).text}`}>{cf.maxRank}</span>
                        <span className="text-gray-700 ml-auto text-xs">{cf.contestsCount} rated contests</span>
                      </div>

                      {/* Area chart */}
                      <div className="w-full min-w-0">
                        <p className="text-[11px] text-gray-600 uppercase tracking-widest font-medium mb-3">Contest Rating History</p>
                        <div className="h-52 w-full min-w-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cf.ratingHistory} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
                              <defs>
                                <linearGradient id="cfGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={cfMeta.color} stopOpacity={0.35} />
                                  <stop offset="100%" stopColor={cfMeta.color} stopOpacity={0.01} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                              <XAxis dataKey="date" tick={{ fill: '#4b5563', fontSize: 10 }} tickLine={false} axisLine={false}
                                interval={Math.max(Math.floor(cf.ratingHistory.length / 5), 1)} />
                              <YAxis tick={{ fill: '#4b5563', fontSize: 10 }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                              <Tooltip content={<CfTooltip />} />
                              <Area type="monotone" dataKey="rating" stroke={cfMeta.color} strokeWidth={2.5}
                                fill="url(#cfGradient)" dot={false}
                                activeDot={{ r: 5, fill: cfMeta.color, stroke: '#080404', strokeWidth: 2 }} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-600 text-center py-16 text-sm">Failed to load Codeforces data.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══ LEETCODE CARD ════════════════════════════════════════════════ */}
          <motion.div className="min-w-0 w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="relative rounded-3xl p-px" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.22), transparent 60%, rgba(255,255,255,0.04))' }}>
              <div className="relative rounded-3xl bg-[#080404] overflow-hidden">
                {/* Red top bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

                <div className="p-4 sm:p-5 flex flex-col gap-5 min-w-0 w-full">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/25">
                      <div className="text-violet-400"><LcLogo /></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-bold text-white tracking-tight">LeetCode</h3>
                      <a href="https://leetcode.com/u/akashtripathiak04/" target="_blank" rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1 mt-0.5 w-fit">
                        @akashtripathiak04
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                  </div>

                  {loading ? <Skeleton /> : lc ? (
                    <>
                      {/* Top row: donut + difficulty bars */}
                      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                        {/* Donut */}
                        <div className="shrink-0">
                          <LcDonut total={lc.totalSolved} easy={lc.easySolved} medium={lc.mediumSolved} hard={lc.hardSolved} />
                        </div>

                        {/* Difficulty breakdown */}
                        <div className="flex-1 space-y-4 min-w-0 w-full">
                          {[
                            { label: 'Easy', value: lc.easySolved, max: 850, color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
                            { label: 'Medium', value: lc.mediumSolved, max: 1800, color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
                            { label: 'Hard', value: lc.hardSolved, max: 800, color: '#d946ef', bg: 'rgba(217,70,239,0.12)' },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1.5">
                                <span className="font-semibold" style={{ color: d.color }}>{d.label}</span>
                                <span className="text-gray-400 font-medium">{d.value.toLocaleString()}</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full" style={{ background: d.bg }}>
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${Math.min((d.value / d.max) * 100, 100)}%` }}
                                  viewport={{ once: false }}
                                  transition={{ duration: 1.6, ease: 'easeOut' }}
                                  className="h-full rounded-full"
                                  style={{ background: d.color, boxShadow: `0 0 8px ${d.color}66` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <StatBox label="Contest Rating" value={lc.contestRating} icon="🎯" accent="text-violet-400" />
                        <StatBox label="Contests" value={lc.contestsAttended} icon="⚔️" />
                        <StatBox label="Global Rank" value={lc.ranking} icon="🌍" accent="text-violet-400"
                          duration={2.2} />
                      </div>

                      {/* Heatmap */}
                      {lc.calendar?.length > 0 && (
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl sm:rounded-2xl p-3 sm:p-4 min-w-0 w-full overflow-hidden">
                          <LcHeatmap calendar={lc.calendar} />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-600 text-center py-16 text-sm">Failed to load LeetCode data.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
