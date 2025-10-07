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
└── server.js # Application entry point

## CLI Options

The interactive CLI will ask you to choose:

1. **Project name** - Your application name
2. **Template type** - EJS (dynamic) or HTML (static)
3. **Routes** - Separate route files for organization
4. **Controllers** - MVC pattern with controller layer
5. **MongoDB** - Database integration with Mongoose
6. **Authentication** - JWT-based auth system
7. **Package Manager** - npm, yarn, or pnpm

## Example Usage

### Basic EJS Project

```sh
npx quick-ejs my-blog
```

Follow the prompts:

- Template: EJS
- Routes: Yes
- Controllers: Yes
- MongoDB: No
- Package Manager: npm

### Full-Stack with Authentication

```sh
npx quick-ejs my-auth-app
```

Follow the prompts:

- Template: EJS
- Routes: Yes
- Controllers: Yes
- MongoDB: Yes
- Authentication: Yes
- Package Manager: npm

### Static HTML Project

```sh
npx quick-ejs my-website
```

Follow the prompts:

- Template: HTML
- Routes: No
- Controllers: No
- MongoDB: No
- Package Manager: npm

## What's New in v2.0

- **ES6 module support** - Modern JavaScript syntax throughout
- **Interactive CLI** - User-friendly prompts similar to create-next-app
- **Modern styling** - Beautiful default CSS with Lucide icons
- **MongoDB integration** - Optional database setup with Mongoose
- **JWT authentication** - Secure auth system with bcrypt and JWT
- **MVC architecture** - Optional routes and controllers pattern
- **Multiple package managers** - Support for npm, yarn, and pnpm
- **Clean output** - Professional terminal interface with ora spinners
- **Comprehensive error handling** - Built-in 404 and error pages

## Project Features

### Beautiful Default Styling

Every generated project comes with:

- Modern gradient backgrounds
- Responsive grid layouts
- Smooth animations and transitions
- Lucide icon integration
- Mobile-first design
- CSS custom properties for easy theming

### Environment Configuration

Projects include `.env.example` with:

- PORT configuration
- NODE_ENV settings
- MongoDB URI (if selected)
- JWT secrets (if auth selected)

### Ready-to-Use Scripts

Generated `package.json` includes:

- `npm start` - Production server
- `npm run dev` - Development with nodemon

## Requirements

- **Node.js**: 18.0.0 or later
- **npm**: 6.0.0 or later (or equivalent yarn/pnpm)

### v1.0.2 (Previous)

- Basic Express + EJS setup
- Simple file structure generation
- Font file copying

## Links

- **GitHub**: [https://github.com/MakPr016/quick-ejs](https://github.com/MakPr016/quick-ejs)
- **npm**: [https://www.npmjs.com/package/quick-ejs](https://www.npmjs.com/package/quick-ejs)
- **Issues**: [https://github.com/MakPr016/quick-ejs/issues](https://github.com/MakPr016/quick-ejs/issues)

## License

MIT © Mayank K.S

## Acknowledgments

- Inspired by create-next-app and create-react-app
- Icons by [Lucide](https://lucide.dev/)
- Built with [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- Styled with [Chalk](https://github.com/chalk/chalk)
- Loading spinners by [Ora](https://github.com/sindresorhus/ora)

---

**Made with ❤️ by Mayank K.S**

*Happy coding!*
