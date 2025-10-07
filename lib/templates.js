export const defaultCSS = `/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --text-color: #1f2937;
    --bg-color: #f9fafb;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 2rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: var(--shadow);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

main {
    padding: 3rem 2rem;
}

.hero {
    text-align: center;
}

.hero h2 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #6b7280;
}

code {
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    color: var(--primary-color);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: var(--bg-color);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid var(--border-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.feature-card .icon {
    width: 48px;
    height: 48px;
    color: var(--primary-color);
    margin: 0 auto 1rem;
    display: block;
    stroke-width: 2;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.feature-card p {
    color: #6b7280;
}

footer {
    background: var(--bg-color);
    text-align: center;
    padding: 2rem;
    color: #6b7280;
    border-top: 2px solid var(--border-color);
}

/* Auth Forms */
.auth-container {
    max-width: 450px;
    margin: 0 auto;
    padding: 2rem;
}

.auth-form {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow);
}

.auth-form h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    text-align: center;
}

.auth-form p {
    text-align: center;
    color: #6b7280;
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
}

.form-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.btn {
    width: 100%;
    padding: 0.875rem;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.btn:active {
    transform: translateY(0);
}

.auth-links {
    text-align: center;
    margin-top: 1.5rem;
    color: #6b7280;
}

.auth-links a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

.auth-links a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 1.8rem;
    }
    
    .features {
        grid-template-columns: 1fr;
    }
    
    .auth-container {
        padding: 1rem;
    }
    
    .auth-form {
        padding: 1.5rem;
    }
}`;

export const defaultJS = `console.log('App initialized!');

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});`;

export const htmlTemplates = {
  ejs: {
    viewEngine: 'ejs',
    viewsFolder: 'views',
    defaultView: 'index.ejs',
    viewContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to <%= title %></h1>
            <p class="subtitle">Built with Express & EJS</p>
        </header>
        
        <main>
            <section class="hero">
                <h2>Getting Started</h2>
                <p>Edit <code>views/index.ejs</code> to customize this page.</p>
                <div class="features">
                    <div class="feature-card">
                        <i data-lucide="rocket" class="icon"></i>
                        <h3>Fast Setup</h3>
                        <p>Get started quickly with a pre-configured structure</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="package" class="icon"></i>
                        <h3>Organized</h3>
                        <p>Clean folder structure for scalable applications</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="palette" class="icon"></i>
                        <h3>Styled</h3>
                        <p>Beautiful default styles to build upon</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer>
            <p>Created with quick-ejs</p>
        </footer>
    </div>
    <script src="/js/app.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`,
    partials: {
      header: `<header class="nav-header">
    <nav>
        <div class="logo">
            <h2><%= title %></h2>
        </div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>`,
      footer: `<footer class="site-footer">
    <p>&copy; 2025 <%= title %>. All rights reserved.</p>
</footer>`
    }
  },
  html: {
    viewEngine: 'html',
    viewsFolder: 'public',
    defaultView: 'index.html',
    viewContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express App</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to Your Express App</h1>
            <p class="subtitle">Static HTML with Express</p>
        </header>
        
        <main>
            <section class="hero">
                <h2>Getting Started</h2>
                <p>Edit <code>public/index.html</code> to customize this page.</p>
                <div class="features">
                    <div class="feature-card">
                        <i data-lucide="rocket" class="icon"></i>
                        <h3>Fast Setup</h3>
                        <p>Get started quickly with a pre-configured structure</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="package" class="icon"></i>
                        <h3>Organized</h3>
                        <p>Clean folder structure for scalable applications</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="palette" class="icon"></i>
                        <h3>Styled</h3>
                        <p>Beautiful default styles to build upon</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer>
            <p>Created with quick-ejs</p>
        </footer>
    </div>
    <script src="/js/app.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`
  }
};
