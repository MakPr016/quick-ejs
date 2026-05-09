export function getDependencies(config) {
  const dependencies = {
    express: '^4.18.2',
    dotenv: '^16.0.3',
    chalk: '^5.2.0'
  };

  if (config.template === 'ejs') {
    dependencies.ejs = '^3.1.8';
  }

  if (config.useMySQL) {
    dependencies['mysql2'] = '^3.6.2';
  }

  if (config.useMongoDB) {
    dependencies.mongoose = '^7.0.0';
  }

  if (config.useAuth) {
    dependencies.bcryptjs = '^2.4.3';
    dependencies.jsonwebtoken = '^9.0.0';
    dependencies['cookie-parser'] = '^1.4.6';
  }

  return dependencies;
}

export function getDevDependencies() {
  return {
    nodemon: '^2.0.20'
  };
}

export function generateReadme(config) {
  let dbSection = '';

  if (config.useMySQL) {
    dbSection = `
## MySQL Setup (XAMPP)

### Prerequisites
- XAMPP installed with MySQL running
- MySQL running on localhost:3306

### Database Configuration

1. **Create Database:**
   \`\`\`sql
   CREATE DATABASE quickejs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   \`\`\`

2. **Configure Environment:**
   Create a \`.env\` file in the root directory:
   \`\`\`
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=quickejs_db
   ${config.useAuth ? 'JWT_SECRET=your-super-secret-key-change-this\nJWT_EXPIRE=7d' : ''}
   \`\`\`

3. **Start the Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   The application will automatically create tables on startup.

### Available Endpoints

${config.useAuth ? `
#### Authentication Endpoints
- \`POST /auth/register\` - Register a new user
- \`POST /auth/login\` - Login user
- \`GET /auth/logout\` - Logout user
- \`GET /auth/profile\` - Get current user profile (requires auth)

#### User Endpoints
- \`GET /api/users\` - Get all users
- \`GET /api/users/:id\` - Get user by ID
- \`PUT /api/users/:id\` - Update user
- \`DELETE /api/users/:id\` - Delete user
` : ''}

### Database Schema

\`\`\`sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

### Troubleshooting

- **Connection Refused:** Ensure XAMPP MySQL is running
- **Access Denied:** Check DB_USER and DB_PASSWORD in .env
- **Database Not Found:** Run the database creation query above

`;
  } else if (config.useMongoDB) {
    dbSection = `
## MongoDB Setup

### Prerequisites
- MongoDB installed and running
- MongoDB connection string ready

### Database Configuration

Create a \`.env\` file:
\`\`\`
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/quickejs_db
${config.useAuth ? 'JWT_SECRET=your-secret-key\nJWT_EXPIRE=7d' : ''}
\`\`\`
`;
  }

  return `# ${config.projectName}

A modern Express.js application generated with quick-ejs.

## Features

- Express.js server
- ${config.template === 'ejs' ? 'EJS templating engine' : 'Static HTML'}
- ${config.useRoutes ? 'Organized route structure' : 'Inline routes'}
- ${config.useControllers ? 'MVC controller pattern' : ''}
- ${config.useMySQL ? 'MySQL Database (XAMPP)' : config.useMongoDB ? 'MongoDB Database' : ''}
- ${config.useAuth ? 'JWT Authentication with bcrypt' : ''}
- Modern CSS styling
- Environment configuration
- Error handling

## Quick Start

### Installation

\`\`\`bash
npm install
\`\`\`

### Running the Server

**Development Mode (with auto-reload):**
\`\`\`bash
npm run dev
\`\`\`

**Production Mode:**
\`\`\`bash
npm start
\`\`\`

The server will run on \`http://localhost:3000\`
${dbSection}

## Project Structure

\`\`\`
${config.projectName}/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── assets/
├── ${config.template === 'ejs' ? 'views/' : 'public/'}
${config.template === 'ejs' ? '│   ├── index.ejs\n│   ├── error.ejs\n│   └── partials/' : '│   └── index.html'}
${config.useRoutes ? '├── routes/\n│   ├── index.js' + (config.useAuth ? '\n│   └── auth.js' : '') : ''}
${config.useControllers ? '├── controllers/\n│   ├── homeController.js' + (config.useAuth ? '\n│   └── authController.js' : '') : ''}
${config.useMySQL ? '├── config/\n│   └── db.js\n├── models/\n│   └── User.js' : config.useMongoDB ? '├── config/\n│   └── db.js\n├── models/\n│   └── User.js' : ''}
├── .env.example
├── .gitignore
├── package.json
└── server.js
\`\`\`

## Configuration

Copy \`.env.example\` to \`.env\` and update the values:

\`\`\`bash
cp .env.example .env
\`\`\`

## API Endpoints

- \`GET /\` - Home page
- \`GET /about\` - About page (if implemented)
${config.useAuth ? '- \`POST /auth/register\` - Register new user\n- \`POST /auth/login\` - Login user\n- \`GET /auth/logout\` - Logout user' : ''}

## Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Template Engine:** ${config.template === 'ejs' ? 'EJS' : 'HTML'}
- **Database:** ${config.useMySQL ? 'MySQL (XAMPP)' : config.useMongoDB ? 'MongoDB' : 'None'}
- **Authentication:** ${config.useAuth ? 'JWT + bcrypt' : 'None'}
- **Package Manager:** npm

## License

MIT

## Made with quick-ejs

Generated with ❤️ by [quick-ejs](https://github.com/MakPr016/quick-ejs)
`;
}