/* eslint-disable no-unused-vars */
import Logo from "../../components/logo/Logo";
import SalyLeft from "../../assets/Saly-3.png";
import SalyRight from "../../assets/Saly-2.png";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SignupValidationSchema from "../../schemas/SignupValidationSchema";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
const Signup = () => {
  const [passwordType, setPasswordType] = useState("password");
  const watchPasswordFunc = (e) => {
    e.preventDefault();
    passwordType === "password"
      ? setPasswordType((passwordType) => "text")
      : setPasswordType((passwordType) => "password");
  };
  const { isSignUpPending } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();

  return (
    <>
      <div className="w-screen h-screen bg-[#ECBC76]  lg:bg-transparent lg:w-full lg:min-h-[900px] flex flex-col lg:flex-row  lg:relative">
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
        {/* Registration menu */}
        <div className="w-[326px] mx-auto lg:mx-0 lg:w-[539px] h-[741px] flex flex-col rounded-xl shadow-2xl bg-white lg:absolute left-[35%] top-[79px] p-7 ">
          <div className="w-full flex items-center justify-between">
            <span className="text-[20px]">
              Welcome to <span className="text-[#E48700]">Share & Care</span>{" "}
            </span>
            <div className="flex flex-col">
              <span className="text-base text-[#8d8d8d]">
                Have and Account ?
              </span>
              <Link to="/login" className="text-base text-[#b87514]">
                Sign In
              </Link>
            </div>
          </div>
          <span className="lg:text-[45px] xl:text-[55px] font-medium">
            Sign up
          </span>

          <Formik
            initialValues={{
              email: "",
              userName: "",
              password: "",
            }}
            validationSchema={SignupValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { email, userName, password } = values;
              setTimeout(() => {
                dispatch(registerUser({ email, userName, password }));
                setSubmitting(false);
                resetForm();
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8" autoComplete="off">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base">
                    Enter your email address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    title="Enter your email eg. example123@gmail.com"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="text-sm px-3 py-4 border rounded-md outline-[#4285F4]"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-700 flex items-center justify-center py-2"
                />

                <div className="flex flex-col gap-2 mt-8">
                  <label htmlFor="userName" className="text-base">
                    user name
                  </label>
                  <div className="flex items-center justify-between  border rounded-md">
                    <Field
                      type="text"
                      id="userName"
                      name="userName"
                      title="Enter your unique user Name eg.Shiva001"
                      placeholder="User name"
                      className="text-sm w-full px-3 py-4 outline-[#4285F4]"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="text-sm text-red-700 flex items-center justify-center py-2"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-8">
                  <label className="text-base">Enter your Password</label>
                  <div className="flex items-center justify-between  border rounded-md">
                    <Field
                      type={passwordType}
                      name="password"
                      title="Create a Strong Password which contains minimum eight characters, at least one letter, one number and one special character"
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
                <button
                  type="submit"
                  disabled={isSubmitting || isSignUpPending}
                  className="w-full my-10 rounded-md bg-[#E48700] text-base shadow-lg py-4 text-white"
                >
                  {isSubmitting || isSignUpPending
                    ? "Signing Up..."
                    : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
