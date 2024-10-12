/* eslint-disable no-unused-vars */
import { AiOutlineFork } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import FullPageLoader from "../../../components/loaders/FullPageLoader";
import LoginErrorPage from "../../../components/Errors/LoginErrorPage";
import { useSelector } from "react-redux";

const UserProfileNav = () => {
  const { isLoginPending, isLoginStatusError } = useSelector(
    (state) => state.authSlice
  );

  return (
    <>
      {isLoginPending && <FullPageLoader />}
      {isLoginStatusError && <LoginErrorPage />}
      <nav className="w-full flex items-center z-20 justify-between h-14 bg-[#ecbc76] py-2 sm:px-20 px-2  sticky top-0">
        <div className="flex items-center gap-2">
          <AiOutlineFork className="sm:text-xl text-base text-[#C6553B] font-bold" />
          <Link
            to="/"
            className={`text-[#C6553B] text-base uppercase font-bold`}
          >
            Share & Care
          </Link>
        </div>
      </nav>
    </>
  );
};

export default UserProfileNav;
