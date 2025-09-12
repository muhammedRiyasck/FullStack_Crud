import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import React,{lazy} from "react";

// import { useEffect } from "react";
// import axios from "../../services/axios";

const Home: React.FC = () => {

    const user = useSelector((store: {userReducer: {  userData: any } }) => store.userReducer.userData);

    const date = new Date(user.updatedAt)

    const formattedDate = new Intl.DateTimeFormat('en-in', {
      weekday: 'long',  // Day of the week (e.g., Monday)
      year: 'numeric',  // Full year
      month: 'long',  // Full month (e.g., April)
      day: 'numeric',  // Day of the month
      hour: '2-digit',  // Hour in 12-hour format
      minute: '2-digit',  // Minute
      second: '2-digit',  // Second
      hour12: true,  // Use 12-hour format (AM/PM)
      // timeZoneName: 'short'  // Include time zone (e.g., UTC, GMT)
    }).format(date);
    
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Welcome {user?.name}
        </h1>

        <div className="flex justify-center mb-8">
          <img src={user.profileUrl} alt="" className="w-24 h-24 rounded-full mx-auto mb-2" />
        </div>

        {/* Info Cards */}
        <div className="max-w-4xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold mb-2">Total Logins</h2>
            <p className="text-2xl font-bold">{user.loggedInCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold mb-2">Last Login</h2>
            <p className="text-2xl font-bold">{formattedDate}</p>
          </div>
          {/* <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold mb-2">Email Verified</h2>
            <p className="text-2xl font-bold">Yes</p>
          </div> */}
        </div>
        </div>
        {/* Profile Update Card */}
        <div className="bg-white p-6 rounded-2xl shadow max-w-xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">Update your profile information</h3>
          <p className="mb-6 text-sm text-gray-600">
            Ensure your profile is up to date for a better experience.
          </p>
          <Link
            to="/profile"
            className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
          >
            View Profile
          </Link>
        </div>
      </main>
    </div>
  );

  

  // const [data,setData] = useState([{name:'riyas',mark:10},{name:'jhon',mark:15},{name:'sinan',mark:12},{name:'rayan',mark:8}])
  // let userData = [{name:'riyas',mark:10},{name:'jhon',mark:15},{name:'sinan',mark:12},{name:'rayan',mark:8}]
  // type IuserData = typeof userData
  // const [data,setData] = useState(userData)
  // const handleUser = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const value = e.target.value
  //   console.log(value)  
  //   const filteredData = userData.filter((student)=>student.name.toLowerCase().includes(value.toLowerCase()))
  //   setData(filteredData)
  // }
  // return (
  //   <div className='App flex flex-col items-center justify-center min-h-screen'>
  //     <input className="border mb-4 p-2" type="text" onChange={(e)=>handleUser(e)} />
  //     {data.map((student) => {
  //       return (
  //         <div className="text-center" key={student.name}>
  //           <p>{student.name}</p>
  //           <p>{student.mark}</p>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );


};


export default Home

