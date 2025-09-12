
import express from 'express';
const router = express.Router();

import { authMiddleware } from '../middlewares/authMIddleware';

import { register,login,logout } from '../controllers/auth';
import {updateProfile, uploadProfile, userProfile} from '../controllers/user'

router.post('/auth/register',register)
router.post('/auth/login',login)
router.post('/auth/logout',logout)

router.get('/user/profile',authMiddleware,userProfile)
router.post('/user/updateProfile',authMiddleware,updateProfile)
router.post('/user/profileUpload',uploadProfile)

export default router;
