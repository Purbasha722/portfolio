# Miftahul Zannati Purba — Portfolio

A cozy, case-file-themed portfolio site with a light/dark mode toggle, built with plain HTML, CSS, and JavaScript — no build step required.

## Structure

```
├── index.html          Home
├── about.html
├── education.html
├── projects.html
├── skills.html
├── achievements.html
├── contact.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── profile.svg    ← illustrated placeholder avatar
│       └── favicon.svg
└── README.md
```

## About the profile picture

`assets/images/profile.svg` is an illustrated placeholder in the site's own color palette (not a real photo). To use your actual photo:

1. Add your photo to `assets/images/` — e.g. `profile.jpg`.
2. In **every** HTML file, find this line (appears once or twice per page):
   ```html
   <img src="assets/images/profile.svg" alt="Illustrated portrait placeholder of Miftahul Zannati Purba" />
   ```
   and change it to:
   ```html
   <img src="assets/images/profile.jpg" alt="Miftahul Zannati Purba" />
   ```
3. For best results, use a roughly square photo (at least 400×400px) — the circular frame will crop it to fit.

## Publishing to GitHub Pages

1. Create a new GitHub repository (public).
2. Upload every file in this folder to the repository, **keeping the folder structure** (the `assets/` folder must stay intact, with `css`, `js`, and `images` inside it).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

If you name the repository `<your-username>.github.io`, the site will instead publish directly at `https://<your-username>.github.io/`.

## Customizing

- Colors, fonts, and spacing all live in `assets/css/style.css` as CSS custom properties at the top of the file (`:root` for light mode, `html.dark` for dark mode).
- The theme toggle, scroll animations, and contact form behavior live in `assets/js/main.js`.
- The contact form currently only shows a confirmation message — connect it to a form service (like Formspree) or a `mailto:` link to actually receive messages.
