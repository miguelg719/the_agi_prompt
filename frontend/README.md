# The AGI Prompt (Front-end)

A modern web application for sharing, collaborating on, and discussing AI prompts. Users can create, vote on, and discuss prompts for various AI models, helping to build a community-driven repository of unbiased alignment.

## 🚀 Features

- **Interactive Prompt Feed**: Browse and search through user-submitted prompts
- **Collaborative Voting System**: Upvote/downvote prompts and comments
- **Rich Discussion**: Comment system with nested discussions and vote tracking
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Fully responsive interface built with Tailwind CSS
- **Featured Prompts**: Highlighting top-rated and trending prompts
- **Tag-based Organization**: Filter and categorize prompts by tags
- **Real-time Updates**: Dynamic content updates for votes and comments

## 🛠️ Technologies

- **Frontend Framework**: React
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Authentication**: JWT-based authentication

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/miguelg719/the_agi_prompt.git
cd the_agi_prompt/frontend
```

2. Install dependencies:
```bash
npm install (or npm i)
```

3. Start the development server:
```bash
npm start
```

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── home.js        # Main feed page
│   ├── intro.js       # Landing page
│   ├── prompt-view.js # Individual prompt view
│   └── ...
├── services/          # API services
│   └── api.js        # API integration
├── context/          # React context
│   └── AuthContext.js # Authentication context
├── utils/            # Utility functions
└── App.js            # Main application component
```

## 🔒 Authentication

The application uses JWT-based authentication. Protected routes and features require users to be logged in. Authentication state is managed through the AuthContext provider.

## 🎨 Styling

- Built with Tailwind CSS for responsive design
- Custom UI components with shadcn/ui
- Consistent dark theme throughout the application
- Responsive layout for all screen sizes

## 🔄 API Integration

The application communicates with a backend API using axios. Key endpoints include:

- `/api/users/login` - User authentication
- `/api/prompts` - CRUD operations for prompts
- `/api/comments` - Comment management
- `/api/users/profile` - User profile management


## 👥 Authors

- Miguel Gonzalez
- Guillermo Gonzalez  

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.