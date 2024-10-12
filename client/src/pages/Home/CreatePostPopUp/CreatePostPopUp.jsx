import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePostsWindowReducer,
  toggleQueNdPostWindowReducer,
} from "../../../slices/homepageSlice";
import { lazy, Suspense } from "react";
import SpinnerCircularLoader from "../../../components/loaders/SpinnerCircularLoader";
const AddQuestion = lazy(() =>
  import("../../../components/CreatePosts/AddQuestion")
);
const CreatePost = lazy(() =>
  import("../../../components/CreatePosts/CreatePost")
);



const CreatePostPopUp = () => {
  const { addQuestionWindow, addPostWindow } = useSelector(
    (state) => state.homepageSlice
  );
  const dispatch = useDispatch();
  const closePopUpWindow = (e) => {
    e.preventDefault();

    dispatch(togglePostsWindowReducer(false));
  };

  const showAddQuestionWindow = (e) => {
    e.preventDefault();
    dispatch(
      toggleQueNdPostWindowReducer({
        addQuestionWindow: true,
        addPostWindow: false,
      })
    );
  };
  const showCreatePostWindow = (e) => {
    e.preventDefault();
    dispatch(
      toggleQueNdPostWindowReducer({
        addQuestionWindow: false,
        addPostWindow: true,
      })
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0">
      <div className="w-[730px] h-[400px] bg-white rounded-lg flex flex-col p-2">
        <MdClose
          className="text-2xl cursor-pointer text-gray-700"
          onClick={closePopUpWindow}
        />

        <div className="flex w-full items-center pt-4 border-b">
          <div
            className={
              addQuestionWindow
                ? `flex w-1/2 items-center justify-center  border-b-[3px] rounded-sm border-blue-600`
                : `flex w-1/2 items-center justify-center rounded-sm`
            }
          >
            <span className="cursor-pointer" onClick={showAddQuestionWindow}>
              Add Question
            </span>
          </div>
          <div
            className={
              addPostWindow
                ? `flex w-1/2 items-center justify-center  border-b-[3px] rounded-sm border-blue-600`
                : `flex w-1/2 items-center justify-center rounded-sm`
            }
          >
            <span className="cursor-pointer" onClick={showCreatePostWindow}>
              Create Post
            </span>
          </div>
        </div>
        <div className="w-full p-2  h-full">
          {addQuestionWindow && (
            <Suspense fallback={<SpinnerCircularLoader />}>
              <AddQuestion />
            </Suspense>
          )}
          {addPostWindow && (
            <Suspense fallback={<SpinnerCircularLoader />}>
              <CreatePost />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopUp;
