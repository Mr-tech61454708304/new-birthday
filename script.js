/* ============================================================
   script.js – Romantic Birthday Website Logic
   ============================================================ */

"use strict";

// ─── Gallery Images list (for lightbox navigation) ───────────
const galleryImages = [
  "images/pic1.jpeg",
  "images/WhatsApp Image 2026-05-06 at 11.26.26 AM.jpeg",
  "images/WhatsApp 2026-05-06 at 11.27.51 AM.jpeg",
  "images/WhatsApp 2026-05-06 at 11.27.52 AM.jpeg",
  "images/WhatsApp Image -05-06 at 11.26.26 AM.jpeg",
  "images/WhatsApp Image -05-06 at 11.27.51 AM.jpeg",
  "images/WhatsApp Image 2026--06 at 11.27.51 AM.jpeg",
  "images/WhatsApp Image 2026-05-06 a7.52 AM.jpeg",
  "images/WhatsApp Image 2026-05-at 11.27.52 AM.jpeg",
  "images/WhatsApp Image 2026-0506 at 11.27.52 AM.jpeg",
  "images/WhatsApp Image 2026-5-06 at 11.26.26 AM.jpeg",
  "images/WhatsApp I26-05-06 at 11.26.26 AM.jpeg",
  "images/tsApp Image 2026-05-06 at 11.27.52 AM.jpeg",
];

let currentLightboxIndex = 0;
let isTypingMessage = false;

// ─── FULL ROMANTIC MESSAGE ────────────────────────────────────
const fullMessage = `Marvi, me tumse bohat zyada mohabbat karta hu...

Tumhare bina ye duniya adhuri lagti hai. Jab tum muskurati ho, to lagta hai jaise duniya ki tamam khubsoorti ek jagah jam gayi ho. Teri hansi meri sabse pyari awaaz hai, aur teri aankhon mein mujhe apna sara jahaan dikhta hai. 💕

Woh din yaad hai jab hum pehli baar mile the? Main uss din se hi jaanta tha ke tum khaas ho... lekin ye nahi pata tha ke tum itni zyada khaas hogi. Tum ne meri zindagi ko ek naya rang de diya hai jo pehle kabhi nahi tha.

12 February 2026 — Karachi Stadium ka woh din... main uss din ko kabhi nahi bhool sakta. Tumhara chehra, tumhari muskaan, tumhara haath mere haath mein — yeh sub kuch ek khawab se bhi zyada khubsoorat tha. Uss ek din ne mujhe yaqeen dila diya ke tum hi meri manzil ho. 💞

Tum meri Miss Rontu ho, meri Chaanda ho, meri Pglu ho, meri Laddu ho... tum merely dil ki tamam duaon ka jawab ho. Teri aankhon mein doob ke mujhe chain milta hai jo kisi aur jagah nahi milta.

Aaj tumhara birthday hai, aur main chahta hoon ke ye din tumhari zindagi ka sabse khoobsurat din bane. Mere paas tumhare liye duniya bhar ki khushiyan laane ki takat nahi, lekin meri ek dua hai — ke Allah tumhe hamesha aise hi muskurata rakhe, teri tamam tamanaein poori kare, aur har woh taara tumhare liye chamke jis par tumne kabhi nazar daali ho.

Baby, I promise you — main hamesha tumhare saath hoon. Har musibat mein, har khushi mein, har lamhe mein. Tum mere liye sab kuch ho, aur ye sab kuch hone ki ahmiyat main zindagi bhar mehsoos karta rahunga.

Happy Birthday, meri jaan ❤️
Tumhari mohabbat kabhi kam nahi hogi — ye main apni rooh se wada karta hoon.`;

// ─── DOM Ready ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initFloatingHearts();
  initSparkles();
  initIntroTyping();
  initScrollAnimations();
  initMusic();
  initConfetti();
  initMessageTyping();
});

// ─── CUSTOM CURSOR ───────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById("cursor");
  const trail = document.getElementById("cursor-trail");

  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Smooth trail
    setTimeout(() => {
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
    }, 80);

    // Occasionally spawn a heart at cursor
    if (Math.random() < 0.04) spawnCursorHeart(e.clientX, e.clientY);
  });

  document.addEventListener("mousedown", () => {
    cursor.style.width = "14px";
    cursor.style.height = "14px";
  });
  document.addEventListener("mouseup", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  });
}

function spawnCursorHeart(x, y) {
  const h = document.createElement("div");
  h.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    pointer-events:none; z-index:9998;
    font-size:${10 + Math.random()*14}px;
    animation: cursorHeartAnim 1s ease-out forwards;
    transform: translate(-50%,-50%);
  `;
  h.textContent = ["❤️","💕","💗","💖","🌸"][Math.floor(Math.random()*5)];
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 1000);
}

// Inject cursor heart animation
const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
  @keyframes cursorHeartAnim {
    0%   { opacity:1; transform:translate(-50%,-50%) scale(0.5); }
    100% { opacity:0; transform:translate(-50%, -80px) scale(1.4); }
  }
`;
document.head.appendChild(cursorStyle);

// ─── FLOATING HEARTS ─────────────────────────────────────────
function initFloatingHearts() {
  const container = document.getElementById("floating-hearts");
  const emojis = ["❤️", "💕", "💗", "💖", "💞", "🌸", "🌹", "💝", "✨"];

  for (let i = 0; i < 18; i++) {
    createFloatingHeart(container, emojis);
  }
}

function createFloatingHeart(container, emojis) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 12;
  const delay = Math.random() * 10;
  const size = 0.8 + Math.random() * 1.2;

  heart.style.cssText = `
    left: ${left}%;
    font-size: ${size}rem;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  container.appendChild(heart);

  // Re-spawn after animation
  heart.addEventListener("animationend", () => {
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = (8 + Math.random() * 12) + "s";
    heart.style.animationDelay = "0s";
  });
}

// ─── SPARKLES ────────────────────────────────────────────────
function initSparkles() {
  const container = document.getElementById("sparkles");
  for (let i = 0; i < 60; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.cssText = `
      left: ${Math.random()*100}%;
      top: ${Math.random()*100}%;
      animation-duration: ${2 + Math.random()*3}s;
      animation-delay: ${Math.random()*4}s;
      width: ${2+Math.random()*4}px;
      height: ${2+Math.random()*4}px;
      background: ${Math.random()>0.5 ? '#ff6b9d' : '#d4aaff'};
    `;
    container.appendChild(s);
  }
}

// ─── INTRO TYPING ANIMATION ───────────────────────────────────
function initIntroTyping() {
  const titleEl = document.getElementById("intro-title");
  const subtitleEl = document.getElementById("intro-subtitle");

  const titleText = "Happy Birthday Marvi ❤️";
  const subtitleText = "My Saini, Munna Biscuit, Laddu, Baby, Miss Rontu, Pglu, Chaanda, Mrs Shayan 💖";

  typeText(titleEl, titleText, 80, () => {
    setTimeout(() => typeText(subtitleEl, subtitleText, 45), 400);
  });
}

function typeText(el, text, speed, callback) {
  let i = 0;
  el.textContent = "";

  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor-blink";
  el.appendChild(cursorSpan);

  const interval = setInterval(() => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursorSpan);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => cursorSpan.remove(), 1200);
      if (callback) callback();
    }
  }, speed);
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
function initScrollAnimations() {
  const items = document.querySelectorAll(".fade-in-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Start message typing when message section is visible
        if (entry.target.closest && entry.target.closest("#message") && !isTypingMessage) {
          startMessageTyping();
        }
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));

  // Special observer for message section
  const msgSection = document.getElementById("message");
  if (msgSection) {
    const msgObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isTypingMessage) {
        startMessageTyping();
      }
    }, { threshold: 0.2 });
    msgObserver.observe(msgSection);
  }

  // Finale confetti trigger
  const finaleSection = document.getElementById("finale");
  if (finaleSection) {
    const finaleObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startConfetti();
      }
    }, { threshold: 0.3 });
    finaleObserver.observe(finaleSection);
  }
}

// ─── MESSAGE TYPEWRITER ───────────────────────────────────────
function startMessageTyping() {
  if (isTypingMessage) return;
  isTypingMessage = true;

  const msgEl = document.getElementById("message-text");
  let i = 0;

  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor-blink";
  msgEl.innerHTML = "";
  msgEl.appendChild(cursorSpan);

  const interval = setInterval(() => {
    if (i < fullMessage.length) {
      const char = fullMessage[i];
      if (char === "\n") {
        msgEl.insertBefore(document.createElement("br"), cursorSpan);
        if (fullMessage[i+1] === "\n") {
          msgEl.insertBefore(document.createElement("br"), cursorSpan);
          i++;
        }
      } else {
        msgEl.insertBefore(document.createTextNode(char), cursorSpan);
      }
      i++;
    } else {
      clearInterval(interval);
    }
  }, 18);
}

// ─── MUSIC ───────────────────────────────────────────────────
function initMusic() {
  const audio = document.getElementById("bg-music");
  const btn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  const label = document.getElementById("music-label");

  audio.volume = 0.5;

  // Try autoplay
  const tryPlay = () => {
    audio.play().then(() => {
      icon.textContent = "🎵";
      label.textContent = "Music On";
    }).catch(() => {
      icon.textContent = "🔇";
      label.textContent = "Play Music";
    });
  };

  // Autoplay on first user interaction if blocked
  document.addEventListener("click", () => { tryPlay(); }, { once: true });
  tryPlay();

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play();
      icon.textContent = "🎵";
      label.textContent = "Music On";
    } else {
      audio.pause();
      icon.textContent = "🔇";
      label.textContent = "Music Off";
    }
  });
}

// ─── SMOOTH SCROLL ───────────────────────────────────────────
function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── LIGHTBOX ────────────────────────────────────────────────
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const vid = document.getElementById("lightbox-video");

  img.classList.remove("hidden");
  vid.classList.add("hidden");
  vid.pause && vid.pause();

  img.src = src;
  lb.classList.remove("hidden");

  currentLightboxIndex = galleryImages.indexOf(src);
  document.body.style.overflow = "hidden";
}

function openVideoLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const vid = document.getElementById("lightbox-video");

  img.classList.add("hidden");
  vid.classList.remove("hidden");
  vid.src = src;
  vid.play();
  lb.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  const vid = document.getElementById("lightbox-video");
  lb.classList.add("hidden");
  vid.pause && vid.pause();
  vid.src = "";
  document.body.style.overflow = "";
}

function lightboxNav(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById("lightbox-img");
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = galleryImages[currentLightboxIndex];
    img.style.opacity = "1";
    img.style.transition = "opacity 0.3s ease";
  }, 200);
}

// Keyboard nav
document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (lb.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxNav(-1);
  if (e.key === "ArrowRight") lightboxNav(1);
});

// ─── SURPRISE BUTTON ─────────────────────────────────────────
function triggerSurprise() {
  const btn = document.getElementById("surprise-btn");
  const msg = document.getElementById("surprise-message");
  const explosionEl = document.getElementById("hearts-explosion");

  // Hide button, show message
  btn.style.display = "none";
  msg.classList.remove("hidden");

  // Hearts explosion
  const emojis = ["❤️", "💕", "💗", "💖", "💞", "🌸", "🌹", "💝", "🎉", "✨", "🥰", "😍"];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "exp-heart";
      const txVal = (Math.random() - 0.5) * 400;
      const tyVal = -(Math.random() * 400 + 100);
      h.style.cssText = `
        left: 50%; top: 50%;
        --tx: ${txVal}px;
        --ty: ${tyVal}px;
        font-size: ${1 + Math.random()*2}rem;
      `;
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      explosionEl.appendChild(h);
      setTimeout(() => h.remove(), 1600);
    }, i * 40);
  }

  // More floating hearts
  const container = document.getElementById("floating-hearts");
  for (let i = 0; i < 10; i++) {
    createFloatingHeart(container, ["❤️", "💕", "💖", "💗", "💞"]);
  }
}

// ─── CONFETTI ────────────────────────────────────────────────
let confettiRunning = false;
let confettiAnimId = null;

function initConfetti() {
  // Confetti will start when finale section is visible
}

function startConfetti() {
  if (confettiRunning) return;
  confettiRunning = true;

  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const pieces = [];
  const colors = ["#ff6b9d", "#e91e8c", "#9b59b6", "#d4aaff", "#ffb3cb", "#ff69b4", "#ff1493", "#da70d6", "#fff", "#ffd700"];
  const shapes = ["heart", "circle", "rect"];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1.5 + Math.random() * 2.5,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 4,
      sway: Math.random() * 2,
      swayDir: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    });
  }

  function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y - size / 4, x - size / 2, y - size / 4, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2 + size / 4, x, y + size / 2 + size / 4, x, y + size);
    ctx.bezierCurveTo(x, y + size / 2 + size / 4, x + size / 2, y + size / 2 + size / 4, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y - size / 4, x, y - size / 4, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    pieces.forEach(p => {
      p.y += p.speed;
      p.x += Math.sin(p.phase + frame * 0.03) * p.sway * p.swayDir;
      p.angle += p.spin;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;

      if (p.shape === "heart") {
        drawHeart(ctx, 0, 0, p.size);
      } else if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      ctx.restore();
    });

    confettiAnimId = requestAnimationFrame(animate);
  }

  animate();

  // Stop after 15 seconds
  setTimeout(() => {
    confettiRunning = false;
    cancelAnimationFrame(confettiAnimId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 15000);
}

// Resize confetti canvas
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// ─── Make message section items also fade in ─────────────────
document.querySelectorAll(".timeline-item, .memory-card, .message-card, .gallery-item").forEach(el => {
  if (!el.classList.contains("fade-in-item")) {
    el.classList.add("fade-in-item");
    // observe
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        entries[0].target.classList.add("visible");
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
  }
});
