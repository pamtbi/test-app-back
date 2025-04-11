import express from 'express';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';
import {
  getUsers,
  deleteUser,
  deleteUsers
} from '../controllers/adminController.js';

const router = express.Router();

router.use(auth, isAdmin);

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.delete('/users', deleteUsers);

export default router;
