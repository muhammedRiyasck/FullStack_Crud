import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "../../services/axios";
import { isValid } from "../../utils/validation";
import { useDispatch } from 'react-redux';
import { setUser } from "../../context/userSlice";


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Only for register
    const [errors, setErrors] = useState({ name: "" ,email: "", password: "" });
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const toggleForm = ()=>{
        setIsLogin(!isLogin);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        
        let Status = isValid(
          email,
          password,
          !isLogin ? name.trim() : undefined
        );
        setErrors(Status);

      if (!Status.email && !Status.password && !Status.name) { 
        if(!isLogin) {
            // Handle login
            try {

                const response = await axios.post("/auth/register",{name,email,password});
                if(response.status === 201) {
                    toast.success("Registration successful! Please login.");
                    setIsLogin(true);
                }

            } catch (error:any) { 
              console.log(error)
                 toast.error(error.response.data.error);
            }
        }else{
            // Handle register
            try {
              const response = await axios.post("/auth/login", { email, password });
            
              // console.log(response.data.userData, 'data after login');
              console.log(response.data.userData,'from loginRegister')
              dispatch(setUser(response.data?.userData));
            
              setTimeout(() => {
                if (response.status === 200 && response.data.userData.role === 'user') {
                  toast.success("Login Successful!");
                  navigate('/', { replace: true });
                } else if (response.status === 200 && response.data.userData.role === 'admin') {
                  toast.success("Welcome admin, Login Successful!");
                  navigate('/adminDashboard', { replace: true });
                } else {
                  console.log('Failed to login');
                }
              }, 0);
            
            } catch (error: any) {
              // toast.error(error.response.data.error);
            }
        }
      } else {
        
        if(errors.name) {
          toast.error(errors.name);
        }
        else if(errors.email) {
          toast.error(errors.email);
        }
        else if(errors.password) {
          toast.error(errors.password);
        }else{
        toast.error("Please fill in all fields correctly.");
        }
      }
    }

  return (
    <>
   
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-black rounded-lg p-10 shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 mb-9 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
          <form className="space-y-6">
            {!isLogin&&<div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  onChange={e=>setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white-600 sm:text-sm/6"
                />
              </div>
            </div>}
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={e=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
               
              </div>
              <div className="mt-1">
                <input
                  onChange={e=>setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white-600 sm:text-sm/6"
                />
              </div>
              <div className="text-sm mt-3">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={e=>handleSubmit(e)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={toggleForm} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
              {isLogin ? " Register" : " Sign in"}
            </span>
          </p>
        </div>
      </div>
      </>
  );
}

export default Login;
