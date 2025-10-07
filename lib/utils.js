export function getDependencies(config) {
  const deps = ['express', 'dotenv'];

  if (config.template === 'ejs') {
    deps.push('ejs');
  }

  if (config.useMongoDB) {
    deps.push('mongoose');
  }

  if (config.useAuth) {
    deps.push('bcryptjs', 'jsonwebtoken');
  }

  return deps;
}

export function getDevDependencies() {
  return ['nodemon'];
}

export function generateReadme(config) {
  return `# ${config.projectName || 'Express App'}

Generated with quick-ejs

## Features

${config.template === 'ejs' ? '- EJS templating engine' : '- Static HTML files'}
${config.useRoutes ? '- Organized route structure' : ''}
${config.useControllers ? '- MVC pattern with controllers' : ''}
${config.useMongoDB ? '- MongoDB integration' : ''}
${config.useAuth ? '- JWT authentication' : ''}
- Ready for Vercel deployment

## Getting Started

1. Install dependencies:
\`\`\`bash
${config.packageManager} install
\`\`\`

${config.useMongoDB ? `2. Create a .env file and add your MongoDB URI:
\`\`\`
MONGO_URI=mongodb://127.0.0.1:27017/yourdb
\`\`\`

3. ` : '2. '}Run the development server:
\`\`\`bash
${config.packageManager} ${config.packageManager === 'npm' ? 'run ' : ''}dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

3. Add environment variables in Vercel dashboard:
${config.useMongoDB ? '   - MONGO_URI\n' : ''}${config.useAuth ? '   - JWT_SECRET\n   - JWT_EXPIRE\n' : ''}   - NODE_ENV=production

The \`vercel.json\` file is already configured for you!

## Project Structure

\`\`\`
${config.projectName}/
├── public/          # Static files
│   ├── css/
│   ├── js/
│   └── assets/
${config.template === 'ejs' ? '├── views/           # EJS templates\n' : ''}${config.useRoutes ? '├── routes/          # Route definitions\n' : ''}${config.useControllers ? '├── controllers/     # Request handlers\n' : ''}${config.useMongoDB ? '├── models/          # Database models\n├── config/          # Configuration files\n' : ''}${config.useAuth ? '├── middleware/      # Custom middleware\n' : ''}├── .env             # Environment variables
├── server.js        # Entry point
└── vercel.json      # Vercel deployment config
\`\`\`

## Learn More

- [Express.js Documentation](https://expressjs.com/)
${config.template === 'ejs' ? '- [EJS Documentation](https://ejs.co/)\n' : ''}${config.useMongoDB ? '- [MongoDB Documentation](https://docs.mongodb.com/)\n' : ''}
- [Vercel Deployment](https://vercel.com/docs)
`;
}
