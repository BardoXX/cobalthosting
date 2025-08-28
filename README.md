# Cobalt Hosting

A modern web application for Cobalt Hosting with internationalization and theming support.

## Features

- 🌐 Multi-language support
- 💰 Multi-currency support
- 🎨 Theme customization
- 🚀 Optimized for Vercel and GitHub Pages
- ⚡ Fast and responsive design

## Prerequisites

- Node.js 16+ and npm 7+
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cobalthosting.git
   cd cobalthosting
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To create a production build:

```bash
npm run build
```

## Deployment

### Deploying to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```
   Or connect your GitHub repository to Vercel for automatic deployments.

### Deploying to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/cobalthosting"
   ```

2. Install `gh-pages` (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_APP_TITLE=Cobalt Hosting
VITE_APP_API_URL=your_api_url_here
```

## Project Structure

```
├── config/               # Configuration files
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   ├── context/          # React context providers
│   ├── locales/          # Translation files
│   ├── pages/            # Page components
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
