/* =========================================================
   SCOTTYOLORIN — Site JavaScript
   Sections:
   1. Music data
   2. Music rendering + filtering + search
   3. Video data + rendering + modal
   4. Shows data + rendering
   5. Gallery data + rendering + filtering
   6. Booking form validation
   7. Navbar scroll state
   ========================================================= */

/* ---------------------------------------------------------
   1. MUSIC DATA
   Each song is an object. The array holds all of them.
   --------------------------------------------------------- */
const songs = [
  {
    title: "GLACIER GIRL",
    artist: "SCOTTYOLORIN",
    featuring: "DaveTheOracle, Kobilou",
    year: 2026,
    type: "single",
    cover: "Glacier Girl.jpg",
    appleMusic: "https://music.apple.com/ng/song/glacier-girl/6783194458",
    spotify: "https://open.spotify.com/track/7DjCte93Dk2YIVMixhUqHO?si=de361eccaf2944b4",
    youtube: "https://youtu.be/CVGLXyGGMGE?si=Y_BfcoZ8WNe-H-0N"
  },
  {
    title: "FAAJI",
    artist: "SCOTTYOLORIN",
    featuring: "DaveTheOracle",
    year: 2026,
    type: "single",
    cover: "Faaji.jpg",
    spotify: "https://open.spotify.com/track/1NR117de3hv4urdtYxnBTS?si=4d3582706e614f84",
    appleMusic: "https://music.apple.com/ng/song/faaji/6773782654",
    youtube: "https://youtu.be/F4sqt1dQtS8?si=9nsdxeLisXVyQXft"
  },
  {
    title: "BALLER",
    artist: "SCOTTYOLORIN",
    featuring: "",
    year: 2026,
    type: "single",
    cover: "Baller.jpg",
    spotify: "https://open.spotify.com/track/5UpTDiAmanLIQEWXxw1lnB?si=dbc4be9589d94de5",
    appleMusic: "https://music.apple.com/ng/song/baller/6797529431",
    youtube: "https://youtu.be/NZpXIB05Crs?si=v16kPB_VHADZsJzS"
  },
  {
    title: "DEELA",
    artist: "SCOTTYOLORIN",
    featuring: "",
    year: 2026,
    type: "single",
    cover: "Deela.png",
    spotify: "https://open.spotify.com/track/6SASBUTEJIQYVV9VyN1LT1?si=17976273e9864cc3",
    appleMusic: "https://music.apple.com/ng/song/deela/1873201376",
    youtube: "https://youtu.be/zS_OZjuECE8?si=bUCLVUebAEqGSFtN"
  },
  {
    title: "FL STUDIO",
    artist: "SCOTTYOLORIN",
    featuring: "R33NZO",
    year: 2026,
    type: "feature",
    cover: "FL Studio.jpg",
    spotify: "https://open.spotify.com/track/5YFEtW0HCy9HZZCAPbo1qr?si=35b14637873249b2",
    appleMusic: "https://music.apple.com/ng/song/fl-studio/1882490923",
    youtube: "https://youtu.be/kZ9QKJj5Sjw?si=vKVGAcXNCJuUuBg1"
  },
  {
    title: "OLORIN PACK",
    artist: "SCOTTYOLORIN",
    featuring: "",
    year: 2026,
    type: "project",
    cover: "Olorin Pack.jpg",
    spotify: "https://open.spotify.com/album/4sWFA2NbXUPfbvuK3rjtiQ?si=DlWJboZgSTC6ZyW14YGUew",
    appleMusic: "https://music.apple.com/ng/album/olorin-pack/1889230792",
    youtube: "https://www.youtube.com/watch?v=36zSDCEgxkk&list=OLAK5uy_nXwY2Ppc_reEMXjRkJOZGciAEZ6WG_rV8&pp=0gcJCf8COCosWNin"
  }
];

/* ---------------------------------------------------------
   2. MUSIC — state, rendering, filtering, search
   --------------------------------------------------------- */

// Grab the elements once, reuse everywhere.
const musicGrid    = document.getElementById("musicGrid");
const musicEmpty   = document.getElementById("musicEmpty");
const musicFilters = document.getElementById("musicFilters");
const searchInput  = document.getElementById("searchInput");

// Current state of the music section
let currentFilter = "all";
let currentSearch = "";

// Build the HTML for one music card
function createMusicCard(song) {
  const featuring = song.featuring ? `feat. ${song.featuring}` : "Solo";
  const typeLabel = song.type.charAt(0).toUpperCase() + song.type.slice(1);

  return `
    <div class="col-6 col-md-4 col-lg-3">
      <article class="music-card">
        <div class="music-card__cover">
          <img src="${song.cover}" alt="${song.title} cover art" loading="lazy">
          <span class="music-card__type">${typeLabel}</span>
        </div>
        <div class="music-card__body">
          <h3 class="music-card__title">${song.title}</h3>
          <p class="music-card__meta">${song.artist} &middot; ${featuring} &middot; ${song.year}</p>
          <div class="music-card__links">
            <a href="${song.spotify}" target="_blank" rel="noopener" aria-label="Spotify"><i class="bi bi-spotify"></i></a>
            <a href="${song.appleMusic}" target="_blank" rel="noopener" aria-label="Apple Music"><i class="bi bi-apple"></i></a>
            <a href="${song.youtube}" target="_blank" rel="noopener" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
      </article>
    </div>
  `;
}

// Decide which songs should be visible based on filter + search
function getVisibleSongs() {
  return songs.filter(song => {
    const matchesFilter = currentFilter === "all" || song.type === currentFilter;
    const matchesSearch = song.title.toLowerCase().includes(currentSearch)
                       || song.featuring.toLowerCase().includes(currentSearch)
                       || song.artist.toLowerCase().includes(currentSearch);
    return matchesFilter && matchesSearch;
  });
}

// Render the grid
function renderMusic() {
  const visible = getVisibleSongs();

  if (visible.length === 0) {
    musicGrid.innerHTML = "";
    musicEmpty.classList.remove("d-none");
    return;
  }

  musicEmpty.classList.add("d-none");
  musicGrid.innerHTML = visible.map(createMusicCard).join("");
}

// Filter buttons
musicFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  // Update active state
  musicFilters.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");

  // Update state and re-render
  currentFilter = btn.dataset.filter;
  renderMusic();
});

// Search input
searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value.trim().toLowerCase();
  renderMusic();
});

// Initial render
renderMusic();


/* ---------------------------------------------------------
   3. VIDEO DATA + RENDERING
   --------------------------------------------------------- */
const videos = [
  {
    title: "GLACIER GIRL GLITCH AFRICA",
    type: "Official Video",
    thumb: "Screenshot 2026-10-03 161214.png",
    youtube: "https://youtu.be/SvnAbk3he8w?si=LjiQD-VEbeVotPUo",
    featured: true
  },
  {
    title: "BALLER",
    type: "Official Visualizer",
    thumb: "Screenshot 2026-10-03 160801.png",
    youtube: "https://youtu.be/MqpJTX4K_CM?si=qIPNTbsgKaIJ3fVu",
    featured: false
  },
  {
    title: "FAAJI",
    type: "Official Visualizer",
    thumb: "Screenshot 2026-10-03 161759.png",
    youtube: "https://youtu.be/Ci6aeDiIK6Q?si=qMvT0Qn8fkntbQas",
    featured: false
  }
];

const videoGrid = document.getElementById("videoGrid");

function createVideoCard(video) {
  const featuredClass = video.featured ? " video-card--featured" : "";
  return `
    <article class="video-card${featuredClass}" data-video-url="${video.youtube}">
      <img class="video-card__thumb" src="${video.thumb}" alt="${video.title} thumbnail" loading="lazy">
      <div class="video-card__overlay">
        <div class="video-card__play"><i class="bi bi-play-fill"></i></div>
        <div class="video-card__info">
          <span class="video-card__type">${video.type}</span>
          <h3 class="video-card__title">${video.title}</h3>
        </div>
      </div>
    </article>
  `;
}

function renderVideos() {
  videoGrid.innerHTML = videos.map(createVideoCard).join("");
}

// Click a video card -> open its YouTube link in a new tab
// (Simple version — no modal needed. If the URL is "#", do nothing.)
videoGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".video-card");
  if (!card) return;
  const url = card.dataset.videoUrl;
  if (url && url !== "#") {
    window.open(url, "_blank", "noopener");
  }
});

renderVideos();


/* ---------------------------------------------------------
   4. SHOWS DATA + RENDERING
   --------------------------------------------------------- */
const upcomingShows = [
  {
    date: "Sun, 27 Dec 2026",
    name: "Eko Experience",
    location: "IKEJA LAGOS, NIGERIA",
    venue: "EridanSpace",
    tickets: "https://www.jetronticket.com/eko-experience-with-dj-muller"
  }
];

const pastShows = [
  {
    date: "SAT, 15 AUG 2026",
    name: "UNRLSD",
    location: "ABUJA, NIGERIA",
    venue: "CITY PARK WUSE 2, ABUJA MUNICIPAL AREA COUNCIL, FEDERAL CAPITAL TERRITORY",
    tickets: "#"
  },
  {
    date: "SAT, 4 APR 2026",
    name: "SCOTTYOLORIN & fRIENDS LIVE IN LAGOS",
    location: "ETI-OSA, NIGERIA",
    venue: "THE KAIROS HUB",
    tickets: "#"
  }
];

const upcomingList = document.getElementById("upcomingShows");
const pastList     = document.getElementById("pastShows");

function createShowItem(show) {
  return `
    <li class="show-item">
      <span class="show-item__date">${show.date}</span>
      <h4 class="show-item__name">${show.name}</h4>
      <div>
        <div class="show-item__loc">${show.location}</div>
        <div class="show-item__venue">${show.venue}</div>
      </div>
      <a href="${show.tickets}" class="show-item__btn">GET TICKETS</a>
    </li>
  `;
}

function renderShows() {
  upcomingList.innerHTML = upcomingShows.map(createShowItem).join("");
  pastList.innerHTML     = pastShows.map(createShowItem).join("");
}

renderShows();


/* ---------------------------------------------------------
   5. GALLERY DATA + RENDERING + FILTERING
   --------------------------------------------------------- */
const galleryImages = [
  { src: "Scottylive2.jpg",      category: "live",      size: "tall" },
  { src: "Scottystudio1.jpeg",    category: "studio",    size: "" },
  { src: "Scottyfashion.jpg",   category: "fashion",   size: "tall" },
  { src: "Scottybackstage.jpg", category: "backstage", size: "tall" },
  { src: "Scottylive3.jpg",      category: "live",      size: "" },
];

const galleryGrid    = document.getElementById("galleryGrid");
const galleryFilters = document.getElementById("galleryFilters");

let currentGalleryFilter = "all";

function createGalleryItem(image, index) {
  const sizeClass = image.size ? ` ${image.size}` : "";
  return `
    <figure class="gallery-item${sizeClass}" data-category="${image.category}" data-index="${index}">
      <img src="${image.src}" alt="${image.category} photo" loading="lazy">
    </figure>
  `;
}

function renderGallery() {
  const visible = galleryImages.filter(img =>
    currentGalleryFilter === "all" || img.category === currentGalleryFilter
  );

  galleryGrid.innerHTML = visible.map((img, i) =>
    createGalleryItem(img, galleryImages.indexOf(img))
  ).join("");
}

galleryFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  galleryFilters.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
  btn.classList.add("is-active");

  currentGalleryFilter = btn.dataset.filter;
  renderGallery();
});

renderGallery();


/* ---------------------------------------------------------
   6. BOOKING FORM VALIDATION
   --------------------------------------------------------- */
const bookingForm  = document.getElementById("bookingForm");
const formFeedback = document.getElementById("formFeedback");

// Simple email check — not perfect, but good enough
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Mark a field as invalid and return false
function fail(field, message) {
  field.classList.add("is-invalid");
  formFeedback.textContent = message;
  formFeedback.classList.remove("d-none");
  formFeedback.classList.add("is-error");
  field.focus();
  return false;
}

// Clear all invalid states
function clearErrors() {
  bookingForm.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  formFeedback.classList.add("d-none");
  formFeedback.classList.remove("is-error");
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const fullName      = document.getElementById("fullName");
  const email         = document.getElementById("email");
  const eventType     = document.getElementById("eventType");
  const eventDate     = document.getElementById("eventDate");
  const eventLocation = document.getElementById("eventLocation");
  const message       = document.getElementById("message");

  if (!fullName.value.trim())            return fail(fullName, "Please enter your full name.");
  if (!isValidEmail(email.value.trim())) return fail(email, "Please enter a valid email address.");
  if (!eventType.value)                  return fail(eventType, "Please select an event type.");
  if (!eventDate.value)                  return fail(eventDate, "Please choose an event date.");
  if (!eventLocation.value.trim())       return fail(eventLocation, "Please enter the event location.");
  if (message.value.trim().length < 10)  return fail(message, "Please write a short message (10+ characters).");

  // All good
  formFeedback.textContent = "Your booking request has been received.";
  formFeedback.classList.remove("d-none", "is-error");
  bookingForm.reset();
});

// Remove the red border as soon as the user starts fixing the field
bookingForm.querySelectorAll("input, select, textarea").forEach(field => {
  field.addEventListener("input", () => {
    field.classList.remove("is-invalid");
  });
});


/* ---------------------------------------------------------
   7. NAVBAR SCROLL STATE
   Adds a class once the user has scrolled past the hero top.
   --------------------------------------------------------- */
const siteNav = document.getElementById("siteNav");

function updateNav() {
  if (window.scrollY > 40) {
    siteNav.classList.add("scrolled");
  } else {
    siteNav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// Close mobile menu after tapping a link
document.querySelectorAll("#mainNav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const collapse = document.getElementById("mainNav");
    if (collapse.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});
/* ---------------------------------------------------------
   8. HERO IMAGE ROTATION
   Cycles through the hero background images every 5 seconds.
   --------------------------------------------------------- */
const heroImages = document.querySelectorAll(".hero-bg");
let currentHeroIndex = 0;

if (heroImages.length > 1) {
  setInterval(() => {
    // Hide current image
    heroImages[currentHeroIndex].classList.remove("is-active");

    // Move to next image (wraps to 0 at the end)
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;

    // Show new image
    heroImages[currentHeroIndex].classList.add("is-active");
  }, 5000);
}