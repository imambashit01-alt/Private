const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const bottomCurrentTime = document.getElementById("bottomCurrentTime");
const bottomDuration = document.getElementById("bottomDuration");
const bottomProgressFill = document.getElementById("bottomProgressFill");
const volumeSlider = document.getElementById("volumeSlider");
const bottomVolumeSlider = document.getElementById("bottomVolumeSlider");
const lyricsList = document.getElementById("lyricsList");
const lyricsDot = document.getElementById("lyricsDot");
const playerShell = document.getElementById("playerShell");
const playToggles = document.querySelectorAll('[data-action="toggle"]');
const prevButtons = document.querySelectorAll('[data-action="prev"]');
const nextButtons = document.querySelectorAll('[data-action="next"]');
const shuffleButtons = document.querySelectorAll('[data-action="shuffle"]');
const repeatButtons = document.querySelectorAll('[data-action="repeat"]');
const bottomProgressBg = document.querySelector(".bottom-progress-bg");

// Songs Data
const songs = [
  {
    id: 0,
    title: "I Don't Love You",
    artist: "My Chemical Romance",
    cover: "I Dont Love You/coverlagu.jpg",
    audio: "I Dont Love You/I Don't Love You_spotdown.org.mp3",
    lrc: "I Dont Love You/I Don't Love You - My Chemical Romance (1).lrc",
    lrcEmbedded: `[ar: My Chemical Romance]
[ti: I Don't Love You]

[00:25.94]Well, when you go
[00:31.21]So ever think I'll make you try to stay
[00:37.67]And maybe when you get back
[00:40.52]I'll be off to find another way
[00:48.12]And after all this time that you still owe
[00:54.04]You're still a good-for-nothing, I don't know
[01:00.16]So take your gloves and get out
[01:03.77]Better get out while you can
[01:13.49]When you go
[01:17.38]And would you even turn to say
[01:23.68]"I don't love you like I did yesterday"?
[01:33.72]Sometimes I cry so hard from pleading
[01:39.82]So sick and tired of all the needless beating
[01:45.68]But baby, when they knock you down and out
[01:50.58]Is where you oughta stay
[01:56.20]And after all the blood that you still owe
[02:01.90]Another dollar's just another blow
[02:08.17]So fix your eyes and get up
[02:11.63]Better get up while you can
[02:16.56]Whoa, whoa, whoa-whoa
[02:21.02]When you go
[02:25.16]And would you even turn to say
[02:31.05]"I don't love you like I did yesterday"?
[02:40.35]Well, come on, come on
[03:06.38]When you go
[03:10.59]Would you have the guts to say
[03:16.97]"I don't love you like I loved you yesterday"?
[03:27.86]I don't love you like I loved you yesterday
[03:39.17]I don't love you like I loved you yesterday`
  },
  {
    id: 1,
    title: "The Reason",
    artist: "Hoobastank",
    cover: "The Reason/Hoobastank_-_The_Reason.jpg",
    audio: "The Reason/The Reason_spotdown.org.mp3",
    lrc: "The Reason/The Reason - Hoobastank.lrc",
    lrcEmbedded: `[ti:The Reason]
[ar:Hoobastank]
[al:The Reason (20th Anniversary)]

[00:14.24]I'm not a perfect person
[00:19.80]There's many things I wish I didn't do
[00:25.86]But I continue learning
[00:31.51]I never meant to do those things to you
[00:37.27]And so I have to say before I go
[00:43.93]That I just want you to know
[00:48.98]I've found a reason for me
[00:54.71]To change who I used to be
[01:00.54]A reason to start over new
[01:07.32]And the reason is you
[01:12.01]I'm sorry that I hurt you
[01:17.96]It's somethin' I must live with every day
[01:23.76]And all the pain I put you through
[01:29.45]I wish that I could take it all away
[01:35.21]And be the one who catches all your tears
[01:41.77]That's why I need you to hear
[01:46.82]I've found a reason for me
[01:52.69]To change who I used to be
[01:58.43]A reason to start over new
[02:05.22]And the reason is you
[02:10.97]And the reason is you
[02:16.59]And the reason is you
[02:22.50]And the reason is you
[02:32.92]I'm not a perfect person
[02:38.82]I never meant to do those things to you
[02:44.62]And so I have to say before I go
[02:51.10]That I just want you to know
[02:56.29]I've found a reason for me
[03:02.06]To change who I used to be
[03:07.76]A reason to start over new
[03:14.74]And the reason is you
[03:19.41]I've found a reason to show
[03:25.17]A side of me you didn't know
[03:30.91]A reason for all that I do
[03:37.72]And the reason is you`
  },
  {
    id: 2,
    title: "We Fell Love In October",
    artist: "girl in red",
    cover: "We Fell Love In October/We Fell Love In October.jpg",
    audio: "We Fell Love In October/we fell in love in october_spotdown.org.mp3",
    lrc: "We Fell Love In October/we fell in love in october - girl in red.lrc",
    lrcEmbedded: `[ti:we fell in love in october]
[ar:girl in red]
[al:we fell in love in october / October Passed Me By]

[00:18.25]Smoking cigarettes on the roof
[00:25.08]You look so pretty and I love this view
[00:32.43]We fell in love in October
[00:36.76]That's why I love fall
[00:40.75]Looking at the stars
[00:44.19]Admiring from afar
[00:48.22]My girl, my girl, my girl
[00:53.26]You will be my girl
[00:55.57]My girl, my girl, my girl
[01:00.35]You will be my world
[01:03.06]My world, my world, my world
[01:07.70]You will be my girl
[01:17.47]Smoking cigarettes on the roof
[01:23.93]You look so pretty and I love this view
[01:31.40]Don't bother looking down
[01:34.87]We're not going that way
[01:38.65]At least I know I am here to stay
[01:46.52]We fell in love in October
[01:50.00]That's why I love fall
[01:54.85]Looking at the stars
[01:58.11]Admiring from afar
[02:05.07](My girl, my girl, my girl)
[02:16.31]My girl, my girl, my girl
[02:20.76]You will be my girl
[02:24.19]My girl, my girl, my girl
[02:28.59]You will be my girl
[02:31.28]My girl, my girl, my girl
[02:36.10]You will be my girl
[02:38.74]My girl, my girl, my girl
[02:43.31]You will be my world
[02:46.01]My world, my world, my world
[02:50.98]You will be my girl`
  },
  {
    id: 3,
    title: "The Man Who Can't Be Moved",
    artist: "The Script",
    cover: "The Man Who Can't Be Moved/The Man Who Can't Be Moved.jpg",
    audio: "The Man Who Can't Be Moved/The Man Who Can't Be Moved_spotdown.org.mp3",
    lrc: "The Man Who Can't Be Moved/The Man Who Can't Be Moved - The Script.lrc",
    lrcEmbedded: `[ti:The Man Who Can't Be Moved]
[ar:The Script]
[al:The Script]

[00:09.98]Going back to the corner where I first saw you
[00:14.60]Gonna camp in my sleeping bag, I'm not gonna move
[00:19.24]Got some words on cardboard, got your picture in my hand
[00:23.60]Saying, "If you see this girl, can you tell her where I am?"
[00:28.57]Some try to hand me money, they don't understand
[00:33.26]I'm not broke, I'm just a broken-hearted man
[00:38.27]I know it makes no sense but what else can I do?
[00:42.97]And how can I move on when I'm still in love with you?
[00:47.83]'Cause if one day you wake up and find that you're missing me
[00:52.60]And your heart starts to wonder where on this Earth I could be
[00:57.23]Thinking maybe you'll come back here to the place that we'd meet
[01:02.10]And you'll see me waiting for you on the corner of the street
[01:06.42]So I'm not moving
[01:11.13]I'm not moving
[01:27.24]Policeman says, "Son, you can't stay here"
[01:30.84]I said, "There's someone I'm waiting for if it's a day, a month, a year
[01:36.11]Gotta stand my ground even if it rains or snows
[01:41.06]If she changes her mind, this is the first place she will go"
[01:45.38]'Cause if one day you wake up and find that you're missing me (oh, missing me)
[01:50.26]And your heart starts to wonder where on this Earth I could be
[01:55.09]Thinking maybe you'll come back here to the place that we'd meet
[02:00.07]And you'll see me waiting for you on the corner of the street
[02:04.15]So I'm not moving
[02:08.58]I'm not moving
[02:13.64]I'm not moving
[02:18.22]I'm not moving
[02:24.72]People talk about the guy who's waiting on a girl, whoa
[02:34.48]There are no holes in his shoes but a big hole in his world, hmm
[02:43.47]And maybe I'll get famous as the man who can't be moved
[02:48.14]And maybe you won't mean to, but you'll see me on the news
[02:52.26]And you'll come running to the corner
[02:55.85]'Cause you'll know it's just for you
[02:59.84]I'm the man who can't be moved
[03:04.30]I'm the man who can't be moved
[03:07.06]'Cause if one day you wake up and find that you're missing me
[03:11.01]And your heart starts to wonder where on this Earth I could be
[03:16.67]Thinking maybe you'll come back here to the place that we'd meet
[03:21.63]And you'll see me waiting for you on the corner of the street
[03:26.08]'Cause if one day you wake up and find that you're missing me
[03:30.61]And your heart starts to wonder where on this Earth I could be
[03:35.84]Thinking maybe you'll come back here to the place that we'd meet
[03:40.12]And you'll see me waiting for you on the corner of the street
[03:45.11]Going back to the corner where I first saw you
[03:50.46]Gonna camp in my sleeping bag, I'm not gonna move`
  }
];

let currentSongIndex = 0;

// Song: I Don't Love You — My Chemical Romance
const LRC_PATH = "I Dont Love You/I Don't Love You - My Chemical Romance (1).lrc";

// Embedded fallback — fetch() tidak jalan saat dibuka via file://
const EMBEDDED_LRC = `
[ar: My Chemical Romance]
[ti: I Don't Love You]

[00:25.94]Well, when you go
[00:31.21]So ever think I'll make you try to stay
[00:37.67]And maybe when you get back
[00:40.52]I'll be off to find another way
[00:48.12]And after all this time that you still owe
[00:54.04]You're still a good-for-nothing, I don't know
[01:00.16]So take your gloves and get out
[01:03.77]Better get out while you can
[01:13.49]When you go
[01:17.38]And would you even turn to say
[01:23.68]"I don't love you like I did yesterday"?
[01:33.72]Sometimes I cry so hard from pleading
[01:39.82]So sick and tired of all the needless beating
[01:45.68]But baby, when they knock you down and out
[01:50.58]Is where you oughta stay
[01:56.20]And after all the blood that you still owe
[02:01.90]Another dollar's just another blow
[02:08.17]So fix your eyes and get up
[02:11.63]Better get up while you can
[02:16.56]Whoa, whoa, whoa-whoa
[02:21.02]When you go
[02:25.16]And would you even turn to say
[02:31.05]"I don't love you like I did yesterday"?
[02:40.35]Well, come on, come on
[03:06.38]When you go
[03:10.59]Would you have the guts to say
[03:16.97]"I don't love you like I loved you yesterday"?
[03:27.86]I don't love you like I loved you yesterday
[03:39.17]I don't love you like I loved you yesterday
`;

let lyrics = [];
let activeLyricIndex = -1;
let repeatEnabled = false;
let shuffleEnabled = false;
let lrcOffset = 0;
let rafId = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function parseTimestamp(minStr, secStr, fracStr) {
  const minutes = Number.parseInt(minStr, 10);
  const seconds = Number.parseInt(secStr, 10);
  let fraction = 0;

  if (fracStr) {
    const digits = fracStr.length;
    fraction = Number.parseInt(fracStr, 10) / Math.pow(10, digits);
  }

  return minutes * 60 + seconds + fraction;
}

function parseLrc(text) {
  const parsed = [];
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    const offsetMatch = line.match(/^\[offset:\s*(-?\d+)\]/i);
    if (offsetMatch) {
      lrcOffset = Number.parseInt(offsetMatch[1], 10) / 1000;
      continue;
    }

    const tagRegex = /\[(\d{2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
    const timestamps = [];
    let match;

    while ((match = tagRegex.exec(line)) !== null) {
      timestamps.push(parseTimestamp(match[1], match[2], match[3]));
    }

    if (!timestamps.length) continue;

    const lyric = line.replace(/\[\d{2}:\d{2}(?:\.\d{1,3})?\]/g, "").trim();
    if (!lyric) continue;

    for (const time of timestamps) {
      parsed.push({ time: time + lrcOffset, text: lyric });
    }
  }

  parsed.sort((a, b) => a.time - b.time);
  return parsed;
}

function findActiveIndex(currentTime) {
  if (!lyrics.length) return -1;

  let lo = 0;
  let hi = lyrics.length - 1;
  let result = 0;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (lyrics[mid].time <= currentTime) {
      result = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return result;
}

function renderLyrics(lyricData) {
  lyricsList.innerHTML = "";

  if (!lyricData.length) {
    const fallback = document.createElement("div");
    fallback.className = "lyric-line active";
    fallback.textContent = "Lirik belum tersedia.";
    lyricsList.appendChild(fallback);
    return;
  }

  lyricData.forEach((lyric, index) => {
    const line = document.createElement("div");
    line.className = "lyric-line";
    line.dataset.index = String(index);
    line.textContent = lyric.text;
    line.addEventListener("click", () => {
      audio.currentTime = lyric.time;
      if (audio.paused) audio.play().catch(() => {});
    });
    lyricsList.appendChild(line);
  });

  activeLyricIndex = -1;
  updateLyricClasses(0);
}

function updateLyricClasses(index) {
  const items = lyricsList.children;
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active", "past", "next");
    if (i < index) items[i].classList.add("past");
    else if (i === index) items[i].classList.add("active");
    else if (i === index + 1) items[i].classList.add("next");
  }
}

function updateLyricsDot(index, currentTime) {
  const items = lyricsList.children;
  if (!items.length || index < 0 || !lyricsDot) return;

  const activeEl = items[index];
  const viewport = document.querySelector(".lyrics-viewport");
  if (!activeEl || !viewport) return;

  const lineStart = lyrics[index].time;
  const lineEnd = lyrics[index + 1]?.time ?? lineStart + 5;
  const lineProgress = Math.min(1, Math.max(0, (currentTime - lineStart) / (lineEnd - lineStart)));

  const viewportRect = viewport.getBoundingClientRect();
  const lineRect = activeEl.getBoundingClientRect();
  const dotTop = lineRect.top - viewportRect.top + lineRect.height * lineProgress;

  lyricsDot.style.top = `${dotTop}px`;
}

function updateLyrics(currentTime) {
  if (!lyrics.length) return;

  const nextIndex = findActiveIndex(currentTime);

  if (nextIndex !== activeLyricIndex) {
    activeLyricIndex = nextIndex;
    updateLyricClasses(activeLyricIndex);

    const activeItem = lyricsList.children[activeLyricIndex];
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  updateLyricsDot(activeLyricIndex, currentTime);
}

function updateVolumeUI(value) {
  const pct = value * 100;
  const gradient = `linear-gradient(90deg, var(--accent) ${pct}%, rgba(255,255,255,0.2) ${pct}%)`;
  volumeSlider.style.background = gradient;
  bottomVolumeSlider.style.background = gradient;
}

function syncPlaybackUI() {
  const current = audio.currentTime;
  const duration = audio.duration || 0;
  const percent = duration ? (current / duration) * 100 : 0;

  progressBar.max = String(duration || 100);
  progressBar.value = String(current);
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
  bottomCurrentTime.textContent = formatTime(current);
  bottomDuration.textContent = formatTime(duration);
  bottomProgressFill.style.width = `${percent}%`;

  progressBar.style.background = `linear-gradient(90deg, var(--accent) ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
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
  audio.currentTime = Math.min(Math.random() * max + 5, audio.duration - 1);
}

function toggleRepeat() {
  repeatEnabled = !repeatEnabled;
  repeatButtons.forEach((btn) => btn.classList.toggle("active", repeatEnabled));
}

function toggleShuffle() {
  shuffleEnabled = !shuffleEnabled;
  shuffleButtons.forEach((btn) => btn.classList.toggle("active", shuffleEnabled));
}

function setPlayState(isPlaying) {
  playerShell.classList.toggle("is-playing", isPlaying);
  playToggles.forEach((btn) => btn.classList.toggle("is-playing", isPlaying));
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

async function loadLyrics(songIndex = currentSongIndex) {
  const song = songs[songIndex];
  let text = song.lrcEmbedded;

  if (location.protocol !== "file:") {
    try {
      const response = await fetch(encodeURI(song.lrc), { cache: "no-store" });
      if (response.ok) text = await response.text();
    } catch {
      /* gunakan embedded */
    }
  }

  lrcOffset = 0;
  lyrics = parseLrc(text);
  renderLyrics(lyrics);
  syncPlaybackUI();
}

function loadSong(index) {
  if (index < 0 || index >= songs.length || index === currentSongIndex) return;
  
  currentSongIndex = index;
  const song = songs[index];
  
  // Update sidebar highlighting
  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
  
  // Update main player info
  document.querySelector(".track-title").textContent = song.title;
  document.querySelector(".track-artist").textContent = song.artist;
  document.querySelector(".cover-art").src = song.cover;
  document.querySelector(".cover-art").alt = song.title;
  
  // Update bottom player info
  document.querySelector(".bottom-title").textContent = song.title;
  document.querySelector(".bottom-artist").textContent = song.artist;
  document.querySelector(".bottom-thumb").src = song.cover;
  
  // Stop current playback and update audio source
  audio.pause();
  audio.currentTime = 0;
  audio.src = song.audio;
  
  // Load lyrics for new song
  loadLyrics(index);
}

progressBar.addEventListener("input", () => {
  audio.currentTime = Number(progressBar.value);
  syncPlaybackUI();
});

if (bottomProgressBg) {
  bottomProgressBg.addEventListener("click", (e) => {
    const rect = bottomProgressBg.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = ratio * audio.duration;
      syncPlaybackUI();
    }
  });
}

function handleVolumeChange(e) {
  const val = Number(e.target.value);
  audio.volume = val;
  volumeSlider.value = String(val);
  bottomVolumeSlider.value = String(val);
  updateVolumeUI(val);
}

volumeSlider.addEventListener("input", handleVolumeChange);
bottomVolumeSlider.addEventListener("input", handleVolumeChange);

playToggles.forEach((btn) => btn.addEventListener("click", togglePlayback));
prevButtons.forEach((btn) => btn.addEventListener("click", () => seekBy(-10)));
nextButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (shuffleEnabled) jumpToRandomTime();
    else seekBy(10);
  })
);
shuffleButtons.forEach((btn) => btn.addEventListener("click", toggleShuffle));
repeatButtons.forEach((btn) => btn.addEventListener("click", toggleRepeat));

// Playlist items click handler
document.querySelectorAll(".playlist-item").forEach((item) => {
  item.addEventListener("click", () => {
    const index = parseInt(item.dataset.songIndex, 10);
    loadSong(index);
  });
});

function addPlaylistItem(title, artist = "Unknown") {
  const newId = songs.length;
  const newSong = {
    id: newId,
    title: title,
    artist: artist,
    cover: "coverlagu.jpg",
    audio: `${title}/${title}.mp3`,
    lrc: `${title}/${title}.lrc`,
    lrcEmbedded: `[ar: ${artist}]
[ti: ${title}]
[00:00.00]Lirik belum tersedia`
  };

  songs.push(newSong);

  // Create new playlist item button
  const playlistContainer = document.querySelector(".sidebar-playlists");
  const newButton = document.createElement("button");
  newButton.className = "playlist-item";
  newButton.dataset.songIndex = String(newId);

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("width", "16");
  icon.setAttribute("height", "16");
  icon.setAttribute("fill", "currentColor");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z");
  icon.appendChild(path);

  const text = document.createTextNode(title);
  newButton.appendChild(icon);
  newButton.appendChild(text);

  playlistContainer.appendChild(newButton);

  // Add click handler
  newButton.addEventListener("click", () => {
    const index = parseInt(newButton.dataset.songIndex, 10);
    loadSong(index);
  });
}

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
  const vol = audio.volume || 0.8;
  volumeSlider.value = String(vol);
  bottomVolumeSlider.value = String(vol);
  updateVolumeUI(vol);
  setPlayState(false);
  loadLyrics();

  // Handle "Tambah Playlist" button with modal dialog
  const addPlaylistBtn = document.querySelector(".add-playlist-btn");
  const modal = document.getElementById("addPlaylistModal");
  const songNameInput = document.getElementById("songNameInput");
  const artistNameInput = document.getElementById("artistNameInput");
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  if (addPlaylistBtn && modal) {
    addPlaylistBtn.addEventListener("click", () => {
      songNameInput.value = "";
      artistNameInput.value = "";
      modal.classList.remove("hidden");
      setTimeout(() => songNameInput.focus(), 100);
    });

    submitBtn.addEventListener("click", () => {
      const songName = songNameInput.value.trim();
      if (songName) {
        const artistName = artistNameInput.value.trim() || "Unknown";
        addPlaylistItem(songName, artistName);
        modal.classList.add("hidden");
      } else {
        alert("Masukkan nama lagu!");
      }
    });

    cancelBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Close modal when clicking on backdrop
    const backdrop = modal.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }

    // Allow Enter key to submit
    songNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });

    artistNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });
  }
});

window.addEventListener("beforeunload", stopRenderLoop);

