import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import updateProfile from "../../services/updateProfile";
import { setUser } from "../../context/userSlice";
import { useNavigate } from "react-router-dom";
import default_profile from "../../assets/defualt_profile.svg";

import axios from "../../services/axios";

import { PhotoUploadEvent } from "../../types/eventTypes";

export default function EditProfile() {
  const userData = useSelector((store: {userReducer: {  userData: any } }) => store.userReducer.userData);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [dob, setDob] = useState(userData.dob);
  const [bio, setBio] = useState(userData.bio);
  const [photo, setPhoto] = useState<string>(default_profile);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const navigate = useNavigate();
  // const selector = useSelector((store:{userData:any})=>store.userData)
  const dispatch = useDispatch();
  const userProfile = useSelector((state: {userReducer: {  userData: any } }) => state.userReducer.userData.profileUrl);

  useEffect(() => {
    if (userProfile) setPhoto(userProfile);
  }, [userProfile]);

  const handlePhotoUpload = async (e: PhotoUploadEvent) => {
    const file = e.target.files?.[0];
    try {
      if (file) {
        setPhoto(URL.createObjectURL(file));
        setSelectedPhotoFile(file);
      } else {
        alert("Please select a file!");
      }
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      let uploadedPhotoUrl = null;

      // ✅ If user has selected a photo, upload it first
      if (selectedPhotoFile) {
        setLoadingPhoto(true);
        const formData = new FormData();
        formData.append("photo", selectedPhotoFile);

        const response = await axios.post("/user/profileUpload", formData);
        uploadedPhotoUrl = response.data.url; // Assuming backend sends { url: '...' }
        setLoadingPhoto(false);
      }
      
      // ✅ Now update the rest of the user data
      const updatedData = await updateProfile(name, email, dob, bio, uploadedPhotoUrl??userData.profileUrl);
      console.log(updatedData,'from edit profile')
      dispatch(setUser(updatedData));
      navigate("/profile",{replace:true});
    } catch (error) {
      console.error(error);
      // Optionally show error to user
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">LOGO</h1>
        <nav className="space-x-4">
          <a href="/home" className="text-gray-700 hover:text-indigo-600">Home</a>
          <a href="/profile" className="text-gray-700 hover:text-indigo-600">Profile</a>
          <a href="/logout" className="text-gray-700 hover:text-indigo-600">Logout</a>
        </nav>
      </header> */}

      <Header />
      {loadingPhoto && (
        <div className="fixed inset-0 bg-opacity-100 flex items-center justify-center z-50">
          <div className=" w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow m-18">
        <h2 className="text-xl font-semibold text-center mb-6">Edit Profile</h2>
        <form /*onSubmit={handleSubmit}*/ className="space-y-4">
          <div className="text-center">
            <img src={photo} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-2" />
            <label className="inline-block cursor-pointer px-4 py-2 border rounded text-indigo-600 border-indigo-600 hover:bg-indigo-50">
              Upload New Photo
              <input type="file" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              // value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              value={bio}
              placeholder="write something about you"
              onChange={(e) => setBio(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
