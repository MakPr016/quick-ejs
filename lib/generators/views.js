export function generateErrorView() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Oops!</h1>
            <p class="subtitle">Something went wrong</p>
        </header>
        
        <main>
            <section class="hero">
                <i data-lucide="alert-circle" style="width: 64px; height: 64px; color: var(--primary-color); margin: 0 auto 2rem; display: block;"></i>
                <h2><%= message || 'Page not found' %></h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <div style="margin-top: 2rem;">
                    <a href="/" style="display: inline-block; background: var(--primary-color); color: white; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 500;">
                        Go Back Home
                    </a>
                </div>
            </section>
        </main>
        
        <footer>
            <p>Created with quick-ejs</p>
        </footer>
    </div>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
}

export function generateLoginView() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="auth-container">
        <div class="auth-form">
            <div style="text-align: center; margin-bottom: 2rem;">
                <i data-lucide="lock" style="width: 48px; height: 48px; color: var(--primary-color); margin: 0 auto; display: inline-block;"></i>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
            
            <form id="loginForm" action="/auth/login" method="POST">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>
                
                <button type="submit" class="btn">Sign In</button>
            </form>
            
            <div class="auth-links">
                Don't have an account? <a href="/auth/register">Sign up</a>
            </div>
        </div>
    </div>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
}

export function generateRegisterView() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="auth-container">
        <div class="auth-form">
            <div style="text-align: center; margin-bottom: 2rem;">
                <i data-lucide="user-plus" style="width: 48px; height: 48px; color: var(--primary-color); margin: 0 auto; display: inline-block;"></i>
            </div>
            <h1>Create Account</h1>
            <p>Sign up to get started with your account</p>
            
            <form id="registerForm" action="/auth/register" method="POST">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Create a strong password" required minlength="6">
                </div>
                
                <button type="submit" class="btn">Create Account</button>
            </form>
            
            <div class="auth-links">
                Already have an account? <a href="/auth/login">Sign in</a>
            </div>
        </div>
    </div>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
}
