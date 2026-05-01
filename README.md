# Khalid Shams Technical Blog and Portfolio

This is a GitHub Pages-ready personal technical blog and portfolio website for Khalid Shams.

The site is intentionally simple and professional for IT138 and future IT/cybersecurity career use.

## Main Sections

- Home
- Learning Blog
- Job Experience
- Projects & Certifications
- Resume & Contact

## File Structure

```text
blogIT138/
+-- index.html
+-- README.md
+-- resume.html
+-- assets/
    +-- css/
    |   +-- styles.css
    +-- js/
    |   +-- script.js
    +-- images/
    |   +-- profile.jpg
    +-- img/
        +-- design-concept.png
```

## GitHub Pages Deployment

1. Push this folder to your GitHub repository.
2. In the repository, open **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the root folder.
6. Save and wait for GitHub Pages to publish the site.

## Add or Update Your Profile Photo

Save your profile picture here:

```text
blogIT138/assets/images/profile.jpg
```

If `profile.jpg` is missing, the website automatically shows a circle placeholder with `KS`.

PowerShell example:

```powershell
Copy-Item "C:\Users\khliadshams\Pictures\my-photo.jpg" "D:\College\Codex Projects\IT138\blogIT138\assets\images\profile.jpg"
git add assets/images/profile.jpg
git commit -m "Add profile photo"
git push
```

## Add a New Blog Post

Open `index.html` and search for:

```text
Learning Blog
```

Copy one existing `<article class="post-card">` block and update:

- Category: `linux`, `networking`, `cloud`, `cybersecurity`, or `troubleshooting`
- Title
- Objective
- Problem
- What I Tried
- Solution
- What I Learned

Example category attribute:

```html
<article class="post-card reveal" data-category="linux">
```

## Update Problems Solved

Open `index.html` and search for:

```text
Problems Solved
```

Each item should use this format:

- Problem
- Cause
- Fix
- Lesson

## Update Projects

There are two project areas:

1. **Core Projects** in `index.html`
2. **GitHub Projects** loaded automatically from:

```text
https://api.github.com/users/khalidshams-tech/repos
```

To improve the automatic GitHub project cards:

- Add good descriptions to your GitHub repositories.
- Keep project names clear.
- Update repositories regularly.
- Use relevant project names like `linux-labs`, `aws-labs`, `networking-labs`, `python-scripts`, or `cybersecurity-notes`.

## Edit Contact Links

Open `index.html` and search for:

```text
Resume & Contact
```

Current contact links:

- GitHub: `https://github.com/khalidshams-tech`
- LinkedIn: `https://www.linkedin.com/in/khalid-shams-868aaa1a6`
- Email: `Khalidshams108@gmail.com`

## Changed Files

- `index.html` - simplified structure and content organization
- `assets/css/styles.css` - cleaner professional dark design
- `assets/js/script.js` - navigation, filters, profile fallback, and GitHub API project loading
- `README.md` - updated instructions for blog posts, projects, and profile photo
