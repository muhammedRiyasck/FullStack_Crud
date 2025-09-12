import { Link } from "react-router-dom";
import Header from "../../components/Header";
import profile_icon from '../../assets/defualt_profile.svg'
import { useSelector } from "react-redux";
const Profile = () => {
  const userData = useSelector((store: {userReducer: {  userData: any } }) => store.userReducer.userData);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     
     <Header/>

      {/* Main Content */}
      <main className="py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">View Profile</h1>

        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Photo */}
            <img
              src={userData.profileUrl?userData.profileUrl:profile_icon}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500"
            />

            {/* User Info */}
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
              </div>
              <div className="flex gap-10">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-md text-gray-800">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-md text-gray-800">{userData.dob?userData.dob.split('T')[0]:'Not Provided'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-md text-gray-700">
                  {userData.bio?userData.bio:'Not Provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-6 text-right">
            <Link to='/editProfile' className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
