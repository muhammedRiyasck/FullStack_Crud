
import { Model, Document } from "mongoose";

class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
 
  async findById(id:string): Promise<T | null> {
    return await this.model.findById(id);
  }
 
  async findOne(email:string): Promise<T | null> {
    return await this.model.findOne({email:email});
    
  }
  
  async create(data: Partial<T>): Promise<T> {
    const item = new this.model(data);
    const saved = await item.save();
    return saved
  }

  async update(id:string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async updateLoggedCount(userId:string):Promise<T|null>{
   return await this.model.findByIdAndUpdate({ _id: userId }, 
      { $inc: { loggedInCount: 1 } },{ new: true } )
     // Increment `loggedInCount` by 1
  }
  

  // async updateProfile()

  async delete(id: string): Promise<T | null> {
    return  await this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
