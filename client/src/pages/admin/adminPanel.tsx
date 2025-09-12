import { Pencil, Trash2, Plus } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { logout } from "../../utils/logOut";
import { useDispatch,useSelector } from "react-redux";
import { setALLUsers, deleteUser } from "../../context/adminSlice";

import Searchbar from "../../components/SearchBar";

import default_Profile from '../../assets/defualt_profile.svg'

import IUser from '../../types/user'
import { toast } from "sonner";
import { filterUsers } from "../../utils/filterUsers";

export default function AdminPanel() {
  const [search,setSearch] = useState<string>("");

  const dispatch = useDispatch();
  const naviage = useNavigate();
  
  const allUserData = useSelector((store: {adminReducer: {  users: any } }) => store.adminReducer.users);

  const filteredUsers = filterUsers(allUserData,search)
  
  const handleEditUser = async(userId:string)=>{
      naviage(`/editUser/${userId}`)
  }

  const handleDeleteUser = async(userId:string,name:string)=>{
    const confirmation = confirm('do you want to delete  ' + name.toUpperCase() + '?' );

    if(confirmation){
    const response = await axios.delete(`/admin/deleteUser/${userId}`);
    dispatch(deleteUser(response.data))
    toast.success('User '+response.data.name+' Account Deleted Successfuly')
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/fetchAllUsers");
        // setUsersData(response.data);
        dispatch(setALLUsers(response.data))
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold ">Admin Panel</h2>
        {/* <SearchBar/> */}
        <Link to="/addUser">
          <button className="flex gap-2 cursor-pointer border-2 px-5 rounded-2xl bg-blue-400 hover:bg-blue-500">
            <Plus size={20} /> Add
          </button>
        </Link>
        <button
          onClick={() => logout(dispatch, naviage)}
          className="flex gap-2 cursor-pointer border-2 px-5 rounded-2xl bg-red-400 hover:bg-red-500"
        >
          Logout
        </button>
      </div>
      <Searchbar search={search} setSearch={setSearch}/>
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full min-w-[600px] text-sm text-left">
          <thead className="bg-blue-300 text-gray-700">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Bio</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3 ">Edit</th>
              <th className="px-4 py-3 ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length?filteredUsers?.map((item:IUser, index:number) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3"><img className="w-12 h-12 rounded-full object-cover border" src={item.profileUrl?item.profileUrl:default_Profile} alt="" /></td>
                <td className="px-4 py-3 ">{item.name}</td>
                <td className="px-4 py-3 ">{item.bio ? item.bio : <span className="text-red-500">Not Provided</span> }</td>
                <td className="px-4 py-3 ">
                  {item.dob ? item.dob.split("T")[0] : <span className="text-red-500">Not Provided</span>}
                </td>

                <td className="px-4 py-3 ">
                  <button  onClick={()=>handleEditUser(item._id)} className="cursor-pointer">
                    <Pencil size={16} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={()=>handleDeleteUser(item._id,item.name)} className="text-red-500 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            )):<tr ><td colSpan={4} className="text-red-600 px-4 py-3 text-2xl ">No User Found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
);
}
