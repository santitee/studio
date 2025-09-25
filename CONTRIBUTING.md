# How to Run This Project

Follow these steps to get the development environment running.

## Prerequisites

- [Node.js](https://nodejs.org/) version 20 or later.
- [npm](https://www.npmjs.com/) (usually comes with Node.js).
- A Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Step-by-Step Guide

### 1. Set Up Environment Variables

You need to provide your Google AI API key to the application.

1.  Create a new file named `.env` in the root of the project.
2.  Open the `.env` file and add the following line, replacing `<YOUR_API_KEY>` with your actual key:

    ```
    GEMINI_API_KEY=<YOUR_API_KEY>
    ```

### 2. Install Dependencies

Open your terminal, navigate to the project's root directory, and run the following command to install all the necessary packages:

```bash
npm install
```

### 3. Run the AI Backend (Genkit)

For the AI features to work, you need to run the Genkit development server. Open a new terminal window, navigate to the project directory, and run:

```bash
npm run genkit:watch
```

This command will start the Genkit server and watch for any changes in your AI-related files. Keep this terminal window open.

### 4. Run the Web Application (Next.js)

In another terminal window, navigate to the project directory and start the Next.js development server:

```bash
npm run dev
```

This will start the main web application.

### 5. Access the Application

Once both servers are running, you can open your web browser and go to the following address to see the application in action:

[http://localhost:3000](http://localhost:3000)

You should now have the chatbot website running locally on your machine.