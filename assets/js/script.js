const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const blogCards = [...document.querySelectorAll(".blog-grid .post-card")];
const activeCategoryLabel = document.getElementById("activeCategoryLabel");
const activeCategoryTitle = document.getElementById("activeCategoryTitle");
const activeCategoryDescription = document.getElementById("activeCategoryDescription");
const emptyPosts = document.getElementById("emptyPosts");
const profileImage = document.getElementById("profileImage");
const profileInitials = document.getElementById("profileInitials");
const githubProjects = document.getElementById("githubProjects");
const emailLink = document.getElementById("emailLink");
const githubReposUrl = "https://api.github.com/users/khalidshams-tech/repos";

const categoryCopy = {
  linux: {
    label: "Linux IT138",
    title: "Linux IT138 Weekly Posts",
    description: "Linux IT138 posts will be added here week by week.",
  },
  networking: {
    label: "Networking",
    title: "Networking Weekly Posts",
    description: "Networking class posts will be added here when I share weekly networking content.",
  },
  cloud: {
    label: "Cloud",
    title: "Cloud Weekly Posts",
    description: "Cloud computing class posts will be added here when I share weekly cloud content.",
  },
  cybersecurity: {
    label: "Cybersecurity",
    title: "Cybersecurity Weekly Posts",
    description: "Cybersecurity class posts will be added here when I share weekly security content.",
  },
  troubleshooting: {
    label: "Troubleshooting",
    title: "Troubleshooting Weekly Posts",
    description: "Troubleshooting posts will be added here when I share weekly problem-solving content.",
  },
};

document.getElementById("year").textContent = new Date().getFullYear();

profileImage?.addEventListener("load", () => {
  profileInitials.hidden = true;
});

profileImage?.addEventListener("error", () => {
  profileImage.classList.add("is-hidden");
  profileInitials.hidden = false;
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

if ("IntersectionObserver" in window) {
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
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const setActiveBlogCategory = (filter = "linux") => {
  const copy = categoryCopy[filter] || categoryCopy.linux;
  let visibleCount = 0;

  activeCategoryLabel.textContent = copy.label;
  activeCategoryTitle.textContent = copy.title;
  activeCategoryDescription.textContent = copy.description;

  filterButtons.forEach((item) => item.classList.toggle("active", item.dataset.filter === filter));
  blogCards.forEach((card) => {
    const isVisible = card.dataset.category === filter;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyPosts.hidden = visibleCount > 0;
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveBlogCategory(button.dataset.filter));
});

setActiveBlogCategory();

emailLink?.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.assign(emailLink.href);
});

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const repoScore = (repo) => {
  const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
  const keywords = ["blog", "it", "linux", "aws", "cloud", "network", "security", "cyber", "python"];
  return keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0);
};

const renderRepos = (repos) => {
  if (!githubProjects) return;

  const bestRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => {
      const scoreDifference = repoScore(b) - repoScore(a);
      if (scoreDifference !== 0) return scoreDifference;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6);

  if (!bestRepos.length) {
    githubProjects.innerHTML = '<article class="repo-card error">No public repositories found yet.</article>';
    return;
  }

  githubProjects.innerHTML = bestRepos
    .map(
      (repo) => `
        <article class="repo-card">
          <h3>${repo.name}</h3>
          <p>${repo.description || "Public GitHub project from my learning portfolio."}</p>
          <div class="repo-meta">
            <span>Updated ${formatDate(repo.updated_at)}</span>
            ${repo.language ? `<span>${repo.language}</span>` : ""}
          </div>
          <a href="${repo.html_url}" target="_blank" rel="noreferrer">View repository</a>
        </article>
      `
    )
    .join("");
};

const loadGitHubProjects = async () => {
  if (!githubProjects) return;

  try {
    const response = await fetch(githubReposUrl, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      throw new Error("GitHub API request failed");
    }

    const repos = await response.json();
    renderRepos(repos);
  } catch (error) {
    githubProjects.innerHTML =
      '<article class="repo-card error">GitHub projects could not load right now. Visit my GitHub profile from the contact section.</article>';
  }
};

loadGitHubProjects();
