import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log("current", currentUser);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Danbane</span>
            <span className="text-green-400">Estate</span>
          </h1>
        </Link>

        {currentUser && (
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64 md:w-64"
            />
            <FaSearch className="text-slate-500" />
          </form>
        )}

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 underline-animation ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 underline-animation ">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="Profile"
              />
            ) : (
              <li className="text-slate-700 underline-animation ">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
