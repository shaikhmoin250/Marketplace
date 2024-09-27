import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import formData from '../middleware/formData';
import { body } from 'express-validator';

const router = Router();
const authController = new AuthController();

router.post(
  '/register',
  formData,
  body('email').isEmail().withMessage('Please enter valid email addess'),
  authController.register.bind(authController)
);
router.post('/login', formData, authController.login.bind(authController));

export default router;
