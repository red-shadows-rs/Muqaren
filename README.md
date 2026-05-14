<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/public/favicon.svg">
    <img alt="Muqaren" src="src/public/favicon.svg" width="96" height="96">
  </picture>
</p>

<h1 align="center">Muqaren | مقارن</h1>

<p align="center">
  <strong>Hotel Price Comparison Platform — Compare Agoda &amp; Booking.com Instantly</strong>
</p>

<p align="center">
  <a href="https://github.com/red-shadows-rs/Muqaren/blob/main/README.ar.md">العربية</a>
  &nbsp;&bull;&nbsp;
  <a href="#-features">Features</a>
  &nbsp;&bull;&nbsp;
  <a href="#-tech-stack">Tech Stack</a>
  &nbsp;&bull;&nbsp;
  <a href="#-getting-started">Getting Started</a>
  &nbsp;&bull;&nbsp;
  <a href="#-project-structure">Structure</a>
  &nbsp;&bull;&nbsp;
  <a href="#-contributing">Contributing</a>
  &nbsp;&bull;&nbsp;
  <a href="#-license">License</a>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-2563eb?style=for-the-badge" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/license-MIT-10b981?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js 5">
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 20">
  <img src="https://img.shields.io/badge/Playwright-1-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/EJS-Templating-b4ca65?style=for-the-badge&logo=ejs&logoColor=white" alt="EJS">
</p>

<br/>

---

## Why Muqaren?

Finding the best hotel price across multiple booking platforms is time-consuming. Muqaren (مقارن — Arabic for "Comparator") solves this by searching Agoda and Booking.com simultaneously, presenting results in a clean Arabic-first interface. No more switching tabs — compare prices side by side in seconds.

- **Arabic-First Design** — Full RTL layout, Cairo font, Arabic labels, and Hijri-compatible calendar
- **Dual Provider Search** — Agoda (Playwright) + Booking.com (Axios/Cheerio) in one request
- **Real-Time Scraping** — Live price data, not cached or outdated
- **Lightweight** — Express.js 5 with EJS templating, minimal dependencies

---

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🔍 Search</h3>
      <ul>
        <li><strong>Multi-Provider</strong> — Search Agoda and Booking.com simultaneously</li>
        <li><strong>Smart Destination Input</strong> — Autocomplete-ready destination field</li>
        <li><strong>Custom Calendar</strong> — Arabic month names, Hijri weekday abbreviations</li>
        <li><strong>Room & Guest Controls</strong> — Dynamic room, adult, and children selectors</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📊 Results</h3>
      <ul>
        <li><strong>Side-by-Side Comparison</strong> — View Agoda and Booking.com results together</li>
        <li><strong>Price Display</strong> — AED currency with taxes and fees breakdown</li>
        <li><strong>Hotel Details</strong> — Images, descriptions, locations, and distances</li>
        <li><strong>Direct Links</strong> — One-click access to booking pages</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎨 User Experience</h3>
      <ul>
        <li><strong>Arabic-First</strong> — Full RTL layout with Cairo font</li>
        <li><strong>Responsive Design</strong> — Mobile, tablet, and desktop optimized</li>
        <li><strong>Font Awesome Icons</strong> — Clean iconography throughout</li>
        <li><strong>Error Pages</strong> — Custom 404 and 500 pages in Arabic</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🛠️ Architecture</h3>
      <ul>
        <li><strong>MVC Pattern</strong> — Controllers, routes, services, and views</li>
        <li><strong>Modular Services</strong> — Independent scrapers per provider</li>
        <li><strong>EJS Templating</strong> — Server-side rendering with dynamic data</li>
        <li><strong>Environment Config</strong> — dotenv for port and settings</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Tech Stack

| Category       | Technology                                                                          | Purpose              |
| -------------- | ----------------------------------------------------------------------------------- | -------------------- |
| **Framework**  | [Express.js 5](https://expressjs.com/)                                              | Web server           |
| **Runtime**    | [Node.js 20](https://nodejs.org/)                                                   | JavaScript runtime   |
| **Templating** | [EJS](https://ejs.co/)                                                              | Server-side views    |
| **Scraping**   | [Playwright](https://playwright.dev/) + [Cheerio](https://cheerio.js.org/)          | Agoda & Booking.com  |
| **HTTP**       | [Axios](https://axios-http.com/)                                                    | Booking.com requests |
| **Parsing**    | [body-parser](https://github.com/expressjs/body-parser)                             | Form data            |
| **Config**     | [dotenv](https://github.com/motdotla/dotenv)                                        | Environment vars     |
| **Icons**      | [Font Awesome 6](https://fontawesome.com/)                                          | UI iconography       |
| **Fonts**      | [Cairo](https://fonts.google.com/specimen/Cairo)                                    | Arabic typography    |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** >= 10

### Quick Start

```bash
git clone https://github.com/red-shadows-rs/Muqaren.git
cd muqaren
npm install
cp .env.example .env
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Required | Default | Description      |
| -------- | -------- | ------- | ---------------- |
| `PORT`   | No       | `3000`  | Server port      |

---

## 📁 Project Structure

```
Muqaren/
├── src/
│   ├── controllers/            # Route handlers
│   │   ├── mainController.js   # Home page controller
│   │   └── searchController.js # Search logic controller
│   ├── middlewares/            # Express middlewares
│   ├── public/                 # Static assets
│   │   ├── assets/             # Images and icons
│   │   ├── javascripts/        # Client-side JS
│   │   └── stylesheets/        # CSS stylesheets
│   ├── routes/                 # Express routes
│   │   ├── mainRouter.js       # Home page routes
│   │   └── searchRouter.js     # Search API routes
│   ├── services/               # Provider scrapers
│   │   ├── agodaService.js     # Agoda (Playwright)
│   │   └── bookingService.js   # Booking.com (Axios + Cheerio)
│   ├── views/                  # EJS templates
│   │   ├── mainPage.ejs        # Home page with search
│   │   ├── searchPage.ejs      # Search results page
│   │   └── errorPage.ejs       # Error pages (404/500)
│   └── index.js                # App entry point
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
├── README.md
├── README.ar.md
├── .env.example
└── package.json
```

---

## 🗺️ Roadmap

- [ ] Side-by-side results comparison UI
- [ ] Additional providers (Expedia, Hotels.com)
- [ ] Price history and trend tracking
- [ ] User accounts and saved searches
- [ ] Docker deployment configuration
- [ ] Unit and integration tests

---

## 🤝 Contributing

We welcome contributions. Please read our [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) before submitting a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Muqaren | vX.Y.Z | Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔒 Security

To report a security vulnerability, please follow our [Security Policy](./SECURITY.md). Do not open a public issue.

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed version history. This project follows [Semantic Versioning](https://semver.org/).

| Version   | Date       | Highlights                                                    |
| --------- | ---------- | ------------------------------------------------------------- |
| **1.0.0** | 2026-05-15 | Initial release: Agoda & Booking.com comparison, Arabic UI    |

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**SHADOW_x7 — RED SHADOWS | RS**

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/red-shadows-rs">RED SHADOWS | RS</a></sub>
</p>