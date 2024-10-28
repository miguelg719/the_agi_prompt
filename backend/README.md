# The AGI Prompt (Back-end)

A RESTful API backend service for a prompt sharing platform built with Node, Express and MongoDB. This service enables users to create, share, and interact with AI prompts, including features for user authentication, voting, and commenting.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/miguelg719/the_agi_prompt.git
cd the_agi_prompt/backend
```

2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```

## 🛠️ API Endpoints

### Prompts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/prompts` | Get all prompts |
| GET | `/api/prompts/user/:id` | Get all prompts by a specific user |
| GET | `/api/prompts/:id` | Get a specific prompt by ID |
| POST | `/api/prompts` | Create a new prompt |
| PUT | `/api/prompts/:id` | Update a prompt |
| DELETE | `/api/prompts/:id` | Delete a prompt |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get user profile |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments` | Get comments by ID list |
| POST | `/api/comments` | Create a new comment |
| PUT | `/api/comments/:id` | Update a comment |

<!-- ## 📝 API Documentation

### Prompt Endpoints

#### Create Prompt
```javascript
POST /api/prompts
Content-Type: application/json

{
  "title": "string",
  "prompt": "string",
  "author": "userId",
  "tags": ["string"]
}
```

#### Update Prompt (including voting)
```javascript
PUT /api/prompts/:id
Content-Type: application/json

{
  "title": "string",
  "prompt": "string",
  "tags": ["string"],
  "vote": number,  // 1 for upvote, -1 for downvote, 0 for removing vote
  "userId": "string"
}
```

### User Endpoints

#### Register User
```javascript
POST /api/users/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login User
```javascript
POST /api/users/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
``` -->

## 🏗️ Project Structure

```
├── app.js              # Application entry point
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   ├── promptController.js
│   ├── userController.js
│   └── commentController.js
├── models/
│   ├── prompt.js
│   ├── user.js
│   └── comment.js
└── routes/
    ├── promptRoutes.js
    ├── userRoutes.js
    └── commentRoutes.js
```

## 🔒 Security Features

- CORS enabled for cross-origin requests
- JSON request body parsing
- Environment variables for sensitive data
- User authentication and authorization
- Secure password handling (implementation required in user controller)

## ⚙️ Features

- User registration and authentication
- CRUD operations for prompts
- Voting system for prompts
- Commenting system
- User-specific prompt retrieval
- Tag support for prompts
- Populated responses with user data

## 🚧 Development

The server runs on port 5001 by default but can be configured through the environment variables. It connects to MongoDB Atlas for data persistence.

To run in development mode:
```bash
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## ✨ Future Improvements

- Add rate limiting
- Implement caching
- Add input validation middleware
- Enhance error handling
- Add test suite
- Add API documentation using Swagger/OpenAPI
- Implement refresh tokens for authentication
- Add pagination for prompts and comments endpoints