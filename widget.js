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

  if (window.__processaiChatLoaded) return;
  window.__processaiChatLoaded = true;

  function init() {
    if (!document.body) return setTimeout(init, 50);

    // ✅ Create a top-level portal container (avoids Framer transform/overflow issues)
    let portal = document.getElementById("solviai-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "solviai-portal";

      Object.assign(portal.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
        zIndex: "2147483647",
      });

      document.body.appendChild(portal);
    }

    // Prevent duplicates
    if (document.getElementById("processai-bubble")) return;

    // Bubble
    const chatButton = document.createElement("div");
    chatButton.id = "processai-bubble";
    chatButton.style.pointerEvents = "auto";

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

    Object.assign(chatButton.style, {
      position: "fixed",
      bottom: "85px",
      right: "25px",
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      userSelect: "none",
      boxShadow: "0 10px 24px rgba(0,0,0,.25)",
      zIndex: "2147483647",
      transform: "none",
      willChange: "transform",
    });

    // Iframe
    const iframe = document.createElement("iframe");
    iframe.id = "processai-frame";
    iframe.src = APP_URL;
    iframe.title = "SolviAI Chat";
    iframe.allow = "microphone; autoplay";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
    iframe.style.pointerEvents = "auto";

    Object.assign(iframe.style, {
      position: "fixed",
      bottom: "160px",
      right: "25px",
      width: "360px",
      height: "520px",
      border: "0",
      borderRadius: "14px",
      boxShadow: "0 12px 28px rgba(0,0,0,.3)",
      opacity: "0",
      pointerEvents: "none",
      transform: "translateY(100px)",
      transition: "all .45s ease",
      zIndex: "2147483646",
      background: "transparent",
      willChange: "transform, opacity",
    });

    // Append into portal (important)
    portal.appendChild(chatButton);
    portal.appendChild(iframe);

    let open = false;
    chatButton.onclick = () => {
      open = !open;
      iframe.style.opacity = open ? "1" : "0";
      iframe.style.pointerEvents = open ? "auto" : "none";
      iframe.style.transform = open ? "translateY(0)" : "translateY(100px)";
    };
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
