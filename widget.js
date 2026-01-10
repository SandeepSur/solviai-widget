(function () {
  const script =
    document.currentScript ||
    document.querySelector("script[data-project-id]");

  const PROJECT_ID = script?.dataset?.projectId;
  const BRAND_LOGO = script?.dataset?.brandLogo || "";

  if (!PROJECT_ID) {
    console.error("❌ SolviAI: Missing data-project-id");
    return;
  }

  const params = new URLSearchParams();
  params.set("project_id", PROJECT_ID);
  if (BRAND_LOGO) params.set("brand_logo", BRAND_LOGO);

  const APP_URL =
    "https://vite-react-tau-five-75.vercel.app/?" + params.toString();

  // Prevent duplicates
  if (window.__processaiChatLoaded) return;
  window.__processaiChatLoaded = true;

  function injectCss() {
    if (document.getElementById("solviai-widget-css")) return;

    const style = document.createElement("style");
    style.id = "solviai-widget-css";
    style.textContent = `
      #solviai-portal {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 2147483647 !important;
        transform: none !important;
      }

      #processai-bubble {
        position: fixed !important;
        right: 25px !important;
        bottom: 85px !important;
        left: auto !important;
        top: auto !important;

        width: 64px !important;
        height: 64px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #6D28D9, #8B5CF6) !important;

        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        cursor: pointer !important;
        user-select: none !important;
        pointer-events: auto !important;

        box-shadow: 0 10px 24px rgba(0,0,0,.25) !important;
        z-index: 2147483647 !important;

        transform: none !important;
      }

      #processai-frame {
        position: fixed !important;
        right: 25px !important;
        bottom: 160px !important;
        left: auto !important;
        top: auto !important;

        width: 360px !important;
        height: 520px !important;
        border: 0 !important;
        border-radius: 14px !important;

        box-shadow: 0 12px 28px rgba(0,0,0,.3) !important;
        z-index: 2147483646 !important;

        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    if (!document.documentElement) return setTimeout(init, 50);

    injectCss();

    // Create portal at the highest safe level
    let portal = document.getElementById("solviai-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "solviai-portal";
      // Attach to <html> (documentElement) to avoid body transforms
      document.documentElement.appendChild(portal);
    }

    // Prevent duplicates
    if (document.getElementById("processai-bubble")) return;

    // Bubble
    const chatButton = document.createElement("div");
    chatButton.id = "processai-bubble";
    chatButton.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-label="Customer Support"
      >
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <path d="M4 15a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2z" />
        <path d="M20 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
        <path d="M12 19v2" />
      </svg>
    `;

    // Iframe
    const iframe = document.createElement("iframe");
    iframe.id = "processai-frame";
    iframe.src = APP_URL;
    iframe.title = "SolviAI Chat";
    iframe.allow = "microphone; autoplay";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");

    // Start hidden (we control via JS)
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.transform = "translateY(100px)";
    iframe.style.transition = "all .45s ease";

    portal.appendChild(chatButton);
    portal.appendChild(iframe);

    // Toggle
    let open = false;
    chatButton.onclick = () => {
      open = !open;
      iframe.style.opacity = open ? "1" : "0";
      iframe.style.pointerEvents = open ? "auto" : "none";
      iframe.style.transform = open ? "translateY(0)" : "translateY(100px)";
    };

    // Debug (helps confirm positioning)
    try {
      const b = chatButton.getBoundingClientRect();
      console.log("✅ SolviAI bubble rect:", b);
    } catch {}
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
