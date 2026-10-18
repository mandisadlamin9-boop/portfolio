// --- 1. INITIALIZATION & UTILITIES ---

const refreshIcons = () => lucide.createIcons();
refreshIcons();

document.getElementById("year").textContent = new Date().getFullYear();

// --- 2. NAVIGATION ---

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// --- 3. SCROLL ANIMATIONS ---

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("in");
        scrollObserver.unobserve(el);
        // clear the stagger delay afterwards so hover effects stay snappy
        if (el.style.transitionDelay) {
          setTimeout(() => (el.style.transitionDelay = ""), 1800);
        }
      }
    });
  },
  { threshold: 0.12 },
);

// About: text slides in from the left, photo from the right
document
  .querySelectorAll(".about-text .fade-up")
  .forEach((el) => el.classList.add("from-left"));
const aboutPhotoWrap = document.querySelector(".about-photo-wrap");
if (aboutPhotoWrap) {
  aboutPhotoWrap.classList.add("from-right");
  aboutPhotoWrap.style.transitionDelay = "0.2s";
}

// Stagger siblings so they enter one after another
document.querySelectorAll(".about-text, .skills-grid").forEach((group) => {
  [...group.children]
    .filter((el) => el.classList.contains("fade-up"))
    .forEach((el, i) => (el.style.transitionDelay = `${i * 0.14}s`));
});

document
  .querySelectorAll(".fade-up")
  .forEach((el) => scrollObserver.observe(el));

// Counters: count up when they scroll into view
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      countObserver.unobserve(el);
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.6 },
);
if (!prefersReducedMotion) {
  document.querySelectorAll("[data-count]").forEach((el) => {
    el.textContent = "0" + (el.dataset.suffix || "");
    countObserver.observe(el);
  });
}

// About photo parallax
const aboutPhoto = document.querySelector(".about-photo");
if (aboutPhoto && !prefersReducedMotion) {
  let ticking = false;
  const parallax = () => {
    const r = aboutPhoto.parentElement.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom > 0 && r.top < vh) {
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      aboutPhoto.style.transform = `translateY(${progress * -50}px)`;
    }
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(parallax);
        ticking = true;
      }
    },
    { passive: true },
  );
  parallax();
}

// --- 3b. TECH STACK SPOTLIGHT ---
const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";
const stack = [
  {
    name: "C#",
    group: "Language",
    color: "#9B4F96",
    icon: `${DEV}/csharp/csharp-original.svg`,
    desc: "Used in the PetCare Management System",
  },
  {
    name: "JavaScript",
    group: "Language",
    color: "#F7DF1E",
    icon: `${DEV}/javascript/javascript-original.svg`,
    desc: "Used in my Weather App and Recipe Magic",
  },
  {
    name: "Python",
    group: "Language",
    color: "#3776AB",
    icon: `${DEV}/python/python-original.svg`,
    desc: "Python Essentials certificate",
  },
  {
    name: "HTML",
    group: "Web",
    color: "#E34F26",
    icon: `${DEV}/html5/html5-original.svg`,
    desc: "The foundation of every site I build",
  },
  {
    name: "CSS",
    group: "Web",
    color: "#1572B6",
    icon: `${DEV}/css3/css3-original.svg`,
    desc: "Styling for every project",
  },
  {
    name: "React",
    group: "Web",
    color: "#61DAFB",
    icon: `${DEV}/react/react-original.svg`,
    desc: "Used in CartCraft and Shelf Life",
  },
  {
    name: "Node.js",
    group: "Web",
    color: "#5FA04E",
    icon: `${DEV}/nodejs/nodejs-original.svg`,
    desc: "Used in CartCraft and Shelf Life",
  },
  {
    name: "ASP.NET MVC",
    group: "Web",
    color: "#512BD4",
    icon: `${DEV}/dotnetcore/dotnetcore-original.svg`,
    desc: "Used in the PetCare Management System",
  },
  {
    name: "SQL Server",
    group: "Data",
    color: "#CC2927",
    icon: `${DEV}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
    desc: "Database for the PetCare Management System",
  },
  {
    name: "Azure",
    group: "Cloud",
    color: "#0078D4",
    icon: `${DEV}/azure/azure-original.svg`,
    desc: "Azure SQL, and hosting for PetCare",
  },
  {
    name: "Vercel",
    group: "Cloud",
    color: "#ffffff",
    icon: `${SI}/vercel/ffffff`,
    desc: "Hosts CartCraft and Shelf Life",
  },
  {
    name: "Netlify",
    group: "Cloud",
    color: "#00C7B7",
    icon: `${DEV}/netlify/netlify-original.svg`,
    desc: "Hosts the Weather App and Recipe Magic",
  },
  {
    name: "GitHub",
    group: "Tools",
    color: "#e6edf3",
    icon: `${SI}/github/ffffff`,
    desc: "Version control and collaboration",
  },
  {
    name: "Android Studio",
    group: "Tools",
    color: "#3DDC84",
    icon: `${SI}/androidstudio/3DDC84`,
    desc: "Mobile app coursework",
  },
  {
    name: "Cisco Packet Tracer",
    group: "Tools",
    color: "#049FD9",
    icon: `${SI}/cisco/049FD9`,
    desc: "Networking coursework",
  },
];

const spotlightEl = document.getElementById("stackSpotlight");
if (spotlightEl) {
  const spotRail = document.getElementById("spotRail");
  const spotLogo = document.getElementById("spotLogo");
  const spotHalo = document.getElementById("spotHalo");
  const spotName = document.getElementById("spotName");
  const spotDesc = document.getElementById("spotDesc");
  const spotGroup = document.getElementById("spotGroup");
  let spotCurrent = 0;
  let spotTimer = null;

  stack.forEach((item, i) => {
    new Image().src = item.icon; // preload so switching is instant
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "spot-thumb";
    btn.style.setProperty("--c", item.color);
    btn.setAttribute("aria-label", item.name);
    btn.innerHTML = `<img src="${item.icon}" alt="" />`;
    btn.addEventListener("click", () => {
      showSpot(i);
      startSpot();
    });
    spotRail.appendChild(btn);
  });

  function showSpot(i) {
    spotCurrent = i;
    const s = stack[i];
    spotHalo.style.background = `color-mix(in srgb, ${s.color} 14%, transparent)`;
    spotHalo.style.boxShadow = `0 0 40px color-mix(in srgb, ${s.color} 35%, transparent)`;
    spotLogo.classList.remove("swap");
    void spotLogo.offsetWidth;
    spotLogo.src = s.icon;
    spotLogo.alt = s.name;
    spotLogo.classList.add("swap");
    spotName.textContent = s.name;
    spotDesc.textContent = s.desc;
    spotGroup.textContent = s.group;
    spotRail
      .querySelectorAll(".spot-thumb")
      .forEach((b, k) => b.classList.toggle("on", k === i));
  }

  function startSpot() {
    clearInterval(spotTimer);
    if (prefersReducedMotion) return;
    spotTimer = setInterval(
      () => showSpot((spotCurrent + 1) % stack.length),
      3200,
    );
  }

  // only run while it's on screen, and pause while hovering
  new IntersectionObserver(
    (entries) => {
      entries[0].isIntersecting ? startSpot() : clearInterval(spotTimer);
    },
    { threshold: 0.3 },
  ).observe(spotlightEl);
  spotlightEl.addEventListener("mouseenter", () => clearInterval(spotTimer));
  spotlightEl.addEventListener("mouseleave", startSpot);

  showSpot(0);
}

// --- 4. PROJECTS DYNAMIC RENDERING ---

const projects = [
  {
    title: "Shelf Life",
    desc: "A full-stack personal reading tracker built during my one-month internship with ProStackHub — search for books via the Google Books API, track reading progress, and rate and review what you've read.",
    stack: ["React", "Node.js", "Azure SQL"],
    cover: "SHELF",
    image: "projects/shelf-life.webp",
    liveUrl: "https://pro-stack-hub-shelf-life.vercel.app/",
    short: "Reading tracker: search books, track progress, rate and review.",
  },
  {
    title: "Aura",
    desc: "An AI workplace assistant that drafts emails, turns messy meeting notes into clear action items, and answers questions on the spot. Built entirely through AI prompting, no manual code.",
    stack: ["AI Prompting", "Lovable", "No-Code"],
    cover: "AURA",
    image: "projects/aura.webp",
    liveUrl: "https://snap-productivity.lovable.app/",
    short:
      "AI assistant that drafts emails and turns meeting notes into action items.",
  },
  {
    title: "Weather App",
    desc: "Search current and accurate weather for any location, built during SheCodes practical work.",
    stack: ["JavaScript", "Fetch API", "CSS"],
    cover: "WEATHER",
    image: "projects/weather-app.webp",
    liveUrl: "https://lee-forcast-weather-app.netlify.app/",
  },
  {
    title: "Recipe Magic",
    desc: "Generates a recipe from any ingredient, dish, or cuisine you type in, built during SheCodes practical work.",
    stack: ["JavaScript", "AI", "CSS"],
    cover: "RECIPE",
    image: "projects/recipe-magic.webp",
    liveUrl: "https://dancing-longma-7e694a.netlify.app/",
  },
  {
    title: "CartCraft",
    desc: "A full featured e-commerce storefront built for my ProStackHub full stack internship, selling electronics across five categories with JWT authentication, a persisted cart, Stripe powered checkout, and a role based admin panel.",
    stack: ["React", "Node.js", "Express", "Azure SQL", "Stripe"],
    cover: "CART",
    image: "projects/cartcraft.png",
    liveUrl: "https://pro-stack-hub-cart-craft.vercel.app/",
    codeUrl: "https://github.com/mandisadlamin9-boop/ProStackHub_CartCraft",
  },
  {
    title: "PetCare Management System",
    desc: "An integrated group project built during my ICT Application Development studies — a full-stack web app that helps veterinary clinics and pet care centres manage pet registrations, owner details, and appointment scheduling, backed by a SQL Server database.",
    stack: ["C#", "ASP.NET MVC", "SQL Server"],
    cover: "PETCARE",
    image: "projects/petcare.png",
    liveUrl:
      "https://petcare-lee-dbgbfafrhmauaga0.westus3-01.azurewebsites.net",
    short: "Group project for managing pet records, owners and appointments.",
  },
];

const projectsGrid = document.getElementById("projectsGrid");

if (projectsGrid) {
  const byTitle = (t) => projects.find((p) => p.title === t);
  const featured = byTitle("CartCraft");
  const gridItems = ["Shelf Life", "PetCare Management System", "Aura"].map(
    byTitle,
  );

  const tagsHtml = (p) =>
    `<div class="tech-tags">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>`;
  const imgHtml = (p) =>
    p.image
      ? `<img src="${encodeURI(p.image)}" alt="${p.title} preview" loading="lazy" />`
      : `<span class="proj-cover">${p.cover}</span>`;
  const demoBtn = (p) =>
    p.liveUrl
      ? `<a class="btn btn-primary small" href="${p.liveUrl}" target="_blank" rel="noopener">Live demo <i data-lucide="external-link"></i></a>`
      : `<span class="tag">Coming soon</span>`;

  // 1. Featured project
  if (featured) {
    const el = document.createElement("div");
    el.className = "proj-feature fade-up";
    el.innerHTML = `
      <div class="proj-media">${imgHtml(featured)}</div>
      <div class="proj-feature-body">
        <span class="proj-flag">Featured</span>
        <h3>${featured.title}</h3>
        <p>${featured.desc}</p>
        ${tagsHtml(featured)}
        <div class="proj-actions">${demoBtn(featured)}</div>
      </div>`;
    projectsGrid.appendChild(el);
    scrollObserver.observe(el);
  }

  // 2. Three hover cards
  const grid = document.createElement("div");
  grid.className = "proj-grid";
  gridItems.forEach((p, i) => {
    const cell = document.createElement("div");
    cell.className = "proj-cell fade-up";
    cell.style.transitionDelay = `${i * 0.15}s`;
    cell.innerHTML = `
      <article class="proj-card">
        <div class="proj-media">
          ${imgHtml(p)}
          <div class="proj-overlay">
            <p>${p.short || p.desc}</p>
            ${demoBtn(p)}
          </div>
        </div>
        <div class="proj-info">
          <h3>${p.title}</h3>
          ${tagsHtml(p)}
        </div>
      </article>`;
    // phones have no hover: tap a card to reveal its description
    cell.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      grid
        .querySelectorAll(".proj-cell.tap")
        .forEach((c) => c !== cell && c.classList.remove("tap"));
      cell.classList.toggle("tap");
    });
    grid.appendChild(cell);
    scrollObserver.observe(cell);
  });
  projectsGrid.appendChild(grid);
}

refreshIcons();

// --- 5. CERTIFICATES DYNAMIC RENDERING (grouped by issuer) ---
// "group" controls which heading/section it appears under.
// "file" = exact path to the certificate. "type" = "image" or "pdf".
// If "file" is null, the card shows an icon only, not yet clickable.

// --- 5. CERTIFICATES DYNAMIC RENDERING (grouped, collapsed by default) ---

const certificates = [
  // --- Coursera / Google AI ---
  {
    group: "Coursera & Google AI",
    title: "Google AI Essentials",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase- Google AI Essentials.pdf",
    thumb: "certificates/googlecousera/preview-google-ai-essentials.png",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Introduction to AI",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase- Introduction to AI.pdf",
    thumb: "certificates/googlecousera/preview-introduction-to-ai.png",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Discover the Art of Prompting",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Discover the Art of Prompting.pdf",
    thumb: "certificates/googlecousera/preview-art-of-prompting.png",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Maximize Productivity With AI Tools",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Max imize Produ ctivity W ith AI Tools.pdf",
    thumb: "certificates/googlecousera/preview-maximize-productivity.png",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Stay Ahead of the AI Curve",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Stay Ahead of the AI Curve.pdf",
    thumb: "certificates/googlecousera/preview-stay-ahead.png",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Use AI Responsibly",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Use AI Responsibly.pdf",
    thumb: "certificates/googlecousera/preview-use-ai-responsibly.png",
    type: "pdf",
  },

  // --- SheCodes ---
  {
    group: "SheCodes",
    title: "Introduction to Artificial Intelligence",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Introduction to Artificial Intelligence.png",
    type: "image",
  },
  {
    group: "SheCodes",
    title: "Introduction to Coding",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Introduction to Coding.png",
    type: "image",
  },
  {
    group: "SheCodes",
    title: "Introduction to Web Development",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Introduction to Web Development.png",
    type: "image",
  },
  {
    group: "SheCodes",
    title: "Web Development II",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Introduction to Web Development1.png",
    type: "image",
  },
  {
    group: "SheCodes",
    title: "Web Development",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Web Development.png",
    type: "image",
  },
  {
    group: "SheCodes",
    title: "Advanced Web Development",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Advanced web development.png",
    type: "image",
  },
  {
    group: "SheCodes",
    title: "Mobile Literacy",
    issuer: "SheCodes",
    status: "Completed",
    file: "certificates/shecodes/Mobile Literacy.png",
    type: "image",
  },

  // --- Cisco ---
  {
    group: "Cisco",
    title: "Introduction to Packet Tracer",
    issuer: "Cisco",
    status: "Completed",
    file: "certificates/cisco/Intorduction to Packet Tracer.png",
    type: "image",
  },
  {
    group: "Cisco",
    title: "Linux Unhatched",
    issuer: "Cisco",
    status: "Completed",
    file: "certificates/cisco/Linux unhatched.png",
    type: "image",
  },
  {
    group: "Cisco",
    title: "Networking Essentials",
    issuer: "Cisco",
    status: "Completed",
    file: "certificates/cisco/Networking Essentials.png",
    type: "image",
  },

  // --- Currently studying (no certificate file yet) ---
  {
    group: "Currently Studying",
    title: "FNB App Academy",
    issuer: "FNB",
    status: "In Progress",
    file: null,
    type: null,
  },
  {
    group: "Currently Studying",
    title: "AI Acceleration Program",
    issuer: "AI Acceleration",
    status: "In Progress",
    file: null,
    type: null,
  },
  {
    group: "Currently Studying",
    title: "Full Stack Internship",
    issuer: "ProHub STACK",
    status: "In Progress",
    file: null,
    type: null,
  },
];

// Update the "Certifications" badge in About with a live count
const completedCount = certificates.filter(
  (c) => c.status === "Completed",
).length;
const certCountEl = document.getElementById("certCountText");
if (certCountEl) certCountEl.textContent = `${completedCount}+ Certifications`;

const statProjectsEl = document.getElementById("statProjects");
const statCertsEl = document.getElementById("statCerts");
if (statProjectsEl) statProjectsEl.textContent = projects.length;
if (statCertsEl) statCertsEl.textContent = completedCount;

const CERT_LABELS = { "Coursera & Google AI": "Google via Coursera" };
const certViewer = document.getElementById("certViewer");
const certThumbs = document.getElementById("certThumbs");
const certTabs = document.getElementById("certTabs");
const certProgress = document.getElementById("certProgress");

if (certViewer && certThumbs && certTabs) {
  const done = certificates.filter((c) => c.status === "Completed");
  const previewOf = (c) => encodeURI(c.thumb || c.file);
  let list = done;
  let certIdx = 0;
  let certTimer = null;
  let userTookOver = false;

  function openCert(c) {
    if (c.type === "image") openCertLightbox(c.file, c.title);
    else window.open(encodeURI(c.file), "_blank");
  }

  function showCert(i) {
    certIdx = i;
    const c = list[i];
    certViewer.innerHTML = `
      <button class="cert-preview" type="button" aria-label="View ${c.title}">
        <img src="${previewOf(c)}" alt="${c.title} certificate" />
      </button>
      <div class="cert-details">
        <span class="cert-status">${c.status}</span>
        <h3>${c.title}</h3>
        <p class="cert-issuer">${c.issuer}</p>
        <div class="cert-actions">
          <button class="btn btn-primary small" type="button" data-act="view"><i data-lucide="eye"></i> View certificate</button>
          <a class="btn btn-ghost small" href="${encodeURI(c.file)}" download><i data-lucide="download"></i> Download</a>
        </div>
      </div>`;
    certViewer.classList.remove("cert-swap");
    void certViewer.offsetWidth;
    certViewer.classList.add("cert-swap");
    certViewer
      .querySelector('[data-act="view"]')
      .addEventListener("click", () => openCert(c));
    certViewer
      .querySelector(".cert-preview")
      .addEventListener("click", () => openCert(c));
    certThumbs
      .querySelectorAll(".cert-thumb")
      .forEach((b, k) => b.classList.toggle("on", k === i));
    refreshIcons();
  }

  function buildThumbs() {
    certThumbs.innerHTML = "";
    list.forEach((c, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cert-thumb";
      b.title = c.title;
      b.setAttribute("aria-label", c.title);
      b.innerHTML = `<img src="${previewOf(c)}" alt="" loading="lazy" />`;
      b.addEventListener("click", () => {
        userTookOver = true;
        stopCerts();
        showCert(i);
      });
      certThumbs.appendChild(b);
    });
    showCert(0);
  }

  function startCerts() {
    stopCerts();
    if (prefersReducedMotion || userTookOver) return;
    certTimer = setInterval(() => showCert((certIdx + 1) % list.length), 4500);
  }
  function stopCerts() {
    clearInterval(certTimer);
  }

  ["All", ...new Set(done.map((c) => c.group))].forEach((g, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cert-tab" + (i === 0 ? " active" : "");
    btn.textContent = CERT_LABELS[g] || g;
    btn.addEventListener("click", () => {
      certTabs
        .querySelectorAll(".cert-tab")
        .forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      list = g === "All" ? done : done.filter((c) => c.group === g);
      userTookOver = true;
      stopCerts();
      buildThumbs();
    });
    certTabs.appendChild(btn);
  });

  buildThumbs();

  // auto-advance only while on screen, pause on hover, stop once the visitor takes over
  new IntersectionObserver(
    (entries) => (entries[0].isIntersecting ? startCerts() : stopCerts()),
    { threshold: 0.3 },
  ).observe(certViewer);
  certViewer.addEventListener("mouseenter", stopCerts);
  certViewer.addEventListener("mouseleave", startCerts);

  if (certProgress) {
    const inProgress = certificates.filter((c) => c.status !== "Completed");
    if (inProgress.length) {
      certProgress.innerHTML =
        "<span>Currently studying:</span>" +
        inProgress
          .map((c) => `<span class="cert-pill">${c.title}</span>`)
          .join("");
    }
  }
}

// --- 6. CERTIFICATE LIGHTBOX (images only — PDFs open in a new tab instead) ---

const certLightbox = document.getElementById("certLightbox");
const certLightboxImg = document.getElementById("certLightboxImg");
const certLightboxTitle = document.getElementById("certLightboxTitle");
const certLightboxClose = document.getElementById("certLightboxClose");
const certLightboxDownload = document.getElementById("certLightboxDownload");

function openCertLightbox(src, title) {
  if (!certLightbox || !certLightboxImg) return;
  const encodedSrc = encodeURI(src);
  certLightboxImg.src = encodedSrc;
  certLightboxImg.alt = title;
  if (certLightboxTitle) certLightboxTitle.textContent = title;
  if (certLightboxDownload) {
    certLightboxDownload.href = encodedSrc;
    certLightboxDownload.setAttribute(
      "download",
      title.replace(/\s+/g, "-").toLowerCase(),
    );
  }
  certLightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  refreshIcons();
}

function closeCertLightbox() {
  if (!certLightbox) return;
  certLightbox.classList.remove("open");
  document.body.style.overflow = "";
}

if (certLightboxClose) {
  certLightboxClose.addEventListener("click", closeCertLightbox);
}
if (certLightbox) {
  certLightbox.addEventListener("click", (e) => {
    if (e.target === certLightbox) closeCertLightbox();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCertLightbox();
});

// --- 7. LIVE API DEMO (Quotes) ---

const quoteBox = document.getElementById("quoteBox");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const refreshBtn = document.getElementById("refreshQuote");

async function loadQuote() {
  if (!refreshBtn || !quoteBox || !quoteText || !quoteAuthor) return;
  refreshBtn.disabled = true;

  const icon = refreshBtn.querySelector("svg");
  if (icon) icon.classList.add("spin-icon");

  quoteBox.style.opacity = "0.4";
  quoteText.textContent = "Fetching inspiration...";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("Fetch failed");

    const data = await response.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `By ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Could not fetch a quote. Please try again.";
    quoteAuthor.textContent = "";
  } finally {
    quoteBox.style.opacity = "1";
    refreshBtn.disabled = false;
    if (icon) icon.classList.remove("spin-icon");
  }
}

if (refreshBtn) {
  refreshBtn.addEventListener("click", loadQuote);
  loadQuote();
}

// --- 8. CONTACT FORM (EmailJS Integration) ---

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const status = document.getElementById("formStatus");
    const btn = contactForm.querySelector("button");
    const originalContent = btn.innerHTML;

    const serviceID = "service_44gbowp";
    const templateID = "template_grw6f9r";

    btn.disabled = true;
    btn.innerHTML = "Sending...";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.innerHTML = "Success!";
        status.innerHTML = `<div class="ok" style="color: #10b981; margin-top: 1rem;">Message sent successfully. I'll get back to you soon.</div>`;
        contactForm.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalContent;
          refreshIcons();
        }, 3000);
      },
      (err) => {
        btn.disabled = false;
        btn.innerHTML = originalContent;
        status.innerHTML = `<div class="error" style="color: #ef4444; margin-top: 1rem;">Failed to send. Please try again later.</div>`;
        console.error("EmailJS Error:", err);
        refreshIcons();
      },
    );
  });
}
// --- ABOUT CHATBOT ---
(() => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const log = document.getElementById("chatLog");
  const chips = document.getElementById("chatChips");
  if (!form || !input || !log) return;

  const history = []; // kept for step 3 so the AI remembers the conversation
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let busy = false;

  async function getReply() {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    if (res.status === 429) {
      return "I've answered a lot of questions today. Please use the contact form below to reach Lihle directly.";
    }
    if (!res.ok) throw new Error("Chat request failed");
    const data = await res.json();
    return data.reply;
  }

  function addMsg(text, who) {
    const el = document.createElement("div");
    el.className = `chat-msg ${who}`;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  // types the answer out one character at a time
  function typeOut(el, text) {
    return new Promise((resolve) => {
      if (reduceMotion) {
        el.textContent = text;
        return resolve();
      }
      el.textContent = "";
      el.classList.add("writing");
      let i = 0;
      const timer = setInterval(() => {
        i += 1;
        el.textContent = text.slice(0, i);
        log.scrollTop = log.scrollHeight;
        if (i >= text.length) {
          clearInterval(timer);
          el.classList.remove("writing");
          resolve();
        }
      }, 18);
    });
  }

  async function ask(question) {
    const q = question.trim();
    if (!q || busy) return;
    busy = true;
    addMsg(q, "user");
    input.value = "";
    history.push({ role: "user", content: q });

    const reply = addMsg("", "bot");
    reply.classList.add("typing");
    reply.innerHTML = "<span></span><span></span><span></span>";

    let answer;
    try {
      answer = await getReply(q);
    } catch (err) {
      console.error("Chat error:", err);
      answer = "Something went wrong. Please try again in a moment.";
    }
    reply.classList.remove("typing");
    await typeOut(reply, answer);
    history.push({ role: "assistant", content: answer });
    busy = false;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ask(input.value);
  });

  if (chips) {
    chips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chat-chip");
      if (chip) ask(chip.textContent);
    });
  }
})();
