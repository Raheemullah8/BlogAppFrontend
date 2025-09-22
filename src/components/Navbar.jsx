import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt,FaDashcube } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuth = useSelector((state)=> state.auth.isAuthenticated)

  
  


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
        {!isAuth ? (
          <div className="flex gap-2">
            <Link to={'/login'}><button className="btn btn-info">Login</button></Link>
            <button className="btn btn-success">Register</button>
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
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-gray-700 rounded-box z-[1] mt-3 w-40 p-2 shadow"
            >
              <li>
                <Link to={'/profile'} className="justify-between">
                  <FaUserCircle/>Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={'/admin'}><MdDashboard/>Dashboard</Link>
              </li>
              <li className="bg-red-500 rounded text-white">
                <Link to={"#"}><FaSignOutAlt/>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
