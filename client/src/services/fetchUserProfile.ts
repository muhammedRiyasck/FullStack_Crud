import { toast } from "sonner";
import axios from "./axios";

export async function fetchUserProfile(): Promise<any> {
  try {
    const response = await axios.get(`/user/profile`,{
        withCredentials:true
    });
    if (response.status!==200) {
      toast.error('something went wrong')
    }
    return response.data
  } catch (error: any) {
    console.log("Error fetching user profile:", error); 
  }
    
  }
  