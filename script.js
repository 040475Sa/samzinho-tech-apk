// ===============================
// CONFIGURAÇÃO
// ===============================

// Coloque aqui o link do seu canal do YouTube.
const YOUTUBE_CHANNEL_URL = "https://youtube.com/@samzinhotech?si=fAcYdsmG4V8qKLtV";

// Coloque aqui o link direto ou página de download do seu APK.
const APK_DOWNLOAD_URL = "https://drive.google.com/file/d/18T7KITiONTGJnXhsOxm3OYqdOS4A2i6Y/view?usp=drivesdk";

// Tempo de espera em segundos.
const COUNTDOWN_SECONDS = 10;

// ===============================
// SISTEMA
// ===============================

const youtubeBtn = document.getElementById("youtubeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const countdown = document.getElementById("countdown");
const statusText = document.getElementById("status");

let timer = null;
let remaining = COUNTDOWN_SECONDS;

function alreadyVisitedChannel() {
  return sessionStorage.getItem("samzinho_channel_visited") === "yes";
}

function startCountdown() {
  if (timer !== null) return;

  remaining = COUNTDOWN_SECONDS;
  countdown.textContent = remaining;
  downloadBtn.classList.add("disabled");
  downloadBtn.setAttribute("aria-disabled", "true");
  downloadBtn.textContent = "🔒 DOWNLOAD BLOQUEADO";
  statusText.textContent = "Aguarde 10 segundos para liberar o download...";

  timer = setInterval(() => {
    remaining--;
    countdown.textContent = remaining;

    if (remaining <= 0) {
      clearInterval(timer);
      timer = null;

      downloadBtn.classList.remove("disabled");
      downloadBtn.removeAttribute("aria-disabled");
      downloadBtn.href = APK_DOWNLOAD_URL;
      downloadBtn.textContent = "🔓 BAIXAR APK";

      countdown.textContent = "✓";
      statusText.textContent = "Download liberado! Toque no botão acima para baixar.";
    }
  }, 1000);
}

youtubeBtn.addEventListener("click", () => {
  sessionStorage.setItem("samzinho_channel_visited", "yes");

  // Abre o canal em uma nova aba/janela.
  window.open(YOUTUBE_CHANNEL_URL, "_blank", "noopener,noreferrer");

  statusText.textContent = "Canal aberto. Volte para esta página para iniciar a contagem de 10 segundos.";
});

// Quando o utilizador volta para esta página.
window.addEventListener("pageshow", () => {
  if (alreadyVisitedChannel()) {
    startCountdown();
  }
});

// Também inicia quando a aba volta a ficar visível.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && alreadyVisitedChannel()) {
    startCountdown();
  }
});
