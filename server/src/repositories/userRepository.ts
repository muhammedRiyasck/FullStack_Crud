import BaseRepository from "./baseRepository";
import userModel from "../models/user.model";
import IUser from '../types/Schema'

 class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(userModel);
  }
  async findAll(): Promise<IUser[]> {
    return await userModel.find({role:'user'});
  }
 
}


export default new UserRepository
