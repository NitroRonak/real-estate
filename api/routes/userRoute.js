import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser, updateUser } from '../controllers/userController.js';
const router=express.Router();
router.post('/update/:id',verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser);
export default router