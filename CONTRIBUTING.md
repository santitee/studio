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

### 3. Run the Development Servers

You need to run two separate servers for this project to work correctly: the **Next.js web application** and the **Genkit AI backend**.

#### Terminal 1: Run the AI Backend (Genkit)

For the AI features to work, you need to run the Genkit development server. This also starts the **Genkit Developer UI**, which acts as API documentation similar to Swagger.

Open a new terminal window, navigate to the project directory, and run:

```bash
npm run genkit:watch
```

This command will start the Genkit server. Keep this terminal window open.

- **AI Service:** Your AI flows will be running and ready to be called by the web app.
- **API Documentation (Developer UI):** You can open your browser and go to **[http://localhost:4000](http://localhost:4000)** to see all available AI flows, their inputs/outputs, and test them directly.

#### Terminal 2: Run the Web Application (Next.js)

In another terminal window, navigate to the project directory and start the Next.js development server:

```bash
npm run dev
```

This will start the main web application that you see in the browser preview.

### 4. Access the Application

Once both servers are running, you can open your web browser and go to the following address to see the application in action:

[http://localhost:3000](http://localhost:3000)

You should now have the chatbot website running locally on your machine, connected to your local AI backend.
