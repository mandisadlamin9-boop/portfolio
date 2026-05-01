// --- 1. INITIALIZATION & UTILITIES ---

// Function to refresh icons globally (Lucide)
const refreshIcons = () => lucide.createIcons();

// Init icons on load
refreshIcons();

// Update Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// --- 2. NAVIGATION ---

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close menu when a link is clicked
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

// Observe all elements with .fade-up
document
  .querySelectorAll(".fade-up")
  .forEach((el) => scrollObserver.observe(el));

// --- 4. PROJECTS DYNAMIC RENDERING ---

const projects = [
  {
    title: "E-Commerce Dashboard UI",
    desc: "An analytics dashboard for managing products, orders, and revenue with charts and filters.",
    stack: ["ASP.NET MVC", "C#", "SQL Server", "Chart.js"],
    cover: "E-COM",
  },
  {
    title: "Task Management Web App",
    desc: "Kanban-style task tracker with drag-and-drop, deadlines, and team collaboration.",
    stack: ["JavaScript", "REST API", "HTML/CSS"],
    cover: "TASKS",
  },
  {
    title: "Weather App (API-based)",
    desc: "Real-time weather forecasts powered by a public API with location search and 7-day view.",
    stack: ["JavaScript", "Fetch API", "CSS"],
    cover: "WEATHER",
  },
  {
    title: "Portfolio Template Design",
    desc: "Reusable, responsive portfolio template with smooth scroll and accessible markup.",
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "FOLIO",
  },
];

const grid = document.getElementById("projectsGrid");

projects.forEach((p, i) => {
  const el = document.createElement("article");
  el.className = "project-card card-glow fade-up";
  el.innerHTML = `
    <div class="project-img">
      ${p.cover}
      <span class="project-num">0${i + 1}</span>
      <div class="project-arrow"><i data-lucide="arrow-up-right"></i></div>
    </div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tech-tags">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
      <div class="project-links">
        <a href="#" target="_blank" class="primary">Live Demo <i data-lucide="external-link"></i></a>
        <a href="#" target="_blank">GitHub <i data-lucide="github"></i></a>
      </div>
    </div>`;
  grid.appendChild(el);
  scrollObserver.observe(el);
});

// Refresh icons once after all projects are added
refreshIcons();

// --- 5. LIVE API DEMO (Quotes) ---

const quoteBox = document.getElementById("quoteBox");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const refreshBtn = document.getElementById("refreshQuote");

async function loadQuote() {
  refreshBtn.disabled = true;

  // Visual feedback: fade out
  quoteBox.style.opacity = "0.4";
  quoteText.textContent = "Fetching inspiration...";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("Fetch failed");

    const data = await response.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Could not fetch a quote. Please try again.";
    quoteAuthor.textContent = "";
  } finally {
    // Visual feedback: fade in
    quoteBox.style.opacity = "1";
    refreshBtn.disabled = false;
    refreshIcons();
  }
}

refreshBtn.addEventListener("click", loadQuote);
loadQuote(); // Initial load

// --- 6. CONTACT FORM (EmailJS Integration) ---

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const status = document.getElementById("formStatus");
  const btn = contactForm.querySelector("button");
  const originalContent = btn.innerHTML;

  // IDs from your EmailJS Dashboard
  const serviceID = "service_44gbowp";
  const templateID = "template_grw6f9r";

  btn.disabled = true;
  btn.innerHTML = "Sending...";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.innerHTML = "Success!";
      status.innerHTML = `<div class="ok" style="color: #10b981; margin-top: 1rem;">✓ Message sent successfully. I'll get back to you soon.</div>`;
      contactForm.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalContent;
        refreshIcons();
      }, 3000);
    },
    (err) => {
      btn.disabled = false;
      btn.innerHTML = originalContent;
      status.innerHTML = `<div class="error" style="color: #ef4444; margin-top: 1rem;">✕ Failed to send. Please try again later.</div>`;
      console.error("EmailJS Error:", err);
      refreshIcons();
    },
  );
});
