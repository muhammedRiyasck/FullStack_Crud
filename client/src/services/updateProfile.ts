import  UserProfile  from "../types/user";
import axios from "./axios";

const updateProfile = async (name: UserProfile['name'], email: UserProfile['email'], dob: UserProfile['dob'], bio: UserProfile['bio'] ,profileUrl: UserProfile['profileUrl']): Promise<any> => {
    const response = await axios.post('/user/updateProfile', { name, email, dob, bio, profileUrl });
    return response.data;
  }
export default updateProfile
