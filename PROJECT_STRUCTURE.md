# Project Structure and Overview

This document provides an overview of the project's structure, layout, components, and styling approach.

## 1. Wireframe and Layout

The application is designed as an AI-powered chatbot to recommend insurance plans. It features a main chat interface and several auxiliary pages for configuration and data entry.

### Main Page (`/`)

-   **Layout**: Consists of a `Header` and a main content area housing the `Chat` component.
-   **Wireframe**:
    -   **Header**: Displays the app logo/name ("Jeb_"), the current language (TH/EN), and a button to navigate to the chat style settings page.
    -   **Chat Area**:
        -   `ProgressSteps`: A visual indicator at the top showing the user's journey (Enquiry > Recommendation > Product > Form > Payment).
        -   `Chat History`: A scrollable area displaying the conversation between the user and the bot.
        -   `Input Form`: A textarea for the user to type their message and a send button.

### Chat Style Page (`/chat-style`)

-   **Layout**: `Header`, a "Back" button, and a settings card.
-   **Wireframe**: Allows the user to select a communication style (Friendly, Professional, Analytical) with detailed descriptions for each style.

### Product Summary Page (`/product-summary`)

-   **Layout**: `Header`, `ProgressSteps`, a "Back" button, and a card displaying plan details.
-   **Wireframe**: Shows the details of the selected insurance plan (coverage, premium, benefits) and a "Proceed to Purchase" button to navigate to the user information form.

### User Information Page (`/user-info`)

-   **Layout**: `Header`, `ProgressSteps`, a "Back" button, and a data entry form.
-   **Wireframe**: A form for users to enter their personal information (name, phone number, etc.).

---

## 2. Project Component Structure

The project uses the Next.js App Router, with the main source code located in the `src/` directory.

-   **`src/app/`**: The primary directory for application pages (routes).
    -   `layout.tsx`: The root layout for all pages.
    -   `page.tsx`: The main homepage component (Chat interface).
    -   `chat-style/page.tsx`: The page for selecting chat styles.
    -   `product-summary/page.tsx`: The page for displaying insurance plan summaries.
    -   `user-info/page.tsx`: The page containing the user information form.
    -   `globals.css`: The main global stylesheet for the project.

-   **`src/components/`**: Contains all reusable React components.
    -   `chat/`: Components related to the chat system, such as `chat.tsx` (main handler) and `message.tsx` (individual message bubble).
    -   `ui/`: Core UI components from **ShadCN**, like `Button.tsx`, `Card.tsx`, and `Input.tsx`. These are the building blocks of the interface.
    -   `header.tsx`: The main header component displayed on all pages.
    -   `progress-steps.tsx`: The component that visualizes the user's progress through the purchasing journey.
    -   `plan-results.tsx`: The component used to display the insurance plan recommendations from the AI.

-   **`src/ai/`**: Contains all code related to the Generative AI (Genkit) integration.
    -   `flows/`: Directory for AI flows, such as `recommend-insurance-plans.ts`.
    -   `knowledge/`: Stores knowledge bases for the AI, like `insurance-products.ts`.

-   **`src/lib/`**: A directory for utility functions and type definitions.
    -   `types.ts`: Contains TypeScript type definitions used throughout the project.
    -   `utils.ts`: General utility functions (e.g., `cn` for combining class names).

-   **`src/firebase/`**: Manages Firebase configuration and setup.
    -   `config.ts`: Stores the Firebase project configuration object.
    -   `provider.tsx` & `client-provider.tsx`: React Context providers to manage and distribute Firebase services throughout the component tree.
    -   `index.ts`: Central export point for Firebase-related functions and hooks.

---

## 3. The Role of `globals.css`

The file `src/app/globals.css` is the central stylesheet for the entire application. It is imported into the `RootLayout` and applies globally.

### Key Functions:

1.  **Tailwind CSS Imports**: It uses the `@tailwind` directive to import Tailwind's base styles, components, and utilities, making them available project-wide.

2.  **Theme and Color Definition (via CSS Variables)**:
    -   This is the most critical role of this file. Inside an `@layer base` block, it defines a comprehensive set of CSS variables that control the application's color scheme (e.g., `--background`, `--foreground`, `--primary`, `--accent`).
    -   These colors are defined in HSL (Hue, Saturation, Lightness) format, which makes it easy to create a consistent and easily customizable theme.
    -   It defines variables for both **Light Mode** (`:root`) and **Dark Mode** (`.dark`), allowing for seamless theme switching.
    -   All **ShadCN/UI** components are built to use these CSS variables by default. This means that by changing a color value in `globals.css` (e.g., the `--primary` variable), the color of all relevant UI components (buttons, borders, rings, etc.) will update automatically. This ensures a consistent look and feel.

3.  **Base Styling**:
    -   It's also used to apply fundamental styles to the entire application, such as setting the default `font-family` on the `body` tag.
