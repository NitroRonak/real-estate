import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser, getUserListings, updateUser } from '../controllers/userController.js';
const router=express.Router();
router.post('/update/:id',verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser);
router.get('/listings/:id',verifyUser,getUserListings);
export default router