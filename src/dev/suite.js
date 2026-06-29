import { execFile } from "node:child_process";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createServer } from "vite";
import { ensureElevatedProcess } from "../helper/elevation.js";

const execFileAsync = promisify(execFile);
const appUrl = "http://127.0.0.1:5173/";

if (
  await ensureElevatedProcess({
    argv: [fileURLToPath(import.meta.url), ...process.argv.slice(2)],
    label: "SaladChoppingHours elevated suite",
  })
) {
  process.stdout.write("Requested elevated SaladChoppingHours suite through Windows UAC.\n");
  process.exit(0);
}

await import("../helper/server.js");

process.stdout.write("Starting SaladChoppingHours local suite...\n");
process.stdout.write("Helper: http://127.0.0.1:48173/health\n");

const vite = await createServer({
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});

await vite.listen();
vite.printUrls();
await openBrowser(appUrl);

if (!process.argv.includes("--no-monitor")) {
  await import("../helper/monitor.js");
}

process.stdout.write("\nPress Ctrl+C to stop the suite.\n");

process.on("SIGINT", stopSuite);
process.on("SIGTERM", stopSuite);

async function stopSuite() {
  process.stdout.write("\nStopping SaladChoppingHours local suite...\n");
  await vite.close();
  process.exit(0);
}

async function openBrowser(url) {
  if (process.env.SALAD_OPEN_BROWSER === "0") {
    return;
  }

  try {
    if (os.platform() === "win32") {
      await execFileAsync("cmd.exe", ["/c", "start", "", url], { windowsHide: true });
      return;
    }

    if (os.platform() === "darwin") {
      await execFileAsync("open", [url]);
      return;
    }

    await execFileAsync("xdg-open", [url]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    process.stdout.write(`Could not open browser automatically: ${message}\n`);
    process.stdout.write(`Open ${url} manually.\n`);
  }
}
