export function generateHomeController(template) {
  return `export const homeController = {
  index: (req, res) => {
    const pageTitle = 'Home';
    const message = 'Welcome to your Express app!';
    
    if ('${template}' === 'ejs') {
      res.render('index', { pageTitle, message });
    } else {
      res.sendFile('public/index.html');
    }
  },

  about: (req, res) => {
    const aboutData = {
      title: 'About Us',
      description: 'This is a modern Express.js application'
    };
    
    if ('${template}' === 'ejs') {
      res.render('about', aboutData);
    } else {
      res.json(aboutData);
    }
  }
};

export default homeController;`;
}

export function generateAuthController() {
  return `import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { name, email, password, passwordConfirm } = req.body;

      if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).render('auth/register', {
          message: 'Please provide all required fields'
        });
      }

      if (password !== passwordConfirm) {
        return res.status(400).render('auth/register', {
          message: 'Passwords do not match'
        });
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).render('auth/register', {
          message: 'Email is already registered'
        });
      }

      // Create new user
      const newUser = await User.create({ name, email, password });

      const token = generateToken(newUser.id);
      const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
      };

      res.cookie('token', token, cookieOptions);
      return res.status(201).redirect('/');
    } catch (error) {
      console.log(error);
      return res.status(400).render('auth/register', {
        message: error.message || 'Error registering user'
      });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).render('auth/login', {
          message: 'Please provide email and password'
        });
      }

      const user = await User.findByEmail(email);

      if (!user || !(await User.verifyPassword(password, user.password))) {
        return res.status(401).render('auth/login', {
          message: 'Email or password is incorrect'
        });
      }

      const token = generateToken(user.id);
      const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
      };

      res.cookie('token', token, cookieOptions);
      return res.status(200).redirect('/');
    } catch (error) {
      console.log(error);
      return res.status(400).render('auth/login', {
        message: error.message || 'Error logging in'
      });
    }
  },

  // Get profile
  profile: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Logout
  logout: (req, res) => {
    res.cookie('token', 'logout', {
      expires: new Date(Date.now() * 1000),
      httpOnly: true
    });
    return res.status(200).redirect('/');
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const user = await User.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default authController;`;
}