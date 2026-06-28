import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="app-shell">
      <section className="panel">
        <p className="eyebrow">SaladChoppingHours</p>
        <h1>Ready to calculate Chopping time.</h1>
        <p>
          The React/Vite application shell is in place. The next block will add
          the local Salad data access model, parser, and Star Chef calculations.
        </p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
