# EduKid Platform

This is a Next.js project for an educational platform targeted at young students, built with Firebase and TailwindCSS.

## Features

- **Student & Teacher Login**: Separate authentication flows for students and teachers.
- **Teacher Dashboard**: Teachers can create, view, and manage their exams.
- **Dynamic Exam Builder**: An interface for teachers to create exams with titles, time limits, and multiple-choice questions.
- **Student Exam Interface**: A clean, timed interface for students to take exams.
- **Instant Results**: Students see their scores immediately after completing an exam.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Authentication & DB**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)

---

## Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes. This requires a computer with Node.js installed.

### Prerequisites

- Node.js (v18 or later)
- A package manager like npm, yarn, or pnpm
- A Firebase project

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/edukid-platform.git
    cd edukid-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Firebase**

    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - Go to your project's settings and under the "General" tab, find your project's configuration for a web app.
    - Create a new file `src/lib/firebase.ts`.
    - Copy your Firebase config object into `src/lib/firebase.ts`. It should look like this:

    ```typescript
    // src/lib/firebase.ts
    import { initializeApp, getApp, getApps } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "AIza....",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "1:...",
      measurementId: "G-..."
    };

    // Initialize Firebase
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);

    export { app, auth, db };
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) with your browser to see the result.

---

## Deployment Instructions

To share your project with the world, first publish it to GitHub, then deploy it with a hosting service like Vercel.

### Step 1: Publish to GitHub

You will need to have [Git](https://git-scm.com/downloads) installed on your computer for these commands.

1.  **Create a New Repository on GitHub:**
    - Go to [GitHub.com](https://github.com) and log in.
    - Click the **+** icon in the top-right and select **"New repository"**.
    - Name your repository (e.g., `edukid-platform`).
    - **Important**: Do NOT check the boxes to add a README, .gitignore, or license, as your project already has them.
    - Click **"Create repository"**.

2.  **Push Your Code from Your Computer:**
    - Open a terminal or command prompt in your project's folder.
    - Run the following commands one by one.

    ```bash
    # Initialize Git in your project folder
    git init -b main

    # Add all files to be tracked
    git add .

    # Create your first "commit" (a snapshot of your code)
    git commit -m "Initial commit"

    # Connect your local folder to the GitHub repository you just created
    # Replace YOUR_USERNAME and YOUR_REPOSITORY with your actual GitHub details
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

    # Push your code to GitHub
    git push -u origin main
    ```

### Step 2: Deploy with Vercel

Vercel is a platform from the creators of Next.js that makes deployment simple.

1.  **Sign Up & Import Project:**
    - Go to [Vercel.com](https://vercel.com/signup) and sign up using your GitHub account.
    - After signing up, click **"Add New..." -> "Project"**.
    - Find your new GitHub repository (`edukid-platform`) and click **"Import"**.

2.  **Configure & Deploy:**
    - Vercel will automatically detect that you have a Next.js project. You usually don't need to change any settings.
    - You may need to configure your Firebase Environment Variables if you are using them for your configuration.
    - Click the **"Deploy"** button.

Vercel will build and deploy your site. Once it's finished, you'll have a live URL to share with everyone!
