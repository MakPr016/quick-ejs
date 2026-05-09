export const defaultCSS = `:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --background-color: #0f172a;
  --surface-color: #1e293b;
  --border-color: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
  --info-color: #3b82f6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, var(--background-color), var(--surface-color));
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
  position: relative;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05), transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05), transparent 50%);
  pointer-events: none;
  z-index: 0;
}

main, header, footer, .container {
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
}

header h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

header h1:hover {
  filter: brightness(1.2);
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  font-weight: 500;
}

main {
  margin: 2rem 0;
  min-height: 400px;
}

section {
  margin-bottom: 3rem;
}

.hero {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 4rem 3rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.hero:hover {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15));
}

.hero h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.hero p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

footer {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 3rem;
  background: rgba(30, 41, 59, 0.3);
}

footer p {
  margin: 0.5rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--surface-color);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input::placeholder {
  color: var(--text-secondary);
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: linear-gradient(135deg, var(--border-color), var(--text-secondary));
}

.btn-success {
  background: linear-gradient(135deg, var(--success-color), #059669);
}

.btn-danger {
  background: linear-gradient(135deg, var(--error-color), #dc2626);
}

.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.auth-form {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.auth-form h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-form p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-weight: 500;
}

.auth-links {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.auth-links a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;
}

.auth-links a:hover {
  color: var(--secondary-color);
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.alert-success {
  background: rgba(16, 185, 129, 0.1);
  border-left-color: var(--success-color);
  color: var(--success-color);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border-left-color: var(--error-color);
  color: var(--error-color);
}

.alert-warning {
  background: rgba(245, 158, 11, 0.1);
  border-left-color: var(--warning-color);
  color: var(--warning-color);
}

.alert-info {
  background: rgba(59, 130, 246, 0.1);
  border-left-color: var(--info-color);
  color: var(--info-color);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(99, 102, 241, 0.3);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2rem;
  }

  .hero {
    padding: 2rem;
  }

  .container {
    padding: 1rem;
  }

  .auth-form {
    padding: 2rem;
  }

  .auth-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.5rem;
  }

  .hero h2 {
    font-size: 1.5rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
`;

export const defaultJS = `document.addEventListener('DOMContentLoaded', function() {
  console.log('App initialized');

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        button.textContent = 'Loading...';
        button.disabled = true;
      }
    });
  });

  if (window.lucide) {
    lucide.createIcons();
  }
});

async function apiCall(url, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'include'
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || \`HTTP error! status: \${response.status}\`);
    }

    return result;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = \`alert alert-\${type}\`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
`;

export const htmlTemplates = {
  ejs: {
    viewContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= typeof title !== 'undefined' ? title : 'Home' %></title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <%- include('partials/header') %>
    
    <div class="container">
        <main>
            <section class="hero">
                <i data-lucide="zap" style="width: 72px; height: 72px; color: var(--primary-color); margin: 0 auto 2rem; display: block;"></i>
                <h2>Welcome to your Express.js App</h2>
                <p>Built with EJS, Node.js, and modern web technologies</p>
                <p style="margin-top: 2rem; color: var(--text-secondary); font-size: 0.95rem;">
                    Edit this page in <code style="background: rgba(99, 102, 241, 0.1); padding: 0.25rem 0.75rem; border-radius: 4px;">views/index.ejs</code>
                </p>
            </section>
        </main>
    </div>

    <%- include('partials/footer') %>

    <script src="/js/app.js"></script>
    <script>
        if (window.lucide) {
            lucide.createIcons();
        }
    </script>
</body>
</html>`,
    partials: {
      header: `<header>
    <div class="container">
        <h1>MyApp</h1>
        <p class="subtitle">Built with Express.js and EJS</p>
    </div>
</header>`,
      footer: `<footer>
    <div class="container">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
        <p>Created with quick-ejs</p>
    </div>
</footer>`
    }
  },
  html: {
    viewContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <header>
        <div class="container">
            <h1>MyApp</h1>
            <p class="subtitle">Built with Express.js</p>
        </div>
    </header>
    
    <div class="container">
        <main>
            <section class="hero">
                <i data-lucide="zap" style="width: 72px; height: 72px; color: var(--primary-color); margin: 0 auto 2rem; display: block;"></i>
                <h2>Welcome to your Express.js App</h2>
                <p>A modern static HTML application with Node.js backend</p>
                <p style="margin-top: 2rem; color: var(--text-secondary); font-size: 0.95rem;">
                    Edit this page in <code style="background: rgba(99, 102, 241, 0.1); padding: 0.25rem 0.75rem; border-radius: 4px;">public/index.html</code>
                </p>
            </section>
        </main>
    </div>

    <footer>
        <p>&copy; 2024 MyApp. All rights reserved.</p>
        <p>Created with quick-ejs</p>
    </footer>

    <script src="/js/app.js"></script>
    <script>
        if (window.lucide) {
            lucide.createIcons();
        }
    </script>
</body>
</html>`,
    partials: {}
  }
};