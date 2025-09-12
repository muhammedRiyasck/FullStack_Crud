import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { RegisterDTO, LoginDTO } from '../dtos/auth.dtos';
import { AuthService } from '../services/auth.service';



export const register = async(req:Request,res:Response): Promise<void> =>{
    try {
        console.log(req.body,'registering')
        const dto = Object.assign(new RegisterDTO(), req.body);
        const errors = await validate(dto);
        
        if(errors.length>0){
            console.log(errors,'errors')
            res.sendStatus(400).json({errors})
            // return res.status(400).json({errors})
        }
        let result = await AuthService.register(dto)
        if(result.error === 'user already exists'){   
             res.status(400).json({error:'This email is already registered'})
             return
        }
        res.status(201).json(result)
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async(req:Request,res:Response):Promise<any>=>{
    try {
        const dto = Object.assign(new LoginDTO(),req.body);
        const errors = await validate(dto)

        if(errors.length>0){
            return res.status(400).json({errors})
        }
        const result = await AuthService.login(dto)
        console.log(result,'login result')
        if(result.token){
            res.cookie("token", result.token, {
                httpOnly: true,  
                secure:true, 
                sameSite: "lax", 
                maxAge: 3600000 
            });
            
        // const decode = jwt.verify(result.token,JWT_SECRET) as {id:string,role:string}
        // if(result.message === 'Login successful' && decode.role==='admin'){
        //    return res.status(200).json({message:'Login successful admin',userData:result.userData})      
        // }

        if(result.message === 'Login successful'){
            // token:result.token
          res.status(200).json({message:'Login successful',userData:result.userData})
        }else{
            res.status(400).json({error:'Login failed'})
        }
    }else{
        res.status(400).json({error:'user not found or password is incorrect'})
        }
        // res.status(200).json(result);
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
}

export const logout = (req: Request, res: Response):any => {
    console.log('reached logout')
    AuthService.logoutUser(res);
    res.status(200).json({ message: 'Logged out successfully' });
    // return res.status(200).json({ message: "Logged out successfully" });
  };
