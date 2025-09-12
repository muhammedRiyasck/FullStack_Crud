import {Document} from 'mongoose'
interface Schema extends Document{
    name:string;
    email:string;
    password:string;
    dob:Date;
    role:'user'|'admin';
    bio?:string
    profileUrl?:string
    isVerified?:boolean;
    createAt?:Date;
    updateAt?:Date;
    loggedInCount?:Number
}

export default Schema;

