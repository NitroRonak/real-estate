import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { updateUser } from '../controllers/userController.js';
const router=express.Router();
router.post('/update/:id',verifyUser,updateUser);
export default router