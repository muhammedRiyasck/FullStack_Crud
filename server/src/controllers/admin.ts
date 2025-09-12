import userRepository from "../repositories/userRepository";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// import adminRepository from "../repositories/adminRepository";

export const fetchAllUsers = async (req: Request, res: Response): Promise<any> => {
  const users = await userRepository.findAll();
  res.status(200).json(users);
};

export const addUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const UserExist = (await userRepository.findOne(email));
    if (UserExist) {
      return res.status(400).json({error:'email already exist'})
    }
    const data = await userRepository.create({ name, email, password: await bcrypt.hash(password, 10) });
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async(req:Request,res:Response):Promise<any>=>{
  try{
    const {userId,name,email}= req.body
   const updatedUser = await userRepository.update(userId, { name, email})
   res.json(updatedUser)
    
 }catch(error){
     console.log(error)
  }   
 }

 export const deleteUser = async(req:Request,res:Response)=>{
  try {
    const userId = req.params.userId
    const deleted = await userRepository.delete(userId)
    // console.log(deleted,'deleted user')
    res.status(200).json(deleted)
  } catch (error) {
    
  }
 }
