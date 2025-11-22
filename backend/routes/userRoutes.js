import express from 'express';
import { 
  getUsers, 
  updateUser, 
  saveEstablishment, 
  removeEstablishment 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/:id', updateUser);
router.post('/:email/save-establishment', saveEstablishment);
router.delete('/:email/remove-establishment', removeEstablishment);

export default router;

