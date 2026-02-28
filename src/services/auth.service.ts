import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export class AuthService {
  static async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }
}
