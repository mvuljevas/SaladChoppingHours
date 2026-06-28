export const starChefTargetHours = 50;

export const sampleChoppingHistory = [
  { day: "Mon", date: "Jun 22", hours: 6.4 },
  { day: "Tue", date: "Jun 23", hours: 8.2 },
  { day: "Wed", date: "Jun 24", hours: 7.1 },
  { day: "Thu", date: "Jun 25", hours: 9.5 },
  { day: "Fri", date: "Jun 26", hours: 6.8 },
  { day: "Sat", date: "Jun 27", hours: 10.4 },
  { day: "Sun", date: "Jun 28", hours: 5.6 },
];

export const sampleStatus = {
  installPath: "C:\\ProgramData\\Salad",
  installPathExists: null,
  machine: {
    id: "sample-machine",
    hostname: "This PC",
    platform: "win32",
  },
  elevation: {
    isAdmin: false,
    level: "medium",
    needsElevation: false,
  },
  wsl: {
    saladDistro: {
      name: "salad-enterprise-linux",
      state: "Unknown",
      running: false,
    },
  },
  process: {
    label: "Sample active",
    state: "sample",
    detected: true,
  },
  workload: {
    type: "sample",
    label: "Sample working",
    state: "sample",
    detected: true,
    confidence: "sample",
    source: "sample",
  },
  lastLogRead: "Sample data",
};

export const sampleRecentEvents = [
  {
    time: "10:42",
    source: "workload",
    message: "Chopping workload is reporting active compute time.",
  },
  {
    time: "09:58",
    source: "process",
    message: "Salad process detected from the local installation.",
  },
  {
    time: "08:17",
    source: "logs",
    message: "Log window parsed for status transitions.",
  },
  {
    time: "Yesterday",
    source: "summary",
    message: "Daily total closed at 10.4 Chopping hours.",
  },
];

export const sampleDashboard = {
  source: "sample",
  helperOnline: false,
  status: sampleStatus,
  choppingHistory: sampleChoppingHistory,
  choppingSummary: {
    source: "sample",
    confidence: "sample",
    signalCount: 0,
    intervalCount: 0,
    totalHours: sampleChoppingHistory.reduce((total, item) => total + item.hours, 0),
    lastSignalAt: null,
    coverage: {
      logCount: 0,
      parsedLogCount: 0,
      newestLogAt: null,
      oldestLogAt: null,
      retentionNote: "Start the helper to calculate local coverage.",
    },
    intervals: [],
  },
  workload: sampleStatus.workload,
  report: null,
  recentEvents: sampleRecentEvents,
  logs: [],
};
