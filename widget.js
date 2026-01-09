(function () {
  const script =
    document.currentScript ||
    document.querySelector("script[data-project-id]");

  const PROJECT_ID = script?.dataset?.projectId;

  if (!PROJECT_ID) {
    console.error("❌ SolviAI: Missing data-project-id");
    return;
  }

  const APP_URL =
    "https://vite-react-tau-five-75.vercel.app/?project_id=" +
    encodeURIComponent(PROJECT_ID);

  if (window.__processaiChatLoaded) return;
  window.__processaiChatLoaded = true;

  function init() {
    if (!document.body) {
      setTimeout(init, 50);
      return;
    }

    if (document.getElementById("processai-bubble")) return;

    const chatButton = document.createElement("div");
    chatButton.id = "processai-bubble";
    chatButton.innerHTML = `
      <img
        src="https://www.solviai.co/solviai-logo.png"
        alt="SolviAI"
        style="width:34px;height:34px;object-fit:contain;"
      />
    `;

    Object.assign(chatButton.style, {
      position: "fixed",
      bottom: "85px",
      right: "25px",
      background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 10px 24px rgba(0,0,0,.25)",
      zIndex: "2147483647",
    });

    const iframe = document.createElement("iframe");
    iframe.id = "processai-frame";
    iframe.src = APP_URL;
    iframe.allow = "microphone; autoplay";
    iframe.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-forms"
    );

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
    });

    document.body.appendChild(chatButton);
    document.body.appendChild(iframe);

    let open = false;
    chatButton.onclick = () => {
      open = !open;
      iframe.style.opacity = open ? "1" : "0";
      iframe.style.pointerEvents = open ? "auto" : "none";
      iframe.style.transform = open
        ? "translateY(0)"
        : "translateY(100px)";
    };
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
