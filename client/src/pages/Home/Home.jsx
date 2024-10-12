/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { checkUserLoginStatus } from "../../slices/authSlice";
import Navbar from "../../components/navbar/Navbar";
import SpinnerCircularLoader from "../../components/loaders/SpinnerCircularLoader";
const AsideBar = lazy(() => import("./Aside/AsideBar"));
const RightAside = lazy(() => import("./Aside/RightAside"));
const MainBody = lazy(() => import("./MainBody/MainBody"));
const CreatePostPopUp = lazy(() => import("./CreatePostPopUp/CreatePostPopUp"));
const AddAnswerPopup = lazy(() => import("./AddAnswerPopup/AddAnswerPopup"));
const CreateSpacePopup = lazy(() => import("./Aside/Popups/CreateSpacePopup"));

const Home = () => {
  const { togglePostsWindow, toggleAddAnswerWindow } = useSelector(
    (state) => state.homepageSlice
  );
  const { createSpaceWindow } = useSelector((state) => state.userProfileSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserLoginStatus());
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex">
        <Suspense fallback={<SpinnerCircularLoader />}>
          <AsideBar />
        </Suspense>
        <Suspense fallback={<SpinnerCircularLoader />}>
          <MainBody />
        </Suspense>
        <Suspense fallback={<SpinnerCircularLoader />}>
          <RightAside />
        </Suspense>
      </div>
      {togglePostsWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <CreatePostPopUp />
        </Suspense>
      )}
      {toggleAddAnswerWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <AddAnswerPopup />
        </Suspense>
      )}
      {createSpaceWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <CreateSpacePopup />
        </Suspense>
      )}
    </>
  );
};

export default Home;
