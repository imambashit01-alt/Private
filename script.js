const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const miniProgress = document.getElementById("miniProgress");
const lyricsList = document.getElementById("lyricsList");
const playToggles = document.querySelectorAll('[data-action="toggle"]');
const prevButtons = document.querySelectorAll('[data-action="prev"]');
const nextButtons = document.querySelectorAll('[data-action="next"]');
const repeatBtn = document.getElementById("repeatBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const playerShell = document.getElementById("playerShell");

// New control buttons (shuffle/repeat icons in the main controls row)
const shuffleMainBtn = document.querySelector('[data-action="shuffle"]');
const repeatMainBtn = document.querySelector('[data-action="repeat"]');


let lyrics = [];
let activeLyricIndex = -1;
let repeatEnabled = false;
let shuffleEnabled = false;
let rafId = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function parseLrc(text) {
  const parsed = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line) => {
    const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/);
    if (!match) return;

    const minutes = Number.parseInt(match[1], 10);
    const seconds = Number.parseInt(match[2], 10);
    const milliseconds = Number.parseInt((match[3] || "00").padEnd(3, "0"), 10);
    const lyric = match[4].trim();

    if (!lyric) return;

    parsed.push({
      time: minutes * 60 + seconds + milliseconds / 1000,
      text: lyric,
      words: lyric.split(/(\s+)/).filter(Boolean).map((word) => word.trim()).filter(Boolean),
    });
  });

  return parsed;
}

function renderLyrics(lyricData) {
  lyricsList.innerHTML = "";

  if (!lyricData.length) {
    const fallback = document.createElement("div");
    fallback.className = "lyric-line active";
    const textNode = document.createElement("div");
    textNode.className = "lyric-text";
    textNode.textContent = "Lirik belum tersedia.";
    fallback.appendChild(textNode);
    lyricsList.appendChild(fallback);
    return;
  }

  lyricData.forEach((lyric, index) => {
    const line = document.createElement("div");
    line.className = "lyric-line";
    line.dataset.index = String(index);

    const textNode = document.createElement("div");
    textNode.className = "lyric-text";

    const words = lyric.words || [lyric.text];
    words.forEach((word) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = `${word} `;
      textNode.appendChild(span);
    });

    line.appendChild(textNode);
    lyricsList.appendChild(line);
  });
}

function updateLyrics(currentTime) {
  if (!lyrics.length) return;

  let nextIndex = 0;
  while (nextIndex < lyrics.length - 1 && currentTime >= lyrics[nextIndex + 1].time) {
    nextIndex += 1;
  }

  if (nextIndex !== activeLyricIndex) {
    activeLyricIndex = nextIndex;
    const items = [...lyricsList.children];

    items.forEach((item, index) => {
      item.classList.remove("active", "previous", "next");
      if (index < activeLyricIndex) {
        item.classList.add("previous");
      } else if (index > activeLyricIndex) {
        item.classList.add("next");
      } else {
        item.classList.add("active");
      }
    });

    const activeItem = items[activeLyricIndex];
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const activeLine = lyrics[activeLyricIndex];
  const items = [...lyricsList.children];
  const activeItem = items[activeLyricIndex];

  if (!activeLine || !activeItem) return;

  const lineStart = activeLine.time;
  const lineEnd = lyrics[activeLyricIndex + 1]?.time ?? lineStart + 4;
  const rawProgress = (currentTime - lineStart) / Math.max(1, lineEnd - lineStart);
  const progress = Math.min(1, Math.max(0, rawProgress));
  const words = activeItem.querySelectorAll(".word");
  const wordCount = words.length || 1;
  const threshold = progress * wordCount;

  // Karaoke sweep: sapu hijau dari kiri -> kanan dengan animasi sangat halus.
  const fullIndex = Math.floor(threshold);
  const partial = threshold - fullIndex;

  words.forEach((word, index) => {
    let wordProgress = 0;
    if (index < fullIndex) wordProgress = 1;
    else if (index === fullIndex) wordProgress = partial;
    else wordProgress = 0;

    const isHighlighted = wordProgress > 0.02;
    word.classList.toggle("highlight", isHighlighted);
    word.style.setProperty("--word-progress", String(wordProgress));
  });
}


function syncPlaybackUI() {
  const current = audio.currentTime;
  const duration = audio.duration || 0;
  const percent = duration ? (current / duration) * 100 : 0;

  progressBar.max = String(duration || 100);
  progressBar.value = String(current);
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
  miniProgress.style.width = `${percent}%`;
  progressBar.style.background = `linear-gradient(90deg, var(--accent) ${percent}%, rgba(255,255,255,0.16) ${percent}%)`;
  updateLyrics(current);
}

function togglePlayback() {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

function seekBy(delta) {
  audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + delta));
}

function jumpToRandomTime() {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
  const max = Math.max(10, audio.duration - 15);
  const nextTime = Math.random() * max + 5;
  audio.currentTime = Math.min(nextTime, audio.duration - 1);
}

function toggleRepeat() {
  repeatEnabled = !repeatEnabled;
  repeatBtn.classList.toggle("active", repeatEnabled);
}

function toggleShuffle() {
  shuffleEnabled = !shuffleEnabled;
  shuffleBtn.classList.toggle("active", shuffleEnabled);
}

function setPlayState(isPlaying) {
  playerShell.classList.toggle("is-playing", isPlaying);
  playToggles.forEach((button) => {
    button.textContent = isPlaying ? "❚❚" : "▶";
  });
  const activeButtons = document.querySelectorAll('.icon-btn.primary');
  activeButtons.forEach((button) => {
    button.classList.toggle('is-playing', isPlaying);
  });
}

function startRenderLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  const tick = () => {
    syncPlaybackUI();
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
}

function stopRenderLoop() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

async function loadLyrics() {
  const lyricPath = "I Don't Love You - My Chemical Romance.lrc";

  try {
    const response = await fetch(lyricPath, { cache: "no-store" });
    if (!response.ok) throw new Error("LRC not found");
    const text = await response.text();
    lyrics = parseLrc(text);
    renderLyrics(lyrics);
    syncPlaybackUI();
  } catch (error) {
    lyrics = [];
    renderLyrics([]);
  }
}

progressBar.addEventListener("input", () => {
  audio.currentTime = Number(progressBar.value);
  syncPlaybackUI();
});

volumeSlider.addEventListener("input", () => {
  audio.volume = Number(volumeSlider.value);
});

playToggles.forEach((button) => button.addEventListener("click", togglePlayback));
prevButtons.forEach((button) => button.addEventListener("click", () => seekBy(-10)));
nextButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (shuffleEnabled) {
      jumpToRandomTime();
    } else {
      seekBy(10);
    }
  })
);
repeatBtn.addEventListener("click", toggleRepeat);
shuffleBtn.addEventListener("click", toggleShuffle);

if (repeatMainBtn) repeatMainBtn.addEventListener("click", toggleRepeat);
if (shuffleMainBtn) shuffleMainBtn.addEventListener("click", toggleShuffle);


audio.addEventListener("loadedmetadata", () => {
  syncPlaybackUI();
  startRenderLoop();
});
audio.addEventListener("play", () => setPlayState(true));
audio.addEventListener("pause", () => setPlayState(false));
audio.addEventListener("ended", () => {
  if (repeatEnabled) {
    audio.currentTime = 0;
    audio.play();
  } else if (shuffleEnabled) {
    jumpToRandomTime();
    audio.play();
  } else {
    setPlayState(false);
  }
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  volumeSlider.value = String(audio.volume || 0.8);
  setPlayState(false);
  loadLyrics();
});

window.addEventListener("beforeunload", stopRenderLoop);
