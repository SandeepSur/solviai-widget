(function () {
  "use strict";

  const script =
    document.currentScript ||
    document.querySelector("script[data-project-id]");

  const PROJECT_ID = script?.dataset?.projectId;
  const BRAND_LOGO = script?.dataset?.brandLogo || "";

  if (!PROJECT_ID) {
    console.error("❌ SolviAI: Missing data-project-id on the embed script tag");
    return;
  }

  // Build iframe URL (SaaS params)
  const params = new URLSearchParams();
  params.set("project_id", PROJECT_ID);
  if (BRAND_LOGO) params.set("brand_logo", BRAND_LOGO);

  const IFRAME_URL =
    "https://vite-react-tau-five-75.vercel.app/?" + params.toString();

  // Prevent multiple loads
  if (window.__solviaiLoaded) return;
  window.__solviaiLoaded = true;

  function createWidget() {
    if (!document.body) return setTimeout(createWidget, 100);

    // Prevent duplicates
    if (document.getElementById("solviai-chat-bubble")) return;

    // Bubble button
    const bubble = document.createElement("button");
    bubble.id = "solviai-chat-bubble";
    bubble.type = "button";
    bubble.setAttribute("aria-label", "Open SolviAI chat");

    // Headset icon
    bubble.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <path d="M4 15a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z" />
        <path d="M20 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
        <path d="M12 19v2" />
      </svg>
    `;

    bubble.style.cssText = `
      position: fixed !important;
      right: 20px !important;
      bottom: 20px !important;
      left: auto !important;
      top: auto !important;

      width: 56px !important;
      height: 56px !important;
      border-radius: 50% !important;

      border: none !important;
      background: linear-gradient(135deg, #7C3AED, #5B21B6) !important;
      color: white !important;

      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      box-shadow: 0 10px 24px rgba(0,0,0,0.35) !important;
      z-index: 2147483647 !important;

      padding: 0 !important;
      margin: 0 !important;
    `;

    // Iframe
    const iframe = document.createElement("iframe");
    iframe.id = "solviai-chat-iframe";
    iframe.src = IFRAME_URL;
    iframe.title = "SolviAI Chat";
    iframe.allow = "microphone; autoplay";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");

    iframe.style.cssText = `
      position: fixed !important;
      right: 20px !important;
      bottom: 90px !important;
      left: auto !important;
      top: auto !important;

      width: 380px !important;
      height: 600px !important;

      border: none !important;
      border-radius: 12px !important;

      box-shadow: 0 12px 28px rgba(0,0,0,0.35) !important;
      z-index: 2147483646 !important;

      display: none !important;
      background: transparent !important;
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(iframe);

    let open = false;

    const openIcon =
      `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <path d="M4 15a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z" />
        <path d="M20 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
        <path d="M12 19v2" />
      </svg>`;

    const closeIcon =
      `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>`;

    bubble.onclick = function () {
      open = !open;
      iframe.style.display = open ? "block" : "none";
      bubble.innerHTML = open ? closeIcon : openIcon;
    };

    // Debug logs (helpful)
    console.log("✅ SolviAI widget loaded");
    console.log("➡️ Iframe URL:", IFRAME_URL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
