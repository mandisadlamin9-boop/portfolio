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

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".fade-up")
  .forEach((el) => scrollObserver.observe(el));

// --- 4. PROJECTS DYNAMIC RENDERING ---

const projects = [
  {
    title: "Shelf Life",
    desc: "A full-stack personal reading tracker built during my one-month internship with ProStackHub — search for books via the Google Books API, track reading progress, and rate and review what you've read.",
    stack: ["React", "Node.js", "Azure SQL"],
    cover: "SHELF",
    image: "projects/shelf-life.webp",
    liveUrl: "https://pro-stack-hub-shelf-life.vercel.app/",
  },
  {
    title: "Aura",
    desc: "An AI workplace assistant that drafts emails, turns messy meeting notes into clear action items, and answers questions on the spot. Built entirely through AI prompting, no manual code.",
    stack: ["AI Prompting", "Lovable", "No-Code"],
    cover: "AURA",
    image: "projects/aura.webp",
    liveUrl: "https://snap-productivity.lovable.app/",
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
  },
];

const projectsGrid = document.getElementById("projectsGrid");

if (projectsGrid) {
  projects.forEach((p, i) => {
    const el = document.createElement("article");
    el.className = "project-card card-glow fade-up";

    const linkHtml = p.liveUrl
      ? `<a href="${p.liveUrl}" target="_blank" class="primary">Live Demo <i data-lucide="external-link"></i></a>${
          p.codeUrl
            ? `<a href="${p.codeUrl}" target="_blank" class="secondary">Code <i data-lucide="github"></i></a>`
            : ""
        }`
      : `<span class="tag">Coming soon</span>`;

    const imgHtml = p.image
      ? `<img src="${encodeURI(p.image)}" alt="${p.title} preview" class="project-thumb" />`
      : p.cover;

    el.innerHTML = `
      <div class="project-img">
        ${imgHtml}
        <span class="project-num">0${i + 1}</span>
        <div class="project-arrow"><i data-lucide="arrow-up-right"></i></div>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tech-tags">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
        <div class="project-links">
          ${linkHtml}
        </div>
      </div>`;
    projectsGrid.appendChild(el);
    scrollObserver.observe(el);
  });
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
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Introduction to AI",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase- Introduction to AI.pdf",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Discover the Art of Prompting",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Discover the Art of Prompting.pdf",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Maximize Productivity With AI Tools",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Max imize Produ ctivity W ith AI Tools.pdf",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Stay Ahead of the AI Curve",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Stay Ahead of the AI Curve.pdf",
    type: "pdf",
  },
  {
    group: "Coursera & Google AI",
    title: "Use AI Responsibly",
    issuer: "Google via Coursera",
    status: "Completed",
    file: "certificates/googlecousera/Lihle Lungwase-Use AI Responsibly.pdf",
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

const certGroupsContainer = document.getElementById("certGallery");
function buildCertCard(c) {
  const el = document.createElement("article");
  el.className = "cert-card";

  const actionsHtml = c.file
    ? `<div class="cert-actions">
         <button class="cert-view-btn" type="button"><i data-lucide="eye"></i> View</button>
         <a class="cert-download-btn" href="${encodeURI(c.file)}" download><i data-lucide="download"></i> Download</a>
       </div>`
    : "";

  el.innerHTML = `
    <div class="cert-badge"><i data-lucide="award"></i></div>
    <p class="cert-title">${c.title}</p>
    <p class="cert-meta">${c.issuer} · ${c.status}</p>
    ${actionsHtml}`;

  if (c.file) {
    const viewBtn = el.querySelector(".cert-view-btn");
    const downloadBtn = el.querySelector(".cert-download-btn");
    viewBtn.addEventListener("click", () => {
      if (c.type === "image") {
        openCertLightbox(c.file, c.title);
      } else {
        window.open(encodeURI(c.file), "_blank");
      }
    });
    downloadBtn.addEventListener("click", (e) => e.stopPropagation());
  }

  return el;
}

function renderCerts(filterGroup) {
  certGroupsContainer.innerHTML = "";
  const list =
    filterGroup === "All"
      ? certificates
      : certificates.filter((c) => c.group === filterGroup);
  list.forEach((c) => certGroupsContainer.appendChild(buildCertCard(c)));
  refreshIcons();
}

if (certGroupsContainer) {
  const groups = ["All", ...new Set(certificates.map((c) => c.group))];
  const tabsContainer = document.getElementById("certTabs");

  groups.forEach((g, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cert-tab" + (i === 0 ? " active" : "");
    btn.textContent = g;
    btn.addEventListener("click", () => {
      tabsContainer
        .querySelectorAll(".cert-tab")
        .forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      renderCerts(g);
    });
    tabsContainer.appendChild(btn);
  });

  renderCerts("All");
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
