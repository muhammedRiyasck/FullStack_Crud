import mongoose from "mongoose";
import  IAdmin  from "../types/Schema";

const userSchema = new mongoose.Schema<IAdmin>(
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
    role: {
      type: String,
      default: 'user',
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Admin", userSchema);
export default User;
