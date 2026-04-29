# Khalid Shams Technical Blog and Portfolio

This is a GitHub Pages-ready personal technical blog and portfolio website for Khalid Shams.

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
    +-- img/
        +-- design-concept.png
```

## GitHub Pages Deployment

1. Push this folder to your GitHub repository.
2. In the repository, open **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your branch, usually `main`, and the folder containing `index.html`.
6. Save and wait for GitHub Pages to publish the site.

## Personalize Before Publishing

- Confirm the email, LinkedIn, GitHub, and optional Facebook links are exactly how you want them displayed.
- Replace `resume.html` with your full resume or export it to PDF later.
- Replace the profile placeholder with a real photo if desired.
- Update blog post links as you create weekly entries.

## Add or Change Your Profile Photo

Save your profile picture in this folder:

```text
blogIT138/assets/img/
```

Name the picture exactly:

```text
profile.jpg
```

PowerShell example:

```powershell
Copy-Item "C:\Users\khliadshams\Pictures\my-photo.jpg" "D:\College\Codex Projects\IT138\blogIT138\assets\img\profile.jpg"
git add assets/img/profile.jpg index.html assets/css/styles.css
git commit -m "Add profile photo"
git push
```

If your image is PNG, either rename/export it as `profile.jpg`, or change this line in `index.html`:

```html
<img src="assets/img/profile.jpg" alt="Khalid Shams profile photo" onerror="this.hidden=true">
```

## Edit LinkedIn, Certifications, or Profile Text

Open `index.html` and search for these section names:

```text
About Me
Certifications
Contact
```

After editing:

```powershell
git add index.html resume.html README.md
git commit -m "Update portfolio information"
git push
```

## Design Notes

The included `assets/img/design-concept.png` is the visual concept reference used for the site direction.
