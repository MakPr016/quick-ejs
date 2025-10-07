# quick-ejs

`quick-ejs` is an interactive CLI tool for quickly setting up modern Express.js projects with your choice of EJS or HTML templates. It provides a comprehensive boilerplate with optional MongoDB integration, JWT authentication, and MVC architecture.

## Quick Start

Use npx to create a new project without installing the package globally:

```sh
npx quick-ejs my-project
```

Or install globally:

```sh
npm install -g quick-ejs
quick-ejs my-project
```

## Features

- Interactive CLI with modern prompts
- Choice between EJS templating or static HTML
- Optional MVC architecture with routes and controllers
- MongoDB integration with user models
- JWT-based authentication system
- Beautiful default styling with Lucide icons
- Responsive design out of the box
- Support for npm, yarn, and pnpm
- ES6 modules throughout
- Environment variable configuration
- Error handling and 404 pages

## Generated Project Structure

my-project/
├── public/
│ ├── css/style.css # Modern responsive styles
│ ├── js/app.js # Client-side JavaScript
│ └── assets/ # Images, fonts, etc.
├── views/ (if EJS)
│ ├── index.ejs # Main template
│ └── partials/ # Reusable components
├── routes/ (if enabled)
│ ├── index.js # Route definitions
│ └── auth.js # Auth routes
├── controllers/ (if enabled)
│ ├── homeController.js # Request handlers
│ └── authController.js # Auth logic
├── models/ (if MongoDB)
│ └── User.js # User model
├── config/ (if MongoDB)
│ └── db.js # Database connection
├── middleware/ (if auth)
│ └── auth.js # JWT middleware
├── .env.example # Environment template
├── .gitignore
├── package.json # ES6 module configuration
└── index.js # Application entry point

## CLI Options

The interactive CLI will ask you to choose:

1. **Project name** - Your application name
2. **Template type** - EJS (dynamic) or HTML (static)
3. **Routes** - Separate route files for organization
4. **Controllers** - MVC pattern with controller layer
5. **MongoDB** - Database integration with Mongoose
6. **Authentication** - JWT-based auth system
7. **Package Manager** - npm, yarn, or pnpm

## What's New in v2.0

- ES6 module support throughout
- Interactive CLI similar to create-next-app
- Modern styling with Lucide icons
- MongoDB and authentication options
- MVC architecture support
- Multiple package manager support
- Clean terminal output with Lucide icons
- Comprehensive error handling

## Requirements

- Node.js 18.0.0 or later
- npm, yarn, or pnpm

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Mayank K.S

---
