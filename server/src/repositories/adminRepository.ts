// import BaseRepository from "./baseRepository";
// import IAdmin from "../types/Schema";
// import AdminModel from '../models/user.model'


//  class AdminRepository extends BaseRepository<IAdmin> {
//     constructor() {
//       super(AdminModel);
//     }
//     async findAll(): Promise<IAdmin[]> {
//         return await AdminModel.find();
//     }

//     async  isAdmin(email:string):Promise<boolean>{
//       const data = await AdminModel.findOne({email})
//       return data?.email==email
//     }
//   }

//   export default new AdminRepository
