"use client";

import { useMemo, useState } from "react";

type Range = "7d" | "30d" | "90d";
type Channel = "All" | "Organic" | "Paid" | "Partners";

const rangeData: Record<Range, { revenue: string; change: string; activation: string; retention: string; bars: number[] }> = {
  "7d": { revenue: "$18.4k", change: "+8.2%", activation: "64.8%", retention: "42.1%", bars: [42, 58, 51, 68, 61, 76, 83] },
  "30d": { revenue: "$72.8k", change: "+12.6%", activation: "62.3%", retention: "40.7%", bars: [36, 44, 48, 55, 51, 62, 59, 67, 71, 68, 79, 86] },
  "90d": { revenue: "$201.6k", change: "+24.1%", activation: "59.9%", retention: "39.4%", bars: [28, 32, 39, 35, 46, 51, 48, 57, 63, 61, 72, 80] },
};

const channels = [
  { name: "Organic search", group: "Organic", visits: "18,420", signup: "8.4%", revenue: "$31,840", trend: "+14.2%" },
  { name: "Product Hunt", group: "Partners", visits: "9,176", signup: "12.7%", revenue: "$18,260", trend: "+28.8%" },
  { name: "LinkedIn", group: "Paid", visits: "7,804", signup: "6.1%", revenue: "$12,980", trend: "+5.7%" },
  { name: "Newsletter", group: "Organic", visits: "5,292", signup: "10.3%", revenue: "$8,440", trend: "+9.1%" },
  { name: "Partner referrals", group: "Partners", visits: "3,118", signup: "15.9%", revenue: "$7,350", trend: "+18.4%" },
] as const;

const funnel = [
  { label: "Landing sessions", value: "43,810", width: 100 },
  { label: "Account created", value: "4,186", width: 71 },
  { label: "First workspace", value: "2,714", width: 53 },
  { label: "Activated", value: "1,756", width: 39 },
];

export default function Home() {
  const [range, setRange] = useState<Range>("30d");
  const [channel, setChannel] = useState<Channel>("All");
  const [campaign, setCampaign] = useState("Launch week");
  const metrics = rangeData[range];
  const visibleChannels = useMemo(
    () => channel === "All" ? channels : channels.filter((item) => item.group === channel),
    [channel],
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#top" aria-label="Signal Room home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>Signal Room</span>
        </a>
        <nav aria-label="Workspace navigation">
          <p>Workspace</p>
          <a className="active" href="#overview"><span>01</span>Overview</a>
          <a href="#acquisition"><span>02</span>Acquisition</a>
          <a href="#funnel"><span>03</span>Activation</a>
          <a href="#retention"><span>04</span>Retention</a>
          <p>Saved views</p>
          <button type="button"><i className="view-dot lime" />Launch cohort</button>
          <button type="button"><i className="view-dot coral" />High-intent teams</button>
        </nav>
        <div className="sidebar-footer">
          <span className="avatar">MT</span>
          <div><strong>Matvey</strong><small>Product workspace</small></div>
          <button type="button" aria-label="Open account menu">•••</button>
        </div>
      </aside>

      <main id="top" className="main-content">
        <header className="topbar">
          <div className="mobile-brand">Signal Room</div>
          <label className="search"><span>⌕</span><input aria-label="Search reports" placeholder="Search reports" /></label>
          <div className="topbar-actions"><span className="live-dot" />Live data<button type="button">Export</button><button className="new-report" type="button">New report</button></div>
        </header>

        <div className="dashboard">
          <section id="overview" className="page-heading">
            <div>
              <p className="eyebrow">Growth intelligence</p>
              <h1>Morning, Matvey.</h1>
              <p>Here&apos;s what changed across your product funnel.</p>
            </div>
            <div className="heading-controls">
              <label>Campaign<select value={campaign} onChange={(event) => setCampaign(event.target.value)}><option>Launch week</option><option>Spring onboarding</option><option>Teams beta</option></select></label>
              <div className="range-tabs" aria-label="Date range">{(["7d", "30d", "90d"] as Range[]).map((item) => <button className={range === item ? "active" : ""} onClick={() => setRange(item)} key={item}>{item}</button>)}</div>
            </div>
          </section>

          <section className="metric-grid" aria-label="Key metrics">
            <article className="metric-card primary"><div className="metric-label"><span>Net revenue</span><small>{metrics.change}</small></div><strong>{metrics.revenue}</strong><p>vs previous {range}</p></article>
            <article className="metric-card"><div className="metric-label"><span>New workspaces</span><small>+9.4%</small></div><strong>1,284</strong><p>42.8 per day</p></article>
            <article className="metric-card"><div className="metric-label"><span>Activation rate</span><small>+3.1%</small></div><strong>{metrics.activation}</strong><p>2,714 reached value</p></article>
            <article className="metric-card"><div className="metric-label"><span>Day-30 retention</span><small className="neutral">−0.8%</small></div><strong>{metrics.retention}</strong><p>Target: 45%</p></article>
          </section>

          <section className="chart-card" aria-labelledby="growth-title">
            <div className="card-heading"><div><p className="eyebrow">Revenue pulse</p><h2 id="growth-title">Recurring revenue</h2></div><div className="legend"><span className="legend-current" />Current<span className="legend-previous" />Previous</div></div>
            <div className="chart-area">
              <div className="y-axis"><span>$4k</span><span>$3k</span><span>$2k</span><span>$1k</span><span>$0</span></div>
              <div className="bars" aria-label={`Revenue bars for ${range}`}>
                {metrics.bars.map((height, index) => <div className="bar-pair" key={`${range}-${index}`}><i className="previous" style={{ height: `${Math.max(18, height - 17)}%` }} /><i className="current" style={{ height: `${height}%` }} /></div>)}
              </div>
            </div>
            <div className="chart-footer"><span>{range === "7d" ? "Mon" : "Start"}</span><span>Mid-period</span><span>Today</span></div>
          </section>

          <div className="analysis-grid">
            <section id="acquisition" className="table-card">
              <div className="card-heading"><div><p className="eyebrow">Acquisition</p><h2>Channel performance</h2></div><a href="#acquisition">View report →</a></div>
              <div className="filter-row" aria-label="Channel filter">{(["All", "Organic", "Paid", "Partners"] as Channel[]).map((item) => <button className={channel === item ? "active" : ""} onClick={() => setChannel(item)} key={item}>{item}</button>)}</div>
              <div className="channel-table">
                <div className="table-head"><span>Channel</span><span>Visits</span><span>Signup</span><span>Revenue</span></div>
                {visibleChannels.map((item) => <div className="table-row" key={item.name}><span><i className={`channel-icon ${item.group.toLowerCase()}`}>{item.name.charAt(0)}</i><strong>{item.name}</strong></span><span>{item.visits}</span><span>{item.signup}</span><span><strong>{item.revenue}</strong><small>{item.trend}</small></span></div>)}
              </div>
            </section>

            <section id="funnel" className="funnel-card">
              <div className="card-heading"><div><p className="eyebrow">Activation</p><h2>Core funnel</h2></div><span className="campaign-pill">{campaign}</span></div>
              <div className="funnel-list">{funnel.map((step, index) => <div className="funnel-step" key={step.label}><div><span>{step.label}</span><strong>{step.value}</strong></div><i style={{ width: `${step.width}%` }} />{index < funnel.length - 1 && <small>↓ {index === 0 ? "9.6%" : index === 1 ? "64.8%" : "64.7%"}</small>}</div>)}</div>
              <div className="funnel-insight"><span>↗</span><div><strong>Activation improved 3.1%</strong><p>Most of the lift came from the workspace import step.</p></div></div>
            </section>
          </div>

          <section id="retention" className="cohort-card">
            <div className="card-heading"><div><p className="eyebrow">Retention</p><h2>Weekly cohort health</h2></div><span className="status-pill">On track</span></div>
            <div className="cohort-grid">
              <div className="cohort-labels"><span>Cohort</span><strong>Jul 07</strong><strong>Jul 14</strong><strong>Jul 21</strong><strong>Jul 28</strong></div>
              {[0.94,0.82,0.73,0.65, 0.91,0.79,0.69,0.58, 0.96,0.84,0.76,0.67, 0.93,0.81,0.72,0.62].map((opacity, index) => <i key={index} style={{ opacity }}><span>{Math.round(opacity * 52)}%</span></i>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
