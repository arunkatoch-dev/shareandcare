import { useDispatch, useSelector } from "react-redux";
import { toggleUserProfileMenusReducer } from "../../slices/homepageSlice";
import { lazy, Suspense, useEffect } from "react";
import QuestionsMenu from "./Menus/QuestionsMenu";
import AnswersMenu from "./Menus/AnswersMenu";
import PostsMenu from "./Menus/PostsMenu";
const DeleteQuestionPopup = lazy(() =>
  import("./Menus/MenuComponents/Popups/DeleteQuestionPopup")
);
const EditQuestionPopup = lazy(() =>
  import("./Menus/MenuComponents/Popups/EditQuestionPopup")
);
const DeleteAnswerPopup = lazy(() =>
  import("./Menus/MenuComponents/Popups/DeleteAnswerPopup")
);
const EditAnswerPopup = lazy(() =>
  import("./Menus/MenuComponents/Popups/EditAnswerPopup")
);
const DeletePostPopup = lazy(() =>
  import("./Menus/MenuComponents/Popups/DeletePostPopup")
);
const EditPostPopup = lazy(() =>
  import("./Menus/MenuComponents/Popups/EditPostPopup")
);
const ProfileMenu = lazy(() => import("./Menus/ProfileMenu"));

import UserProfileNav from "./NavBar/UserProfileNav";
import { checkUserLoginStatus } from "../../slices/authSlice";
import SpinnerCircularLoader from "../../components/loaders/SpinnerCircularLoader";
import { fetchUserAnswersMenuFeed, fetchUserPostsMenuFeed, fetchUserProfileMenuFeed, fetchUserQuestionMenuFeed } from "../../slices/userProfileSlice";
const menusActiveState =
  "sm:w-[25%] w-full h-full sm:text-base text-sm cursor-pointer hover:text-gray-800 border-b-2 border-b-[#C6553B] flex items-center justify-center";
const menusNonActiveState =
  "sm:w-[25%]w-full h-full  sm:text-base text-sm cursor-pointer hover:text-gray-800   flex items-center justify-center";

const UserProfile = () => {
  const {
    profileDisplay,
    questionsByYouDisplay,
    answersByYouDisplay,
    postsByYouDisplay,
  } = useSelector((state) => state.homepageSlice);
  const { profilePhoto, userName, userEmail } = useSelector((state) => state.authSlice);
  const {
    userQuestionsMenuData,
    deleteDialogWindow,
    editDialogWindow,
    deleteAnswerDialogWindow,
    defaultQuestionsMenuPage,
    defaultAnswersMenuPage,
    defaultPostsMenuPage,
    editAnswerDialogWindow,
    deletePostDialogWindow,
    editPostDialogWindow,
    defaultProfileMenuPage
  } = useSelector((state) => state.userProfileSlice);

  const dispatch = useDispatch();
  const onMenusClick = (
    profileDisplay,
    questionsByYouDisplay,
    answersByYouDisplay,
    postsByYouDisplay
  ) => {
    dispatch(
      toggleUserProfileMenusReducer({
        profileDisplay,
        questionsByYouDisplay,
        answersByYouDisplay,
        postsByYouDisplay,
      })
    );
  };
  const fetchProfileMenuFeeds = (e) => {
    e.preventDefault()
    dispatch(
      fetchUserProfileMenuFeed({
        defaultPage: defaultProfileMenuPage,
        userEmail: userEmail,
      })
    );
  }
  const fetchQuestionsMenuFeeds = (e) => {
    e.preventDefault()
    dispatch(
      fetchUserQuestionMenuFeed({
        defaultPage: defaultQuestionsMenuPage,
        userEmail: userEmail,
      })
    );
  }
  const fetchAnswersMenuFeeds = (e) => {
    e.preventDefault()
    dispatch(
      fetchUserAnswersMenuFeed({
        defaultPage: defaultAnswersMenuPage,
        userEmail: userEmail,
      })
    );
  }
  const fetchPostsMenuFeeds = (e) => {
    e.preventDefault()
    dispatch(
      fetchUserPostsMenuFeed({
        defaultPage: defaultPostsMenuPage,
        userEmail: userEmail,
      })
    );
  }

  useEffect(() => {
    dispatch(checkUserLoginStatus());
  }, []);

  return (
    <>
      <UserProfileNav />
      <section className="flex items-center justify-center">
        <div className="sm:w-2/3 w-full flex flex-col px-2 py-4 ">
          <div className="flex mt-5">
            <div className="sm:w-28 sm:h-28 h-20 w-20 flex items-center justify-center">
              <img
                src={profilePhoto || "./useravatar.png"}
                alt="user profile img"
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col px-4  justify-center gap-2">
              <span className="sm:text-2xl text-lg font-bold">{userName}</span>
              <span className="sm:text-base text-sm ">{userEmail}</span>
            </div>
          </div>
          <div className="w-full gap-3 sm:gap-0 sm:h-16 sm:flex-row flex-col  flex sm:border-b border-b-gray-400 mt-6 items-center justify-center sm:justify-between sticky top-14 bg-white z-20">
            <div
              className={
                profileDisplay ? menusActiveState : menusNonActiveState
              }
              onClick={() => onMenusClick(true, false, false, false)}
              onTouchStart={fetchProfileMenuFeeds}
            >
              Profile
            </div>
            <span className="text-base text-gray-600 hidden sm:inline">|</span>
            <div
              className={
                questionsByYouDisplay ? menusActiveState : menusNonActiveState
              }
              onClick={() => onMenusClick(false, true, false, false)}
              onTouchStart={fetchQuestionsMenuFeeds}
            >
              Questions by you ({userQuestionsMenuData?.length})
            </div>
            <span className="text-base text-gray-600 hidden sm:inline">|</span>
            <div
              className={
                answersByYouDisplay ? menusActiveState : menusNonActiveState
              }
              onClick={() => onMenusClick(false, false, true, false)}
              onTouchStart={fetchAnswersMenuFeeds}
            >
              Answers by you
            </div>
            <span className="text-base text-gray-600 hidden sm:inline">|</span>
            <div
              className={
                postsByYouDisplay ? menusActiveState : menusNonActiveState
              }
              onClick={() => onMenusClick(false, false, false, true)}
              onTouchStart={fetchPostsMenuFeeds}
            >
              Posts by you
            </div>
          </div>

          {profileDisplay && (
            <Suspense fallback={<SpinnerCircularLoader />}>
              <ProfileMenu />
            </Suspense>
          )}
          {questionsByYouDisplay && (
            <Suspense fallback={<SpinnerCircularLoader />}>
              <QuestionsMenu />
            </Suspense>
          )}
          {answersByYouDisplay && (
            <Suspense fallback={<SpinnerCircularLoader />}>
              <AnswersMenu />
            </Suspense>
          )}
          {postsByYouDisplay && (
            <Suspense fallback={<SpinnerCircularLoader />}>
              <PostsMenu />
            </Suspense>
          )}
        </div>
      </section>
      {deleteDialogWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <DeleteQuestionPopup />
        </Suspense>
      )}
      {editDialogWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <EditQuestionPopup />
        </Suspense>
      )}
      {deleteAnswerDialogWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <DeleteAnswerPopup />
        </Suspense>
      )}
      {editAnswerDialogWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <EditAnswerPopup />
        </Suspense>
      )}
      {deletePostDialogWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <DeletePostPopup />
        </Suspense>
      )}
      {editPostDialogWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <EditPostPopup />
        </Suspense>
      )}
    </>
  );
}


export default UserProfile;
