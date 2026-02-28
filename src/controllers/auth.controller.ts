import { Request, Response } from 'express';
import { loginSchema } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const result = await AuthService.login(email, password);

    res.json({
      message: 'Login successful',
      ...result
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
