import express from 'express'
const router = express.Router();

import {fetchAllUsers,addUser,editUser, deleteUser} from '../controllers/admin'

import { authMiddleware } from '../middlewares/authMIddleware';

router.get('/admin/fetchAllUsers',authMiddleware, fetchAllUsers)

router.post('/admin/addUser',authMiddleware, addUser)

router.put('/admin/editUser',authMiddleware,editUser)

router.delete(`/admin/deleteUser/:userId`,authMiddleware,deleteUser)

export default router
