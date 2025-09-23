import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt, FaDashcube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navgate = useNavigate();
  const handleSubmit = () => {
    dispatch(Logout())
    toast.success("Logout Successful")
    navgate('/login')

  }

  return (
    <div className="navbar bg-base-300 lg:py4 lg:px-5 md:py4 md:px-5 sm:py-2 shadow-sm flex items-center justify-between">
      {/* Left - Logo */}
      <div className="flex-shrink-0">
        <Link to={"/"} className="btn btn-ghost text-xl">Blogs</Link>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 flex justify-center px-3">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>

      {/* Right - Auth / Avatar */}
      <div className="flex gap-2">
        {!isAuthenticated ? (
          <div className="flex gap-2">
            <Link to={'/login'}><button className="btn btn-info">Login</button></Link>
            <Link to={'/register'}><button className="btn btn-success">Register</button></Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profileImage || "https://placeimg.com/80/80/people"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-gray-700 rounded-box z-[1] mt-3 w-40 p-2 shadow"
            >
              <li>
                <Link className="flex flex-col px-3 py-2 rounded-md hover:bg-gray-400">
                  <span className="font-semibold text-gray-300">{user.name}</span>
                  <span className="text-sm text-gray-100">{user.email}</span>
                </Link>
              </li>

              <li>
                <Link to={'/profile'} className="justify-between">
                  <FaUserCircle />Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              {
                user.role === 'admin' && (
                  <li>
                    <Link to={'/admin'}><MdDashboard />Dashboard</Link>
                  </li>
                )
              }

              <li className="bg-red-500 rounded text-white">
                <button onClick={handleSubmit}><FaSignOutAlt />Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
