/* eslint-disable no-unused-vars */
import Logo from "../../components/logo/Logo";
import SalyLeft from "../../assets/Saly-3.png";
import SalyRight from "../../assets/Saly-2.png";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import LoginValidationSchema from "../../schemas/LoginValidationSchema";
import { backendURL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slices/authSlice";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const watchPasswordFunc = (e) => {
    e.preventDefault();
    passwordType === "password"
      ? setPasswordType((passwordType) => "text")
      : setPasswordType((passwordType) => "password");
  };
  const { isLoggingInLoading } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const googleLoginPage = (e) => {
    e.preventDefault();
    window.open(`${backendURL}/auth/google`, "_self");
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col bg-[#ECBC76] lg:w-full lg:min-h-[900px] lg:flex-row lg:relative lg:bg-transparent">
        <div className="lg:hidden pr-48">
          <Logo size="text-sm" />
        </div>
        <div className="hidden lg:block w-[50%] bg-[#ecbc76]">
          <Logo size="text-lg" />
          <div className="w-[269px] h-[256px] ml-[30%] mt-[193px]">
            <img
              src={SalyLeft}
              alt="Saly Left"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="hidden lg:block w-[50%] bg-[#ffff]">
          <div className="w-[269px] h-[269px] ml-[50%] mt-[85px]">
            <img
              src={SalyRight}
              alt="Saly Right"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
        </div>
        {/* Login menu */}
        <div className=" w-[326px]  lg:w-[539px] h-[741px] flex flex-col rounded-xl shadow-2xl bg-white lg:absolute left-[35%] top-[79px] p-7 mx-auto lg:mx-0">
          <div className="w-full flex items-center justify-between">
            <span className="text-lg">
              Welcome to <span className="text-[#E48700]">Share & Care</span>
            </span>
            <div className="flex flex-col">
              <span className="text-base text-[#8d8d8d]">Not Account ?</span>
              <Link to="/register" className="text-base text-[#b87514]">
                Sign Up
              </Link>
            </div>
          </div>
          <span className="text-[45px] xl:text-[55px] font-medium">
            Sign in
          </span>

          <div className="flex w-full items-center justify-evenly mt-8 lg:hidden">
            <div
              className="flex items-center justify-center gap-3 p-2 lg:gap-5 lg:px-8 lg:py-4 bg-[#FFF4E3] cursor-pointer"
              onClick={googleLoginPage}
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm lg:text-base text-[#B87514]">
                Sign in with Google
              </span>
            </div>
            <div className="bg-[#F6F6F6] p-4 cursor-pointer">
              <FaFacebook className="text-blue-700 text-2xl  " />
            </div>
            <div className="bg-[#F6F6F6] p-4 cursor-pointer">
              <FaApple className="text-2xl" />
            </div>
          </div>

          <Formik
            initialValues={{
              userId: "",
              password: "",
            }}
            validationSchema={LoginValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                const { userId, password } = values;
                dispatch(userLogin({ email: userId, password }));
                setSubmitting(false);
                resetForm();
              }, 1000);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8" autoComplete="off">
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">
                    Enter your username or email address
                  </label>
                  <Field
                    type="text"
                    name="userId"
                    placeholder="Username or email address"
                    autoComplete="off"
                    className="text-sm px-3 py-4 border rounded-md outline-[#4285F4]"
                    required
                  />
                </div>
                <ErrorMessage
                  name="userId"
                  component="div"
                  className="text-sm text-red-700 flex items-center justify-center py-2"
                />
                <div className="flex flex-col gap-2 mt-10">
                  <label className="text-base">Enter your Password</label>
                  <div className="flex items-center justify-between  border rounded-md">
                    <Field
                      type={passwordType}
                      name="password"
                      placeholder="Password"
                      className="text-sm w-full px-3 py-4 outline-[#4285F4]"
                      required
                      autoComplete="off"
                    />
                    <AiOutlineEye
                      className="cursor-pointer mr-5 text-2xl"
                      onMouseDown={watchPasswordFunc}
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-700 flex items-center justify-center py-2"
                  />
                </div>
                <div className="flex w-full items-center justify-end py-3">
                  <span className="text-[#AD3113] text-[13px]">
                    Forgot Password
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoggingInLoading}
                  className="w-full my-10 rounded-md bg-[#E48700] text-base shadow-lg py-4 text-white"
                >
                  {isLoggingInLoading || isSubmitting
                    ? "Signing In..."
                    : "Sign In"}
                </button>
                <div className="hidden lg:flex w-full items-center justify-center">
                  <span className="text-base text-[#ABABAB]">OR</span>
                </div>
                <div className="hidden lg:flex w-full items-center justify-evenly mt-8">
                  <div
                    className="flex items-center justify-center gap-5 px-8 py-4 bg-[#FFF4E3] cursor-pointer"
                    onClick={googleLoginPage}
                  >
                    <FcGoogle className="text-xl" />
                    <span className="text-base text-[#B87514]">
                      Sign in with Google
                    </span>
                  </div>
                  <div className="bg-[#F6F6F6] p-4 cursor-pointer">
                    <FaFacebook className="text-blue-700 text-2xl  " />
                  </div>
                  <div className="bg-[#F6F6F6] p-4 cursor-pointer">
                    <FaApple className="text-2xl" />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
