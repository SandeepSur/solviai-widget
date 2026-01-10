(function () {
  "use strict";

  // Get config from script tag
  const script = document.currentScript || document.querySelector("script[data-project-id]");
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
  const IFRAME_URL = "https://vite-react-tau-five-75.vercel.app/?" + params.toString();

  console.log("🚀 SolviAI Widget");
  console.log("📍 URL:", IFRAME_URL);

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
    bubble.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    `;
    bubble.style.cssText = `
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
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
      box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
      z-index: 2147483647 !important;
      padding: 0 !important;
      margin: 0 !important;
    `;

    // Create iframe
    const iframe = document.createElement("iframe");
    iframe.id = "solviai-chat-iframe";
    iframe.src = IFRAME_URL;
    iframe.style.cssText = `
      position: fixed !important;
      bottom: 90px !important;
      right: 20px !important;
      width: 380px !important;
      height: 600px !important;
      border: none !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
      z-index: 2147483646 !important;
      display: none !important;
    `;
    iframe.allow = "microphone";

    // Add to page
    document.body.appendChild(bubble);
    document.body.appendChild(iframe);

    console.log("✅ Widget created");

    // Toggle on click
    let open = false;
    bubble.onclick = function() {
      open = !open;
      iframe.style.display = open ? "block" : "none";
      bubble.innerHTML = open 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
      console.log(open ? "✅ Opened" : "✅ Closed");
    };

    // Debug
    iframe.onload = () => console.log("✅ Iframe loaded");
    iframe.onerror = () => console.error("❌ Iframe error");
  }

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
