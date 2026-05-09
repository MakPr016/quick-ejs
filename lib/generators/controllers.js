export function generateHomeController(template) {
  if (template === 'ejs') {
    return `export async function getHome(req, res) {
  try {
    res.render('index', { title: 'Home' });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
}

export async function postHome(req, res) {
  try {
    res.json({ message: 'Home post request received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAllData(req, res) {
  try {
    res.json({ data: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export async function getDataById(req, res) {
  try {
    const { id } = req.params;
    res.json({ id, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export async function createData(req, res) {
  try {
    const data = req.body;
    res.status(201).json({ message: 'Data created', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create data' });
  }
}

export async function updateData(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    res.json({ message: 'Data updated', id, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update data' });
  }
}

export async function deleteData(req, res) {
  try {
    const { id } = req.params;
    res.json({ message: 'Data deleted', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
}`;
  } else if (template === 'html') {
    return `export async function getHome(req, res) {
  try {
    res.sendFile('public/index.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

export async function postHome(req, res) {
  try {
    res.json({ message: 'Home post request received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAllData(req, res) {
  try {
    res.json({ data: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export async function getDataById(req, res) {
  try {
    const { id } = req.params;
    res.json({ id, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export async function createData(req, res) {
  try {
    const data = req.body;
    res.status(201).json({ message: 'Data created', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create data' });
  }
}

export async function updateData(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    res.json({ message: 'Data updated', id, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update data' });
  }
}

export async function deleteData(req, res) {
  try {
    const { id } = req.params;
    res.json({ message: 'Data deleted', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
}`;
  } else {
    return `export async function getHome(req, res) {
  try {
    res.json({ message: 'API server is running' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function postHome(req, res) {
  try {
    res.json({ message: 'Home post request received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAllData(req, res) {
  try {
    res.json({ data: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export async function getDataById(req, res) {
  try {
    const { id } = req.params;
    res.json({ id, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

export async function createData(req, res) {
  try {
    const data = req.body;
    res.status(201).json({ message: 'Data created', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create data' });
  }
}

export async function updateData(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    res.json({ message: 'Data updated', id, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update data' });
  }
}

export async function deleteData(req, res) {
  try {
    const { id } = req.params;
    res.json({ message: 'Data deleted', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
}`;
  }
}

export function generateAuthController() {
  return `import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(newUser.id);
    res.cookie('token', token, {
      maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES || 7) * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.cookie('token', token, {
      maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES || 7) * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({ 
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed' });
  }
}

export async function getProfile(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function updateProfile(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ error: 'Provide at least one field to update' });
    }

    if (email) {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser && existingUser.id !== req.user.id) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const updatedUser = await User.update(req.user.id, updateData);

    res.json({ 
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function changePassword(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(req.user.id, { password: hashedPassword });

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
}

export async function deleteAccount(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required to delete account' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    await User.delete(req.user.id);
    res.clearCookie('token');

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Account deletion error:', err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
}`;
}