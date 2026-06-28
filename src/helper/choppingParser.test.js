import assert from "node:assert/strict";
import test from "node:test";
import { calculateChoppingSummary } from "./choppingParser.js";

test("calculates one continuous mining interval", () => {
  const summary = calculateChoppingSummary(
    [
      {
        relativePath: "logs\\T-Rex\\sample.log",
        lines: [
          "2026-06-27 10:00:00.000 -03:00 [INF] Mining at pool",
          "2026-06-27 10:00:30.000 -03:00 [INF] Mining at pool",
          "2026-06-27 10:01:00.000 -03:00 [INF] Mining at pool",
        ],
      },
    ],
    new Date("2026-06-28T12:00:00-03:00"),
  );

  assert.equal(summary.signalCount, 3);
  assert.equal(summary.intervalCount, 1);
  assert.equal(summary.history.find((day) => day.isoDate === "2026-06-27").hours, 0.03);
  assert.equal(summary.confidence, "confirmed");
});

test("splits intervals when mining signals have a large gap", () => {
  const summary = calculateChoppingSummary(
    [
      {
        relativePath: "logs\\Rigel\\sample.log",
        lines: [
          "2026-06-27 10:00:00.000 -03:00 [INF] Mining at pool",
          "2026-06-27 10:00:30.000 -03:00 [INF] Mining at pool",
          "2026-06-27 10:10:00.000 -03:00 [INF] Mining at pool",
        ],
      },
    ],
    new Date("2026-06-28T12:00:00-03:00"),
  );

  assert.equal(summary.intervalCount, 2);
  assert.equal(summary.intervals.every((interval) => interval.confidence === "confirmed"), true);
});

test("splits daily totals across midnight", () => {
  const summary = calculateChoppingSummary(
    [
      {
        relativePath: "logs\\T-Rex\\midnight.log",
        lines: [
          "2026-06-26 23:59:30.000 -03:00 [INF] Mining at pool",
          "2026-06-27 00:00:00.000 -03:00 [INF] Mining at pool",
          "2026-06-27 00:00:30.000 -03:00 [INF] Mining at pool",
        ],
      },
    ],
    new Date("2026-06-28T12:00:00-03:00"),
  );

  assert.equal(summary.history.find((day) => day.isoDate === "2026-06-26").hours, 0.01);
  assert.equal(summary.history.find((day) => day.isoDate === "2026-06-27").hours, 0.02);
});

test("deduplicates duplicate mining timestamps", () => {
  const summary = calculateChoppingSummary(
    [
      {
        relativePath: "logs\\T-Rex\\duplicate-a.log",
        lines: ["2026-06-27 10:00:00.000 -03:00 [INF] Mining at pool"],
      },
      {
        relativePath: "logs\\T-Rex\\duplicate-b.log",
        lines: ["2026-06-27 10:00:00.000 -03:00 [INF] Mining at pool"],
      },
    ],
    new Date("2026-06-28T12:00:00-03:00"),
  );

  assert.equal(summary.signalCount, 1);
  assert.equal(summary.intervalCount, 1);
});
