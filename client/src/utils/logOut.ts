
import axios from "../services/axios"
import { clearUser } from "../context/userSlice"
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";


interface LogoutResponse {
    status: number;
    data: {message?: string; };
}

export const logout = async (
    dispatch: (action: any) => void,
    navigate: NavigateFunction): Promise<void> => {
    try {
        const response: LogoutResponse = await axios.post('/auth/logout',{ withCredentials: true });

        if (response.status === 200 && response.data.message) {
            dispatch(clearUser());
            navigate('/authForm', { replace: true });
            toast.success('Logout successfull')
        } else {
            console.error("Logout failed:", response.data);
        }
    } catch (error: any) {
        console.error("Error during logout:", error.message);
    }
};
