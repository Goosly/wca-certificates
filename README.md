# WCA Certificates

A web application for generating podium and participation certificates for World Cube Association (WCA) speedcubing competitions. Built primarily for competitions in Ireland and Northern Ireland.

Originally forked from https://github.com/Goosly/wca-certificates

**Live App:** https://speedcubing-ireland.github.io/wca-certificates/

## Features

### Podium Certificates
- Generate certificates for 1st, 2nd, and 3rd place winners
- Select specific events or generate for all events
- Filter results by country (ISO 2-letter codes)
- Handles ties in podium placement

### Participation Certificates
- Generate certificates for all competitors
- Includes a results summary table with rankings per event

### Customization
- Multi-language support: English (UK/US), Dutch, French, German (Switzerland), Mexican Spanish, Russian
- Custom JSON-based certificate templates
- Upload custom background images
- Configurable page orientation (landscape/portrait)
- X-offset adjustment for precise positioning

### Export Options
- Download as single PDF
- Download as ZIP with individual PDF files per certificate

## Technologies

- **Angular** 11.2.14
- **Angular Material** for UI components
- **PDFMake** for client-side PDF generation
- **JSZip** for ZIP file creation
- **@wca/helpers** for WCA data models

## Development

### Prerequisites
- Node.js 16.x (required for Cypress E2E tests; also works with Angular 11)
- Angular CLI 11.x

### Setting up Node.js with nvm

If you have a different version of Node.js installed, use [nvm](https://github.com/nvm-sh/nvm) to install and switch to Node 16:

```bash
# Install Node 16
nvm install 16

# Use Node 16 in current shell
nvm use 16

# Verify version
node --version  # Should show v16.x.x
```

### Installing Angular CLI 11

```bash
npm install -g @angular/cli@11
```

### Installation

```bash
npm install --legacy-peer-deps
```

Note: The `--legacy-peer-deps` flag is required due to peer dependency conflicts between Angular 11 and newer testing packages.

### Running Locally

```bash
ng serve
```

Navigate to http://localhost:4200/

### Testing

```bash
# Unit tests
ng test
```

### End-to-End Testing (Cypress)

The project uses [Cypress](https://www.cypress.io/) for end-to-end testing. **Node 16 is required** for E2E tests.

```bash
# Run E2E tests (starts server automatically and runs tests headlessly)
npm run e2e

# Run E2E tests with Cypress UI (interactive mode)
npm run e2e:open

# Run Cypress tests only (requires server running on localhost:4200)
npm run cy:run

# Open Cypress UI only (requires server running on localhost:4200)
npm run cy:open
```

The test suite covers:
- Competition selection and loading
- Podium certificate generation
- Participation certificate generation
- Certificate customization options
- Tab navigation and error handling

## Build & Deploy

To build and deploy to GitHub Pages:

```bash
sh build-prod.sh
```

This builds the production app and pushes the `dist` directory to the `gh-pages` branch, triggering a GitHub Pages deployment.

## Data Sources

- **Competition data:** Fetched from WCA API and [speedcubing-ireland/wca-analysis](https://github.com/speedcubing-ireland/wca-analysis)
- **Results data:** Fetched from the official WCA WCIF API
