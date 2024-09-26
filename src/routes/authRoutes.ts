import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import formData from '../middleware/formData';

const router = Router();
const authController = new AuthController();

router.post('/register', formData, authController.register.bind(authController));
router.post('/login',formData, authController.login.bind(authController));

export default router;