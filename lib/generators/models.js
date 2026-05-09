export function generateUserModel(useAuth = false) {
  return `import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\\S+@\\S+\\.\\S+$/, 'Please provide a valid email'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

${useAuth ? `userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};` : `userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};`}

userSchema.static('findByEmail', function(email) {
  return this.findOne({ email: email.toLowerCase() });
});

userSchema.static('findAllActive', function() {
  return this.find({ isActive: true });
});

const User = mongoose.model('User', userSchema);
export default User;`;
}

export function generateMySQLUserModel() {
  return `import db from '../config/db.js';
import bcrypt from 'bcryptjs';

class User {
  static async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, role, is_active, last_login, created_at, updated_at FROM users WHERE id = ? AND is_active = TRUE',
        [id]
      );
      return rows[0] || null;
    } catch (err) {
      console.error('Error finding user by ID:', err);
      throw err;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
        [email.toLowerCase()]
      );
      return rows[0] || null;
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  }

  static async create(user) {
    try {
      const { name, email, password, role = 'user' } = user;
      
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }

      const [result] = await db.query(
        'INSERT INTO users (name, email, password, role, is_active) VALUES (?, ?, ?, ?, TRUE)',
        [name, email.toLowerCase(), password, role]
      );

      return {
        id: result.insertId,
        name,
        email: email.toLowerCase(),
        role
      };
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }

  static async update(id, user) {
    try {
      const { name, email, password, role } = user;
      const fields = [];
      const values = [];

      if (name) {
        fields.push('name = ?');
        values.push(name);
      }
      if (email) {
        fields.push('email = ?');
        values.push(email.toLowerCase());
      }
      if (password) {
        fields.push('password = ?');
        values.push(password);
      }
      if (role) {
        fields.push('role = ?');
        values.push(role);
      }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      fields.push('updated_at = NOW()');
      values.push(id);

      await db.query(
        \`UPDATE users SET \${fields.join(', ')} WHERE id = ?\`,
        values
      );

      const updated = await this.findById(id);
      return updated;
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      await db.query(
        'UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE id = ?',
        [id]
      );
      return { message: 'User deleted successfully' };
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }

  static async findAll(limit = 50, offset = 0) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, role, is_active, last_login, created_at FROM users WHERE is_active = TRUE LIMIT ? OFFSET ?',
        [limit, offset]
      );
      return rows;
    } catch (err) {
      console.error('Error finding all users:', err);
      throw err;
    }
  }

  static async count() {
    try {
      const [rows] = await db.query(
        'SELECT COUNT(*) as total FROM users WHERE is_active = TRUE'
      );
      return rows[0].total;
    } catch (err) {
      console.error('Error counting users:', err);
      throw err;
    }
  }

  static async updateLastLogin(id) {
    try {
      await db.query(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [id]
      );
    } catch (err) {
      console.error('Error updating last login:', err);
    }
  }

  static async findByRole(role) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, role, created_at FROM users WHERE role = ? AND is_active = TRUE',
        [role]
      );
      return rows;
    } catch (err) {
      console.error('Error finding users by role:', err);
      throw err;
    }
  }

  static async search(query) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, role, created_at FROM users WHERE (name LIKE ? OR email LIKE ?) AND is_active = TRUE LIMIT 20',
        [\`%\${query}%\`, \`%\${query}%\`]
      );
      return rows;
    } catch (err) {
      console.error('Error searching users:', err);
      throw err;
    }
  }
}

export default User;`;
}