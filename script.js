/* ============ NAV TOGGLE ============ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));

navLinks
  ?.querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open")),
  );

/* ============ FADE-UP ON SCROLL ============ */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));

/* ============ LIVE QUOTE API ============ */
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");

async function loadQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "—";

  try {
    const r = await fetch(
      "https://api.quotable.io/random?tags=technology|wisdom|inspirational",
    );
    if (!r.ok) throw new Error("quotable failed");

    const d = await r.json();
    quoteText.textContent = '"' + d.content + '"';
    quoteAuthor.textContent = "— " + d.author;
  } catch {
    try {
      const r2 = await fetch("https://dummyjson.com/quotes/random");
      const d2 = await r2.json();

      quoteText.textContent = '"' + d2.quote + '"';
      quoteAuthor.textContent = "— " + d2.author;
    } catch {
      quoteText.textContent =
        '"The best way to predict the future is to invent it."';
      quoteAuthor.textContent = "— Alan Kay";
    }
  }
}

newQuoteBtn?.addEventListener("click", loadQuote);
loadQuote();

/* ============ CONTACT FORM (EmailJS) ============ */
// To enable real email sending:
// 1. Sign up at https://www.emailjs.com
// 2. Add this script to index.html <head>:
//    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
// 3. Replace the placeholders below with your IDs.

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const RECEIVER_EMAIL = "lungwaselihle@gmail.com";

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  formStatus.className = "";
  formStatus.textContent = "Sending...";

  const usingDemo =
    EMAILJS_SERVICE_ID.startsWith("YOUR_") || typeof emailjs === "undefined";

  try {
    if (usingDemo) {
      await new Promise((r) => setTimeout(r, 700));
    } else {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: RECEIVER_EMAIL,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
    }

    formStatus.className = "ok";
    formStatus.textContent =
      "✓ Message sent successfully. I'll get back to you soon.";
    form.reset();
  } catch {
    formStatus.className = "err";
    formStatus.textContent =
      "⚠ Something went wrong. Please email me directly.";
  }
});

/* ============ FOOTER YEAR ============ */
document.getElementById("year").textContent = new Date().getFullYear();
