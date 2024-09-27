import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import passport from 'passport';
import config from '../config';
import jwt from 'jsonwebtoken';
import '../middleware/passport';
import { validationResult } from 'express-validator';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: any, res: any) {
    try {
      const error = validationResult(req);

      if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
      }
      else{
        const user = await this.authService.register(req.body);
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async login(req: Request, res: Response) {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, config.JWT_SECRET || '', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token });
    })(req, res);
  }
}
