const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const blogCards = [...document.querySelectorAll(".blog-grid .content-card")];
const contactForm = document.querySelector(".contact-form");
const profilePhoto = document.querySelector(".profile-photo");
const profileUpload = document.getElementById("profileUpload");
const profileImage = document.getElementById("profileImage");
const profileInitials = document.getElementById("profileInitials");
const savedProfilePhoto = localStorage.getItem("khalid-profile-photo");

document.getElementById("year").textContent = new Date().getFullYear();

if (savedProfilePhoto && profileImage) {
  profileImage.src = savedProfilePhoto;
  profileImage.hidden = false;
  profileInitials.hidden = true;
}

profileImage?.addEventListener("load", () => {
  if (!profileImage.hidden) {
    profileInitials.hidden = true;
  }
});

profilePhoto?.addEventListener("click", () => {
  profileUpload?.click();
});

profileUpload?.addEventListener("change", () => {
  const [file] = profileUpload.files;

  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    profileImage.src = reader.result;
    profileImage.hidden = false;
    profileInitials.hidden = true;
    localStorage.setItem("khalid-profile-photo", reader.result);
  });
  reader.readAsDataURL(file);
});

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -50% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    blogCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.hidden = !shouldShow;
    });
  });
});

contactForm?.addEventListener("submit", (event) => {
  if (contactForm.action.includes("your-form-id")) {
    event.preventDefault();
    const note = contactForm.querySelector(".form-note");
    note.textContent = "Form preview: add your real form endpoint to receive messages after deployment.";
  }
});
