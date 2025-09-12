import { Link ,useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../utils/logOut";

const Header = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  
  const handleLogout = () => {
    logout(dispatch, navigate);
  
  }
  return (
    <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">LOGO</div>
      {/* <img className="w-6" src='./icon.png' alt="" /> */}
      <nav className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-600 hover:font-semibold">Home</Link>
        <Link to="/profile" className="text-gray-700 hover:text-indigo-600 hover:font-semibold">Profile</Link>
        <span onClick={handleLogout} className="text-gray-700 hover:text-indigo-600 cursor-pointer hover:font-semibold">Logout</span>
      </nav>
    </div>
  </header>
  )
}

export default Header

