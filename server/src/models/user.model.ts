import mongoose from "mongoose";
import  Iuser  from "../types/Schema";

const userSchema = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date
    },
    role: {
      type: String,
      default: 'user',
    },
    bio:{
      type: String
    },
    profileUrl:{
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    loggedInCount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
