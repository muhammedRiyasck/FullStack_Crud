
import { Request, Response } from 'express';

import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() });
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
// import adminRepository from '../repositories/adminRepository';
import UserRepository from '../repositories/userRepository';

export const userProfile = async (req: Request & { user?: { id: string } }, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id; // ✅ use decoded id from middleware
    console.log('userProfilecalled')
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await UserRepository.findById(userId) 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   console.log(user,'user profile data')
   return res.status(200).json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request & { user?: { id: string } }, res: Response): Promise<any> => {
  try {
    const { name, email, dob, bio ,profileUrl } = req.body;
    const userId = req.user?.id; // ✅ get ID from req.user

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedProfile = await UserRepository.update(userId, { name, email, dob, bio, profileUrl });

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedProfile);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadProfile = [
  upload.single('photo'),
  async (req: Request, res: Response) => {
    try {
      const streamUpload = (req: Request) => {
        return new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'image',
              public_id: 'your_optional_custom_id', // Optional
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file!.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      res.json({ url: result.secure_url });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
];
