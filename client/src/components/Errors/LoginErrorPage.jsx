import { NavLink } from "react-router-dom";

const LoginErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2 backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <span className="text-2xl text-white">Oops Some error occured</span>
      <span className="text-white ">
        Try to login again or refresh the page
      </span>
      <div className="px-4 py-2 flex items-center justify-center bg-red-600 text-white hover:bg-red-500 hover:shadow-md">
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default LoginErrorPage;
