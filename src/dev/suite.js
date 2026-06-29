import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { ensureElevatedProcess } from "../helper/elevation.js";

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
