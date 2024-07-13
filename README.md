# Pocket school quiz application

**Live link :** [pocket-school-quiz.web.app](https://pocket-school-quiz.web.app/)

![Screenshot from 2024-07-13 11-23-16](https://github.com/user-attachments/assets/e8ddbfc2-f12c-42d7-bf33-b039c3f7c44f)

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Setup and Installation](#setup-and-installation)

## Introduction

Welcome to the Quiz Application! This application allows users to create, participate in, and manage quizzes efficiently and effectively. The application supports multiple types of questions including Multiple Choice, Multiple Answers, and Text Answer, making it versatile for various types of quizzes.

With real-time timers and secure APIs, this application provides a seamless experience for both quiz creators and participants. It also includes user performance tracking and detailed statistics to help users improve and gauge their knowledge over time.

Whether you're an educator looking to assess your students, a team leader aiming to engage your team with fun quizzes, or just someone who loves creating and taking quizzes, this application has got you covered.

Enjoy using the Quiz Application and make the most of your learning and teaching experiences!

## Technologies Used

### Frontend

- **React 18**
- **TypeScript**
- **TailwindCSS**: For styling.
- **Firebase**: For authentication, storage, and real-time database.
- **Framer Motion**: For animations.
- **Shadcn**: For building buttons, dropdowns, toast messages, and forms.
- **Radix UI**: For unstyled UI components.
- **react-hook-form**: For handling form state and validation.
- **Zod**: For schema validation.

### Backend

- **Express**
- **TypeScript**
- **Mongoose**: For data modaling and database manage
- **Morgan**: For dev request log
- **JWT**: For Authentication
- **jimp**: For image manipulation

## Features

### 1. User Authentication

- **Secure Login/Signup:** Users can securely create accounts and log in using email and password.
- **Role Management:** Different roles for administrators, quiz creators, and participants with specific permissions.

### 2. Quiz Creation

- **Multiple Question Types:** Supports Multiple Choice, Multiple Answers, and Text Answer questions.
- **Time-Bound Questions:** Each question can have a specific time limit for answering.
- **Question Marks:** Assign marks to each question for a weighted scoring system.

### 3. Quiz Management

- **Quiz Scheduling:** Set start times for quizzes to control when participants can take them.
- **Quiz Editing:** Easily update quiz details, questions, and settings.
- **Quiz Deletion:** Remove quizzes and associated questions from the database.

### 4. Participation

- **Interactive Quiz Taking:** Participants can take quizzes with a real-time countdown for each question.
- **Automatic Progression:** Automatically move to the next question when time expires or an answer is submitted.
- **Answer Submission:** Submit answers securely, with validation and immediate feedback.

### 5. Result Tracking

- **Detailed Results:** Store participants' answers along with correct/incorrect indicators and scores.
- **Quiz Statistics:** View detailed statistics on quiz performance, including average scores and question difficulty.

### 6. User Performance

- **Progress Tracking:** Monitor user progress across multiple quizzes.
- **Leaderboard:** Compare user performance with a leaderboard for competitive engagement.

### 7. Classroom Integration

- **Classroom Management:** Manage multiple classrooms with associated quizzes and participants.
- **Participant Tracking:** Track individual participant performance within each classroom.

### 8. API Integration

- **Secure APIs:** Use secure RESTful APIs for all operations, ensuring data integrity and security.
- **Extensibility:** Easily extend the application with additional features and integrations using the provided APIs.

### 9. User-Friendly Interface

- **Responsive Design:** Fully responsive design ensures the application works on all devices.
- **Shadcn UI Components:** Utilize modern and customizable Shadcn UI components for a sleek user experience.
- **Real-Time Updates:** Real-time updates and notifications keep users informed of their progress and results.

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn or pnpm or bun

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/saiful7778/pocketschool-quiz.git
   cd pocketschool-quiz
   ```

2. Install dependencies:

   ```bash
   cd ./frontend

   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

   ```bash
   cd ./backend

   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

> **Note:** Here I use `bun` you can any of them

3. Set up environment variables:

   Create two `.env` file in the frontend and backend folder and add the following variables:

   #### backend

   ```js
   // backend
   FRONTEND_URL = frontend_site_url;
   DB_CONNECT = mongodb_database_url;
   ACCESS_TOKEN = jwt_secret;
   NODE_ENV = environment;
   ```

   #### frontend

   ```js
   // fronend
   VITE_APIKEY = firebase_secret;
   VITE_AUTHDOMAIN = firebase_secret;
   VITE_DATABASEURL = firebase_secret;
   VITE_PROJECTID = firebase_secret;
   VITE_STORAGEBUCKET = firebase_secret;
   VITE_MESSAGINGSENDERID = firebase_secret;
   VITE_APPID = firebase_secret;
   VITE_SERVER_URL = server_url;
   ```

4. Run the application:

   ```bash
   cd ./backend

   # development run
   npm run dev
   # or
   yarn run dev
   # or
   pnpm run dev
   # or
   bun run dev

   # build
   npm run build
   # or
   yarn run build
   # or
   pnpm run build
   # or
   bun run build

   # production run
   npm run start
   # or
   yarn run start
   # or
   pnpm run start
   # or
   bun run start
   ```

   ```bash
   cd ./frontend

   # development run
   npm run dev
   # or
   yarn run dev
   # or
   pnpm run dev
   # or
   bun run dev

   # build
   npm run build
   # or
   yarn run build
   # or
   pnpm run build
   # or
   bun run build

   # production run
   npm run preview
   # or
   yarn run preview
   # or
   pnpm run preview
   # or
   bun run preview
   ```

5. Deploy the application:

   ```bash
   cd ./backend

   # deploy
   npm run deploy
   # or
   yarn run deploy
   # or
   pnpm run deploy
   # or
   bun run deploy
   ```

   **Note :** Server deployed on vercel

   ```bash
   cd ./frontend

   # deploy
   npm run deploy
   # or
   yarn run deploy
   # or
   pnpm run deploy
   # or
   bun run deploy
   ```

   **Note :** Server deployed on firebase hosting
