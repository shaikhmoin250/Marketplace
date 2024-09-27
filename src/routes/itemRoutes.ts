import { Router } from 'express';
import { ItemController } from '../controllers/itemController';
import '../middleware/passport';
import { upload } from '../middleware/upload';
import passport from 'passport';

const router = Router();
const itemController = new ItemController();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  itemController.addItem.bind(itemController)
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  itemController.editItem.bind(itemController)
);
router.get('/', itemController.getItems.bind(itemController));

export default router;
