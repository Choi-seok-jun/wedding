(function createPetals() {
  const old = document.getElementById("petalLayer");
  if (old) old.remove();

  document.body.style.background = "#f7e4ec";

  const canvas = document.createElement("canvas");
  canvas.id = "petalLayer";
  canvas.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;z-index:9999;pointer-events:none;";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = "images/petal.png";

  const petals = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makePetal() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      w: 34 + Math.random() * 18,
      h: 26 + Math.random() * 12,
      xSpeed: 0.45 + Math.random() * 0.7,
      ySpeed: 0.28 + Math.random() * 0.35,
      flip: Math.random() * 6,
      flipSpeed: 0.004 + Math.random() * 0.012,
      opacity: 0.35 + Math.random() * 0.3
    };
  }

  img.onload = () => {
    resize();
    const count = Math.max(12, Math.floor((window.innerWidth * window.innerHeight) / 45000));
    for (let i = 0; i < count; i++) petals.push(makePetal());

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.x += p.xSpeed;
        p.y += p.ySpeed;
        p.flip += p.flipSpeed;
        if (p.y > canvas.height + 20 || p.x > canvas.width + 20) {
          p.y = -30;
          p.x = Math.random() * canvas.width;
        }
        const dw = p.w * (0.75 + Math.abs(Math.cos(p.flip)) * 0.25);
        const dh = p.h * (0.85 + Math.abs(Math.sin(p.flip)) * 0.15);
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.sin(p.flip) * 0.4);
        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      });
      requestAnimationFrame(render);
    }
    render();
  };

  window.addEventListener("resize", resize);
})();

const WEDDING_DATE = "2027-01-24T14:00:00+09:00";
const WEDDING_YEAR = 2027;
const WEDDING_MONTH = 1;
const WEDDING_DAY = 24;

function updateCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const now = Date.now();
  const diff = target - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

function createCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  const headers = ["일", "월", "화", "수", "목", "금", "토"];
  const header = document.createElement("div");
  header.className = "calendar-header";

  headers.forEach((day) => {
    const item = document.createElement("div");
    item.textContent = day;
    header.appendChild(item);
  });

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  const firstDay = new Date(WEDDING_YEAR, WEDDING_MONTH - 1, 1).getDay();
  const daysInMonth = new Date(WEDDING_YEAR, WEDDING_MONTH, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const item = document.createElement("div");
    item.className = "calendar-day";
    const weekday = (firstDay + day - 1) % 7;

    if (weekday === 0) item.classList.add("sunday");
    if (weekday === 6) item.classList.add("saturday");
    if (day === WEDDING_DAY) item.classList.add("wedding");

    item.textContent = day;
    grid.appendChild(item);
  }

  calendar.appendChild(header);
  calendar.appendChild(grid);
}

createCalendar();

const galleryImages = [
  "images/gallery/01.jpg",
  "images/gallery/02.jpg",
  "images/gallery/03.jpg",
  "images/gallery/04.jpg",
  "images/gallery/05.jpg",
  "images/gallery/06.jpg",
  "images/gallery/07.jpg",
  "images/gallery/08.jpg",
  "images/gallery/09.jpg"
];

const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.getElementById("galleryDots");
const gallerySlides = document.querySelectorAll("#galleryTrack .gallery-item");

if (galleryTrack && gallerySlides.length) {
  gallerySlides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    if (i === 0) dot.className = "on";
    dot.addEventListener("click", () => {
      galleryTrack.scrollTo({ left: galleryTrack.clientWidth * i, behavior: "smooth" });
    });
    galleryDots.appendChild(dot);
  });

  function updateDots() {
    const index = Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth);
    galleryDots.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("on", i === index);
    });
  }

  galleryTrack.addEventListener("scroll", updateDots);
  document.getElementById("galleryPrev")?.addEventListener("click", () => {
    galleryTrack.scrollBy({ left: -galleryTrack.clientWidth, behavior: "smooth" });
  });
  document.getElementById("galleryNext")?.addEventListener("click", () => {
    galleryTrack.scrollBy({ left: galleryTrack.clientWidth, behavior: "smooth" });
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImage = 0;

function openLightbox(index) {
  if (!lightbox || !lightboxImage) return;
  currentImage = index;
  lightboxImage.src = galleryImages[currentImage];
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showImage(index) {
  if (!lightboxImage) return;
  currentImage = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImage];
}

document.querySelectorAll(".gallery-item").forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(Number(button.dataset.index));
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener("click", () => showImage(currentImage - 1));
if (lightboxNext) lightboxNext.addEventListener("click", () => showImage(currentImage + 1));

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentImage - 1);
  if (event.key === "ArrowRight") showImage(currentImage + 1);
});

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

document.querySelectorAll(".copy-account").forEach((button) => {
  button.addEventListener("click", async () => {
    const account = button.dataset.account;
    try {
      await navigator.clipboard.writeText(account);
      showToast("계좌번호가 복사되었습니다.");
    } catch {
      showToast("복사에 실패했습니다.");
    }
  });
});

const copyUrl = document.getElementById("copyUrl");
if (copyUrl) {
  copyUrl.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("청첩장 주소가 복사되었습니다.");
    } catch {
      showToast("주소 복사에 실패했습니다.");
    }
  });
}

const shareButton = document.getElementById("shareButton");
if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: "최석준 ♥ 박수인의 결혼식",
      text: "2027년 1월 24일 라온제나 플로렌스홀에서 결혼합니다. 청첩장을 확인해 주세요.",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 사용자가 공유창을 닫은 경우
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("청첩장 주소가 복사되었습니다.");
      } catch {
        showToast("공유 기능을 사용할 수 없습니다.");
      }
    }
  });
}

const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;
let userMuted = false;

if (musicButton && bgMusic) {
  bgMusic.volume = 0.8;

  function setMusicUi(playing) {
    musicButton.classList.toggle("playing", playing);
    musicButton.textContent = playing ? "♫" : "♪";
    musicButton.setAttribute("aria-label", playing ? "배경음악 끄기" : "배경음악 켜기");
  }

  function startMusic() {
    if (userMuted || musicStarted) return;
    const pending = bgMusic.play();
    if (pending && pending.then) {
      pending.then(() => {
        musicStarted = true;
        setMusicUi(true);
      }).catch(() => {});
    }
  }

  function unlockMusic() {
    startMusic();
    if (musicStarted) {
      document.removeEventListener("pointerdown", unlockMusic);
      document.removeEventListener("touchstart", unlockMusic);
      document.removeEventListener("click", unlockMusic);
    }
  }

  document.addEventListener("pointerdown", unlockMusic);
  document.addEventListener("touchstart", unlockMusic);
  document.addEventListener("click", unlockMusic);

  musicButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (bgMusic.paused) {
      userMuted = false;
      const pending = bgMusic.play();
      if (pending && pending.then) {
        pending.then(() => {
          musicStarted = true;
          setMusicUi(true);
        }).catch(() => {
          showToast("음악 파일을 확인해주세요.");
        });
      }
    } else {
      userMuted = true;
      bgMusic.pause();
      setMusicUi(false);
    }
  });
}

const VENUE = {
  name: "라온제나 강남",
  address: "서울 강남구 학동로47길 5",
  lat: 37.5175,
  lng: 127.0382
};

function openMap(url) {
  window.location.href = url;
}

document.getElementById("navKakao")?.addEventListener("click", () => {
  openMap("kakaomap://route?ep=" + VENUE.lat + "," + VENUE.lng + "&by=CAR");
  setTimeout(() => {
    openMap("https://map.kakao.com/link/to/" + encodeURIComponent(VENUE.name) + "," + VENUE.lat + "," + VENUE.lng);
  }, 800);
});

document.getElementById("navTmap")?.addEventListener("click", () => {
  openMap("tmap://route?goalname=" + encodeURIComponent(VENUE.name) + "&goalx=" + VENUE.lng + "&goaly=" + VENUE.lat);
});

document.getElementById("navFast")?.addEventListener("click", () => {
  const appUrl =
    "nmap://route/walk?dlat=" + VENUE.lat +
    "&dlng=" + VENUE.lng +
    "&dname=" + encodeURIComponent("라온제나 플로렌스홀") +
    "&appname=wedding";
  const webUrl = "https://map.naver.com/p/search/" + encodeURIComponent("라온제나 플로렌스홀");
  window.location.href = appUrl;
  setTimeout(() => {
    window.location.href = webUrl;
  }, 900);
});

const GUESTBOOK_API = "https://script.google.com/macros/s/AKfycbyBC9yf2r4DNBediO4dHwzr_IODDZTD7RpRCRT566qOCF16BdKBaUD5zU3ZuKSo5eUsDA/exec";
const PAGE_SIZE = 5;
let guestbookItems = [];
let guestbookPage = 1;

function guestbookRequest(params) {
  return new Promise((resolve) => {
    const cb = "gb" + Date.now() + Math.floor(Math.random() * 1000);
    const timer = setTimeout(() => resolve({ ok: false, timeout: true }), 30000);
    window[cb] = (data) => {
      clearTimeout(timer);
      delete window[cb];
      resolve(data || { ok: false });
    };
    const s = document.createElement("script");
    s.src = GUESTBOOK_API + "?" + new URLSearchParams({ ...params, callback: cb });
    s.onerror = () => {
      clearTimeout(timer);
      resolve({ ok: false });
    };
    document.body.appendChild(s);
  });
}

function formatGuestDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "." + p(d.getMonth() + 1) + "." + p(d.getDate()) + "." + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
}

function renderGuestbook() {
  const list = document.getElementById("guestbookList");
  const pages = document.getElementById("guestbookPages");
  if (!list || !pages) return;
  if (!guestbookItems.length) {
    list.innerHTML = "<p class='guestbook-note'>아직 남겨진 글이 없습니다.</p>";
    pages.innerHTML = "";
    return;
  }
  const total = Math.max(1, Math.ceil(guestbookItems.length / PAGE_SIZE));
  guestbookPage = Math.min(guestbookPage, total);
  const start = (guestbookPage - 1) * PAGE_SIZE;
  list.innerHTML = guestbookItems.slice(start, start + PAGE_SIZE).map((item) => (
    '<article class="message-item"><div><strong>' + item.name + '</strong><span>' + formatGuestDate(item.created) + '</span><p>' + item.message + '</p></div>' +
    '<form class="message-delete" data-id="' + item.id + '"><input type="password" placeholder="password" required /><button type="submit">삭제</button></form></article>'
  )).join("");
  pages.innerHTML = Array.from({ length: total }, (_, i) => (
    '<button type="button" data-page="' + (i + 1) + '">' + (i + 1) + '</button>'
  )).join("");
}

async function loadGuestbook() {
  let data = await guestbookRequest({ action: "list" });
  if (!(data.ok && Array.isArray(data.items))) {
    data = await guestbookRequest({ action: "list" });
  }
  if (data.ok && Array.isArray(data.items)) {
    guestbookItems = data.items;
    renderGuestbook();
  }
}

const guestbookForm = document.getElementById("guestbookForm");
if (guestbookForm) {
  guestbookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = document.getElementById("guestbookNote");
    const item = {
      id: "local-" + Date.now(),
      name: document.getElementById("guestName").value.trim(),
      password: document.getElementById("guestPassword").value.trim(),
      message: document.getElementById("guestMessage").value.trim(),
      created: new Date().toISOString()
    };
    guestbookItems.unshift(item);
    guestbookPage = 1;
    renderGuestbook();
    guestbookForm.reset();
    if (note) note.textContent = "남겼습니다. 오타가 있으면 비밀번호를 입력하고 삭제하세요.";
    const data = await guestbookRequest({ action: "add", name: item.name, password: item.password, message: item.message });
    if (data.ok && Array.isArray(data.items)) {
      guestbookItems = data.items;
      renderGuestbook();
    }
  });

  document.getElementById("guestbookList").addEventListener("submit", async (event) => {
    if (!event.target.classList.contains("message-delete")) return;
    event.preventDefault();
    const note = document.getElementById("guestbookNote");
    const id = event.target.dataset.id;
    const password = event.target.querySelector("input").value;
    const current = guestbookItems.find((item) => String(item.id) === String(id));
    if (current && current.password && current.password !== password) {
      if (note) note.textContent = "비밀번호가 다릅니다.";
      return;
    }
    guestbookItems = guestbookItems.filter((item) => String(item.id) !== String(id));
    renderGuestbook();
    if (note) note.textContent = "삭제했습니다. 다시 남겨 주세요.";
    const data = await guestbookRequest({ action: "delete", id: id, password: password });
    if (data.ok === false && !data.timeout) {
      if (note) note.textContent = "비밀번호가 다릅니다.";
      loadGuestbook();
    }
  });

  document.getElementById("guestbookPages").addEventListener("click", (event) => {
    if (!event.target.dataset.page) return;
    guestbookPage = Number(event.target.dataset.page);
    renderGuestbook();
  });
  loadGuestbook();
}
