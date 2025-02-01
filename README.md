# quick-ejs

`quick-ejs` is a CLI tool for quickly setting up an Express.js project with EJS as the view engine. It helps you scaffold a project structure with basic setup files, such as `index.js`, an `index.ejs` template, and some default assets like CSS, JS, and fonts.

## Installation

You can install `quick-ejs` globally using npm to use it as a command-line tool:

```sh
npm install -g quick-ejs
```

## Usage

Once installed, you can easily create a new project by running the following command:

```sh
create-ejs <project-name>
```

## Project Structure
The generated project includes:
```
<project-name>/
├── app/
│   └── index.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── assets/
│       ├── data.json
│       ├── images/
│       └── fonts/
├── index.js
└── package.json
```
