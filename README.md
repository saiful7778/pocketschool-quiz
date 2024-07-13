# Quiz Application

This is a comprehensive quiz application that allows users to create, participate in, and manage quizzes. The application supports various question types and provides real-time quiz statistics.

## Features

- Create and manage quizzes
- Support for multiple question types (Multiple Choice, Multiple Answers, Text Answer)
- Real-time timer for each question
- User performance tracking and statistics
- Secure API with authentication

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/quiz-application.git
    cd quiz-application
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Usage

### Running the Application

- Navigate to `http://localhost:3000` to access the application.
- Use the signup or login functionality to create an account.
- Create a new quiz by navigating to the "Create Quiz" page.
- Participate in a quiz by selecting it from the list of available quizzes.

### Example Commands

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm start`: Starts the production server

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user
- **POST /api/auth/login**: Log in a user

### Quizzes

- **GET /api/quizzes**: Get all quizzes
- **POST /api/quizzes**: Create a new quiz
- **GET /api/quizzes/:quizId**: Get a specific quiz
- **PUT /api/quizzes/:quizId**: Update a quiz
- **DELETE /api/quizzes/:quizId**: Delete a quiz

### Example Request

```bash
curl -X POST http://localhost:3000/api/quizzes \
-H "Content-Type: application/json" \
-d '{
  "title": "Sample Quiz",
  "author": "authorId",
  "classroom": "classroomId",
  "questions": [
    {
      "questionText": "What is 2 + 2?",
      "questionType": "multipleOption",
      "options": [
        { "text": "3" },
        { "text": "4" }
      ],
      "correctAnswerIndex": 1
    }
  ]
}'
