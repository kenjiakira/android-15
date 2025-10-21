# android-15-simulator

📱 A Xiaomi HyperOS Simulator built using Next.js and TypeScript. Experience a modern Android interface in your browser!

[![TypeScript](https://img.shields.io/badge/-TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

## Description

This project simulates the user interface of Xiaomi's HyperOS, based on Android 15, directly in your web browser. It's built using Next.js, TypeScript, and leverages various UI libraries like Radix UI and Tailwind CSS for a smooth, responsive, and visually appealing experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## ✨ Features

- **Interactive Home Screen:** Mimics the look and feel of Xiaomi's HyperOS home screen, complete with app grid and widgets.
- **Simulated Apps:** Includes several simulated applications, such as:
    - **Settings:**  Provides a glimpse into system settings.
    - **Gallery:** Browse through a simulated photo gallery.
    - **Game Center:** Explore available games.
    - **Contacts:** Manage a list of simulated contacts.
    - **Mi Store:** Discover new apps in a simulated app store.
    - **Mi Video:** Watch trailers.
    - **Radio FM:** Tune into simulated radio stations.
    - **ChatGPT:** Interact with a client-side simulation of ChatGPT (no API).
    - **Google Apps:** Includes simulations of Google, Gmail, Maps, Photos.
    - **Social Media Apps:** Simulations for Facebook, Instagram, and Zalo.
    - **System Tools:** Access File Explorer and Calculator apps.
- **Widgets:** Includes functional widgets, such as:
    - **Date & Time:** Real-time clock and date display.
    - **Google Search Bar:** Quick access to Google search.
    - **Photo Widget:** Access to gallery and a personal landscape photo.
    - **System Tools Widget:** Quick actions for calculator and file explorer.
- **Lock Screen:** Provides a lock screen interface with fingerprint unlock simulation.
- **Quick Settings Panel:** Access quick settings toggles.
- **Navigation Bar:** Replicates the navigation bar for seamless navigation
- **Themes:** Customize the look with different themes and wallpapers.
- **Virtual Keyboard:** Typing experience within apps using a virtual keyboard (react-simple-keyboard).
- **Responsive Design:** Adapts to different screen sizes using Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS, CSS Modules
- **Radix UI:** For accessible UI components (@radix-ui/react-*)
- **react-hook-form:** For handling forms
- **zod:** For schema validation.

## 🚀 Installation

1.  **Clone the repository:**
   ```bash
   git clone https://github.com/kenjiakira/android-15-simulator.git
   cd android-15-simulator
   ```
2.  **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## 💻 Usage

1.  **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
2.  **Open your browser** and navigate to `http://localhost:3000`.

### Scripts

The `package.json` file includes the following scripts:

- `dev`: Starts the Next.js development server.
- `build`: Builds the application for production.
- `start`: Starts the Next.js production server.
- `lint`: Runs the ESLint linter.

## 📂 Project Structure

```
android-15-simulator/
├── app/
│   ├── globals.css       # Global CSS styles
│   ├── layout.tsx        # Root layout of the application
│   └── page.tsx          # Main page component
├── components/
│   ├── atoms/          # Basic UI building blocks
│   ├── organisms/      # Composite UI components
│   ├── apps/           # Individual app screens
│   ├── ui/             # Reusable UI components built with Radix UI and Tailwind CSS
│   ├── apps-grid.tsx     # Grid layout for apps on the home screen
│   ├── dock.tsx          # Dock component
│   ├── home-screen.tsx   # Main home screen
│   ├── lock-screen.tsx   # Lock screen component
│   ├── navigation-bar.tsx # Navigation bar component
│   └── status-bar.tsx    # Status bar component
├── hooks/
│   ├── use-app-manager.ts  # Manages app navigation and state
│   └── use-gesture-manager.ts # Handles touch and mouse gestures
├── lib/
│   ├── app-manager.ts    # App management logic
│   ├── app-router.tsx    # App routing logic
│   └── utils.ts          # Utility functions
├── public/
│   ├── fonts/           # Custom font files
│   ├── svg/             # SVG icons
│   └── home-screen.png   # Default home screen image
├── styles/
│   ├── globals.css       # Global CSS styles
│   └── virtual-keyboard.css # Styles for the virtual keyboard
├── next.config.mjs    # Next.js configuration file
├── package.json       # Project dependencies and scripts
└── tsconfig.json      # TypeScript configuration file
```

## ✍️ Contributing

Contributions are welcome!  Please fork the repository and submit pull requests with clear descriptions of your changes.

## 📜 License

This project has no license.

## 🔗 Important Links

- **Repository:** [android-15-simulator](https://github.com/kenjiakira/android-15-simulator)

## <footer>

Built by [kenjiakira](https://github.com/kenjiakira). Explore the code, contribute, and give it a ⭐ on [GitHub](https://github.com/kenjiakira/android-15-simulator)! Create an issue or submit a pull request. Fork this project and give it a like, star, issues etc.


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**