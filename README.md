# task-backend

This is a REST API task implemented in Node.js using the Express web framework with Typescript. The API supports user registration, login, user details retrieval, task creation, and listing tasks.

## Folder Structure

- **tsconfig.json:** TypeScript configuration file.
- **app.ts:** Main file of the application.
- **.gitignore**
- **package.json**
- **README.md**

### Source Code Structure

- **src/**
  - **config/**
    - **index.ts:** Configuration module to manage environment variables.
  - **controllers/**
    - **user.ts:** Controller for handling user-related requests and communication with the database.
    - **tasks.ts:** Controller for handling task-related requests and communication with the database.
  - **middleware/**
    - **auth.ts:** Middleware for authenticating requests.
  - **routes/**
    - **index.ts:** Entry point for handling all five routes.
  - **models/**
    - **index.ts:** Connection to Database.
    - **users.ts:** Model for user data.
    - **tasks.ts:** Model for task data.
  - **utils/**
    - **helpers.ts:** Utility functions used throughout the application.

### Start the application

- Development (with Nodemon for automatic restarts): **npm run dev**
- Build TypeScript files (optional): **npm run build**
- Production: **npm start**
