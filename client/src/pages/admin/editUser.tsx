import {  useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { toast } from "sonner";
import { isValid } from "../../utils/validation";
import axios from "../../services/axios";
import { useSelector } from "react-redux";
import IUser from '../../types/user'

export default function AddUserForm() {
  const Users = useSelector((store: {adminReducer: {  users: any } }) => store.adminReducer.users);
  const {userId} = useParams()
  const editUser = Users.find((user:IUser)=>user._id===userId)
  
  const [name, setName] = useState(editUser.name);
  const [email, setEmail] = useState(editUser.email);
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate()


  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      
      e.preventDefault()
      let Status = isValid(email, name);
      setErrors(Status);
  
      if (!Status.email && !Status.name) { 
        const userId = editUser._id
        await axios.put('/admin/editUser',{name,email,userId})
      //  console.log(response.data)
        navigate('/adminDashboard',{replace:true})
      
      }else{
      if (errors.name) {
        toast.error(errors.name);
      } else if (errors.email) {
        toast.error(errors.email);
      } else {
        toast.error("Please fill in all fields correctly.");
      }
    };
    } catch (error:any) {
      toast.error(error.response.data.error)     
    }
}

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Link
        to="/adminDashboard"
        className=" gap-2 cursor-pointer flex justify-center w-1/12  border-2 px-5 rounded-2xl bg-blue-400 hover:bg-blue-500"
      >
        Back
      </Link>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-black rounded-lg p-10 shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 mb-9 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Edit User Account</h2>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Full Name
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                value={name}
                type="text"
                required
                autoComplete="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                value={email}
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-white-600 sm:text-sm/6"
              />
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              EDIT USER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
