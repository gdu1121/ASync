# ASync

ASync is a social networking platform designed to combine friendships, communities, and romantic connections. The project was developed using HTML, CSS, and JavaScript, with GitHub Copilot assisting in portions of the implementation and debugging. The project is built as a front-end-only experience and focuses on layout, interaction design, and product storytelling rather than a live backend or real user database.

## Overview

The experience presents ASync as a modern social app where users can:

- Explore friendship opportunities with people who share similar interests
- Browse dating profiles with clear intent and low-pressure discovery
- Join or discover communities around hobbies, events, and local groups
- Message people and participate in group conversations
- Sign up and create a demo profile to simulate the onboarding flow

The site is structured as a set of separate HTML pages, each representing a different part of the product journey.

## Website structure

The primary pages include:

- `index.html` — redirect page that sends visitors to the home screen
- `home.html` — landing page and brand overview
- `friends.html` — friendship-focused discovery experience
- `dating.html` — dating profile exploration and matching UI
- `communities.html` — groups and community discovery
- `messages.html` — inbox and chat experience
- `features.html` — feature overview and product positioning
- `signup.html` — profile creation form and onboarding mockup

## Visual design

ASync uses a contemporary social-platform aesthetic with:

- soft teal, blue, and violet gradients
- bold headline typography and call-to-action buttons
- a connection-network hero graphic
- responsive layout for desktop and mobile browsing
- dark mode support throughout the interface

The design balances friendly community language with dating-app energy, without making any one path feel forced or exclusive.

## Front-end implementation

This project is a static website built with:

- HTML for page structure
- CSS for layout, theming, and responsive behavior
- JavaScript for client-side interactions and simulated app logic

Core client-side behavior is organized under the `js/` directory and loaded through the shared site scripts, while shared styling is centralized in the root `styles.css` and `css/` folder.

## Local development

### Prerequisites

- Node.js and npm

### Install dependencies

```bash
npm install
```

### Run the site locally

```bash
npm run dev
```

Then open the site in a browser at:

```text
http://127.0.0.1:8000
```

The project also includes a static server script:

```bash
npm run serve
```

## Testing

This website includes Playwright end-to-end tests:

```bash
npm test
```

To open the Playwright report:

```bash
npm run test:report
```

## Notes

This is a demo prototype, not a production social platform. Profile matching, messaging, and account logic are simulated in the browser for design and prototype purposes only. There is no backend, authentication flow, or live database behind the UI.

## License

This project is licensed under the MIT License.
