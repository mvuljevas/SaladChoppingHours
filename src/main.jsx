import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  loadDashboardData,
  requestElevatedHelper,
  subscribeToEvents,
} from "./api/dashboard.js";
import { sampleDashboard, starChefTargetHours } from "./data/sampleDashboard.js";
import "./styles.css";

const tabs = ["Overview", "Live Monitor", "Logs & Coverage", "Machines", "Settings"];

function App() {
  const [dashboard, setDashboard] = useState(sampleDashboard);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveEvents, setLiveEvents] = useState([]);
  const { choppingHistory, choppingSummary, status, workload, source, logs, error } =
    dashboard;
  const weeklyHours = choppingHistory.reduce((total, item) => total + item.hours, 0);
  const progress = Math.min((weeklyHours / starChefTargetHours) * 100, 100);
  const remainingHours = Math.max(starChefTargetHours - weeklyHours, 0);
  const coverage = choppingSummary.coverage ?? {};
  const machineLabel = `${status.machine?.hostname ?? "This PC"} · ${status.machine?.id ?? "unknown"}`;

  async function refreshDashboard() {
    setIsRefreshing(true);
    setDashboard(await loadDashboardData());
    setIsRefreshing(false);
  }

  async function elevateHelper() {
    await requestElevatedHelper();
    setLiveEvents((events) => [
      {
        observedAt: new Date().toISOString(),
        source: "settings",
        message: "Requested elevated helper through Windows UAC.",
      },
      ...events,
    ]);
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  useEffect(() => {
    if (source !== "helper") {
      return undefined;
    }

    return subscribeToEvents((event) => {
      setLiveEvents((events) => [event, ...events].slice(0, 80));
    });
  }, [source]);

  const dashboardEvents = useMemo(
    () =>
      liveEvents.length > 0
        ? liveEvents
        : dashboard.recentEvents.map((event) => ({
            observedAt: event.time,
            source: event.source,
            message: event.message,
          })),
    [dashboard.recentEvents, liveEvents],
  );

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">SaladChoppingHours</p>
          <h1>Chopping truth from local signals.</h1>
          <p className="hero-copy">
            Weekly Star Chef progress is local and source-labelled. Lifetime Salad
            totals stay separate from this 7-day machine view.
          </p>
        </div>
        <div className="hero-actions">
          <span className={source === "helper" ? "source-pill live" : "source-pill"}>
            {source === "helper" ? "Helper online" : "Sample fallback"}
          </span>
          <button className="primary-button" type="button" onClick={refreshDashboard}>
            {isRefreshing ? "Scanning..." : "Refresh"}
          </button>
        </div>
      </header>

      <nav className="tabs" aria-label="Dashboard views">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab ? "tab active" : "tab"}
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {error ? <p className="warning-banner">{error}</p> : null}

      {activeTab === "Overview" ? (
        <Overview
          coverage={coverage}
          machineLabel={machineLabel}
          progress={progress}
          remainingHours={remainingHours}
          status={status}
          summary={choppingSummary}
          weeklyHours={weeklyHours}
          workload={workload}
          history={choppingHistory}
        />
      ) : null}

      {activeTab === "Live Monitor" ? (
        <LiveMonitor events={dashboardEvents} source={source} />
      ) : null}

      {activeTab === "Logs & Coverage" ? (
        <LogsCoverage coverage={coverage} logs={logs} summary={choppingSummary} />
      ) : null}

      {activeTab === "Machines" ? (
        <Machines report={dashboard.report} status={status} />
      ) : null}

      {activeTab === "Settings" ? (
        <Settings status={status} onElevate={elevateHelper} />
      ) : null}
    </main>
  );
}

function Overview({
  coverage,
  machineLabel,
  progress,
  remainingHours,
  status,
  summary,
  weeklyHours,
  workload,
  history,
}) {
  return (
    <>
      <section className="metric-grid" aria-label="Current Salad status">
        <StatusCard label="This PC" value={machineLabel} detail={status.installPath} />
        <StatusCard
          label="Salad process"
          value={status.process.label}
          detail={status.service?.label}
          tone={status.process.detected ? "positive" : "neutral"}
        />
        <StatusCard
          label="Active workload"
          value={workload.label}
          detail={`${workload.source} · ${workload.confidence}`}
          tone={workload.confidence === "confirmed" ? "positive" : "neutral"}
        />
        <StatusCard
          label="Star Chef gap"
          value={`${remainingHours.toFixed(1)}h`}
          detail={`${weeklyHours.toFixed(1)}h of ${starChefTargetHours}h tracked`}
        />
      </section>

      <section className="dashboard-grid">
        <section className="panel chart-panel" aria-labelledby="history-heading">
          <div className="panel-heading">
            <div>
              <p className="section-label">Local 7-day Chopping history</p>
              <h2 id="history-heading">0-24h per day</h2>
            </div>
            <span className="target-pill">{progress.toFixed(0)}% of Star Chef</span>
          </div>
          <ChoppingChart data={history} />
        </section>

        <aside className="panel summary-panel" aria-labelledby="summary-heading">
          <p className="section-label">Weekly summary</p>
          <h2 id="summary-heading">{weeklyHours.toFixed(1)}h</h2>
          <div className="progress-track" aria-label="Star Chef progress">
            <span style={{ width: `${progress}%` }} />
          </div>
          <Badge tone={summary.confidence}>{summary.confidence}</Badge>
          <p className="summary-copy">
            {summary.signalCount} signals, {summary.intervalCount} intervals,{" "}
            {coverage.parsedLogCount ?? 0} parsed logs. Last signal:{" "}
            {formatDateTime(summary.lastSignalAt)}.
          </p>
        </aside>
      </section>
    </>
  );
}

function LiveMonitor({ events, source }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">Live Monitor</p>
          <h2>Real-time local observations</h2>
        </div>
        <Badge tone={source === "helper" ? "confirmed" : "low-confidence"}>
          {source === "helper" ? "SSE connected" : "helper offline"}
        </Badge>
      </div>
      <ol className="console-list">
        {events.map((event, index) => (
          <li key={`${event.observedAt}-${index}`}>
            <time>{formatDateTime(event.observedAt)}</time>
            <strong>{event.source ?? "event"}</strong>
            <span>{formatEventMessage(event)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LogsCoverage({ coverage, logs, summary }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">Logs & Coverage</p>
          <h2>Source coverage and retention</h2>
        </div>
        <Badge tone={summary.confidence}>{summary.confidence}</Badge>
      </div>
      <div className="coverage-grid">
        <StatusCard label="Log files" value={String(coverage.logCount ?? logs.length)} />
        <StatusCard label="Parsed miner logs" value={String(coverage.parsedLogCount ?? 0)} />
        <StatusCard label="Newest log" value={formatDateTime(coverage.newestLogAt)} />
        <StatusCard label="Oldest log" value={formatDateTime(coverage.oldestLogAt)} />
      </div>
      <p className="summary-copy">{coverage.retentionNote}</p>
    </section>
  );
}

function Machines({ report, status }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">Machines</p>
          <h2>Local-first multi-PC model</h2>
        </div>
      </div>
      <div className="coverage-grid">
        <StatusCard label="Current machine" value={status.machine?.hostname ?? "This PC"} />
        <StatusCard label="Machine ID" value={status.machine?.id ?? "unknown"} />
        <StatusCard label="Exportable report" value={report ? "Ready" : "Unavailable"} />
        <StatusCard label="Combined total" value="Next block" detail="Import second PC JSON" />
      </div>
    </section>
  );
}

function Settings({ status, onElevate }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-label">Settings</p>
          <h2>Helper permissions</h2>
        </div>
        <Badge tone={status.elevation?.isAdmin ? "confirmed" : "low-confidence"}>
          {status.elevation?.level ?? "unknown"}
        </Badge>
      </div>
      <p className="summary-copy">
        The browser UI stays normal. If Windows hides process paths or WSL details,
        relaunch only the helper through UAC.
      </p>
      <button className="primary-button" type="button" onClick={onElevate}>
        Run helper as administrator
      </button>
    </section>
  );
}

function StatusCard({ label, value, detail, tone = "neutral" }) {
  return (
    <article className="metric-card">
      <p>{label}</p>
      <strong className={tone === "positive" ? "positive" : undefined}>{value}</strong>
      {detail ? <span>{detail}</span> : null}
    </article>
  );
}

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function ChoppingChart({ data }) {
  const maxHours = 24;

  return (
    <div className="chart" role="img" aria-label="Bar chart of Chopping hours by day">
      <div className="chart-scale" aria-hidden="true">
        <span>24h</span>
        <span>12h</span>
        <span>0h</span>
      </div>
      {data.map((item) => {
        const height = Math.min(Math.max((item.hours / maxHours) * 100, 2), 100);

        return (
          <div className="chart-column" key={item.isoDate ?? item.date}>
            <div className="bar-track">
              <span className="bar" style={{ height: `${height}%` }}>
                <span>{item.hours.toFixed(1)}h</span>
              </span>
            </div>
            <strong>{item.day}</strong>
            <small>{item.date}</small>
          </div>
        );
      })}
    </div>
  );
}

function formatDateTime(value) {
  if (!value) {
    return "Unknown";
  }

  if (value === "Sample data" || value === "Now" || value === "Yesterday") {
    return value;
  }

  const timestamp = new Date(value);

  if (Number.isNaN(timestamp.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

function formatEventMessage(event) {
  if (event.message) {
    return event.message;
  }

  if (event.parser) {
    return `${event.parser.totalHours.toFixed(2)}h, ${event.parser.signalCount} signals, workload ${event.workload?.label}`;
  }

  return "Observation received";
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
