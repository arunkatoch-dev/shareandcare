/* eslint-disable no-unused-vars */
import { AiOutlineFork } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkUserLoginStatus, userLogout } from "../../slices/authSlice";
import {
  togglePostsWindowReducer,
  toggleQueNdPostWindowReducer,
} from "../../slices/homepageSlice";
import FullPageLoader from "../loaders/FullPageLoader";
import LoginErrorPage from "../Errors/LoginErrorPage";
const userName = localStorage.getItem("userName");
const navLinksStyles =
  "text-base sm:text-2xl text-gray-700 cursor-pointer hover:text-gray-600 focus:text-black active:text-black";
const Navbar = () => {
  const { loginStatus, isLoginPending, isLoginStatusError, profilePhoto } =
    useSelector((state) => state.authSlice);
  const [profileWindow, setProfileWindow] = useState("hidden");
  const expandProfile = (e) => {
    e.preventDefault();
    profileWindow === "hidden"
      ? setProfileWindow((profileWindow) => "block")
      : setProfileWindow((profileWindow) => "hidden");
  };
  const dispatch = useDispatch();
  const logOutFunc = (e) => {
    e.preventDefault();
    dispatch(userLogout());
  };
  const openAddQuestionWindow = (e) => {
    e.preventDefault();
    dispatch(togglePostsWindowReducer(true));
    dispatch(
      toggleQueNdPostWindowReducer({
        addQuestionWindow: true,
        addPostWindow: false,
      })
    );
  };

  useEffect(() => {
    dispatch(checkUserLoginStatus());
  }, []);
  return (
    <>
      {isLoginPending && <FullPageLoader />}
      {isLoginStatusError && <LoginErrorPage />}
      <nav className="w-full flex items-center z-20 justify-between h-14 bg-[#ecbc76] py-2 sm:px-20  sticky top-0">
        <div className="flex items-center gap-2 px-2">
          <AiOutlineFork className="text-sm sm:text-xl text-[#C6553B] font-bold" />
          <Link
            to="/"
            className={`text-[#C6553B] text-base uppercase font-bold`}
          >
            Share & Care
          </Link>
        </div>
        {/* Nav Links */}
        <div className="sm:w-1/3 w-[50%] flex items-center justify-evenly px-2 gap-3">
          <NavLink to="/" className={navLinksStyles}>
            <FaHome />
          </NavLink>
          <NavLink to="/questions" className={navLinksStyles}>
            <FaEdit />
          </NavLink>
          <NavLink to="/posts" className={navLinksStyles}>
            <MdOutlinePostAdd />
          </NavLink>
        </div>
        <div className="sm:flex hidden items-center">
          <input
            type="text"
            name="search-box"
            title="search here"
            className="border-none outline-none px-2 py-1 text-gray-500 text-base hover:shadow-md"
            placeholder="search here"
          />
          <div className="flex items-center justify-center bg-[#C6553B] p-1">
            <IoMdSearch className="text-2xl cursor-pointer text-white" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full hover:shadow-md mr-2 sm:mr-0">
          <img
            src={profilePhoto || "./useravatar.png"}
            alt="userImg"
            loading="lazy"
            className="w-full h-full rounded-full cursor-pointer"
            onClick={expandProfile}
          />
        </div>
        <div
          className="hidden sm:block px-12 py-2 bg-[#E48725] text-white text-base hover:bg-[#e48800] cursor-pointer"
          onClick={openAddQuestionWindow}
        >
          Ask Question?
        </div>
        <div
          className={`w-52 ${profileWindow} z-10 p-2 bg-white border shadow-xl absolute top-full sm:right-[18%] right-0`}
        >
          <div className="w-full flex flex-col border-b">
            <div className="w-8 h-8 my-2 rounded-full hover:shadow-md">
              <img
                src={profilePhoto || "./useravatar.png"}
                alt="user-img"
                loading="lazy"
                className="w-full h-full rounded-full cursor-pointer"
              />
            </div>
            <NavLink to="/userprofile">
              <div className="w-full flex items-center justify-between px-2">
                <span className="text-lg font-semibold py-2">{userName}</span>
                <span className="text-lg font-semibold py-2">&gt;</span>
              </div>
            </NavLink>
          </div>
          <div>
            {loginStatus ? (
              <div
                className="text-base sm:text-lg py-4 flex items-center justify-center cursor-pointer text-gray-700 hover:text-gray-800 font-semibold"
                onClick={logOutFunc}
              >
                Logout
              </div>
            ) : (
              <div className="flex w-full items-center justify-center gap-6">
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
