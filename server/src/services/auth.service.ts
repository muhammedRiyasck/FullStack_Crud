import {RegisterDTO,LoginDTO} from '../dtos/auth.dtos'
import { Response } from 'express'
import UserRepository from '../repositories/userRepository'
// import AdminRepository from '../repositories/adminRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class AuthService {

    static async register(dto: RegisterDTO) {
        console.log('reached auth service')
        const {email,password} = dto
        const UserExist = await UserRepository.findOne(email) 
        if(UserExist){
            return {error:'user already exists'}
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await UserRepository.create({ name: dto.name, email: dto.email, password: hashedPassword })
        return { message: 'Registration successful' };
    }

    static async login(dto: LoginDTO):Promise<{message:string,token?:string,userData?:any}>{

            const {email,password} = dto
            let user = await UserRepository.findOne(email) 
            
            if(!user || !(await bcrypt.compare(password,user.password))){
                return {message: 'user not found or password is incorrect'};
            }
            let userData = await UserRepository.updateLoggedCount(user.id)
            console.log(userData,'userData')
            const token = jwt.sign({id:user._id,role:user.role},JWT_SECRET,{ expiresIn: '1h' })
            return { message: 'Login successful', token,userData };
         
    }

    static logoutUser(res:Response): void {
        console.log('logout')
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        });

        
    }
}


export {AuthService}
