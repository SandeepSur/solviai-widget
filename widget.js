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
  if (window.__solviaiWidgetLoaded) return;
  window.__solviaiWidgetLoaded = true;

  console.log("🚀 SolviAI Widget Loading...");
  console.log("📍 Iframe URL:", APP_URL);

  function init() {
    // Wait for body to be ready
    if (!document.body) {
      return setTimeout(init, 50);
    }

    console.log("✅ Body ready, creating widget...");

    // Check for duplicates
    if (document.getElementById("solviai-widget-container")) {
      console.warn("⚠️ Widget already exists");
      return;
    }

    // Create a single container that holds everything
    const container = document.createElement("div");
    container.id = "solviai-widget-container";
    
    // Apply styles directly to container
    Object.assign(container.style, {
      position: "fixed",
      bottom: "0",
      right: "0",
      zIndex: "2147483647",
      pointerEvents: "none",
      fontFamily: "system-ui, -apple-system, sans-serif",
    });

    // Bubble button
    const bubble = document.createElement("button");
    bubble.id = "solviai-bubble";
    bubble.type = "button";
    bubble.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    `;

    Object.assign(bubble.style, {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      border: "none",
      background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s, box-shadow 0.2s",
      pointerEvents: "auto",
      zIndex: "2147483647",
    });

    // Hover effect
    bubble.onmouseenter = () => {
      bubble.style.transform = "scale(1.05)";
      bubble.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.6)";
    };
    bubble.onmouseleave = () => {
      bubble.style.transform = "scale(1)";
      bubble.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.4)";
    };

    // Iframe
    const iframe = document.createElement("iframe");
    iframe.id = "solviai-iframe";
    iframe.src = APP_URL;
    iframe.title = "SolviAI Chat";
    iframe.allow = "microphone; autoplay";
    
    // CRITICAL: Remove restrictive sandbox or make it more permissive
    // The issue is likely here - sandbox was too restrictive
    iframe.removeAttribute("sandbox"); // Try without sandbox first

    // Check if mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: fullscreen
      Object.assign(iframe.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        border: "none",
        display: "none",
        zIndex: "2147483646",
        pointerEvents: "auto",
        backgroundColor: "transparent", // Changed from white
      });
    } else {
      // Desktop: floating
      Object.assign(iframe.style, {
        position: "fixed",
        bottom: "100px",
        right: "24px",
        width: "400px",
        height: "600px",
        maxHeight: "calc(100vh - 120px)",
        border: "none",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        display: "none",
        zIndex: "2147483646",
        pointerEvents: "auto",
        backgroundColor: "transparent", // Changed from white
      });
    }

    // Append to container
    container.appendChild(bubble);
    container.appendChild(iframe);

    // Append container to body
    document.body.appendChild(container);

    console.log("✅ Widget elements created and appended");

    // Listen for iframe load events
    iframe.onload = () => {
      console.log("✅ Iframe loaded successfully");
    };

    iframe.onerror = (e) => {
      console.error("❌ Iframe failed to load:", e);
    };

    // Toggle functionality
    let isOpen = false;

    bubble.onclick = () => {
      isOpen = !isOpen;
      console.log("🔄 Toggle:", isOpen ? "OPEN" : "CLOSED");

      if (isOpen) {
        iframe.style.display = "block";
        console.log("📺 Iframe display set to block");
        console.log("📍 Iframe src:", iframe.src);
        
        bubble.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        `;
      } else {
        iframe.style.display = "none";
        bubble.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        `;
      }
    };

    // Debug positioning
    const rect = bubble.getBoundingClientRect();
    console.log("✅ Bubble position:", {
      bottom: rect.bottom,
      right: window.innerWidth - rect.right,
      visible: rect.width > 0 && rect.height > 0,
    });

    // Test if we can access the iframe URL directly
    console.log("🧪 Test: Open this URL directly in a new tab to verify it works:");
    console.log(APP_URL);
  }

  // Initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
