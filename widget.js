(function () {
  "use strict";

  // Get config from script tag
  const script =
    document.currentScript || document.querySelector("script[data-project-id]");

  const PROJECT_ID = script?.dataset?.projectId;
  const BRAND_LOGO = script?.dataset?.brandLogo || "";

  if (!PROJECT_ID) {
    console.error("❌ Missing data-project-id");
    return;
  }

  // Build iframe URL
  const params = new URLSearchParams();
  params.set("project_id", PROJECT_ID);
  if (BRAND_LOGO) params.set("brand_logo", BRAND_LOGO);

  const IFRAME_URL =
    "https://vite-react-tau-five-75.vercel.app/?" + params.toString();

  // Prevent multiple loads
  if (window.__solviaiLoaded) return;
  window.__solviaiLoaded = true;

  function createWidget() {
    if (!document.body) {
      setTimeout(createWidget, 100);
      return;
    }

    // Don't create duplicates
    if (document.getElementById("solviai-chat-bubble")) return;

    // Create bubble button
    const bubble = document.createElement("button");
    bubble.id = "solviai-chat-bubble";
    bubble.type = "button";
    bubble.setAttribute("aria-label", "Open SolviAI chat");

    bubble.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <path d="M4 15a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z" />
        <path d="M20 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
        <path d="M12 19v2" />
      </svg>
    `;

    // ✅ IMPORTANT: reset inset/left/top so Framer can't force bottom-left
    bubble.style.cssText = `
      all: unset !important;
      box-sizing: border-box !important;

      position: fixed !important;
      inset: auto !important;
      left: auto !important;
      top: auto !important;
      right: 20px !important;
      bottom: 20px !important;

      width: 56px !important;
      height: 56px !important;
      border-radius: 50% !important;

      background: linear-gradient(135deg, #7C3AED, #5B21B6) !important;
      color: white !important;

      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      cursor: pointer !important;
      box-shadow: 0 10px 24px rgba(0,0,0,0.35) !important;
      z-index: 2147483647 !important;

      padding: 0 !important;
      margin: 0 !important;
    `;

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.id = "solviai-chat-iframe";
    iframe.src = IFRAME_URL;
    iframe.title = "SolviAI Chat";
    iframe.allow = "microphone; autoplay";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");

    // ✅ Same hardening here
    iframe.style.cssText = `
      position: fixed !important;
      inset: auto !important;
      left: auto !important;
      top: auto !important;
      right: 20px !important;
      bottom: 90px !important;

      width: 380px !important;
      height: 600px !important;

      border: none !important;
      border-radius: 12px !important;
      box-shadow: 0 12px 28px rgba(0,0,0,0.35) !important;

      z-index: 2147483646 !important;
      display: none !important;
      background: transparent !important;
    `;

    // Add to page
    document.body.appendChild(bubble);
    document.body.appendChild(iframe);

    // Toggle on click
    let open = false;
    bubble.onclick = function () {
      open = !open;
      iframe.style.display = open ? "block" : "none";
    };

    console.log("✅ SolviAI widget created");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
