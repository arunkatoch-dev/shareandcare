import { FaEdit, FaRegQuestionCircle, FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePostsWindowReducer,
  toggleQueNdPostWindowReducer,
} from "../../../../slices/homepageSlice";

const AskQuestionPrompt = () => {
  const dispatch = useDispatch();
  const { profilePhoto } = useSelector((state) => state.authSlice);
  const expandWindow = (e) => {
    e.preventDefault();
    dispatch(togglePostsWindowReducer(true));
    dispatch(
      toggleQueNdPostWindowReducer({
        addQuestionWindow: true,
        addPostWindow: false,
      })
    );
  };
  const openPostWindow = (e) => {
    e.preventDefault();
    dispatch(togglePostsWindowReducer(true));
    dispatch(
      toggleQueNdPostWindowReducer({
        addQuestionWindow: false,
        addPostWindow: true,
      })
    );
  };

  return (
    <div className="w-full sm:w-[85%] sm:my-4 flex flex-col p-2 border rounded-md">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full hover:shadow-md ">
          <img
            src={profilePhoto || "./useravatar.png"}
            alt="userImg"
            loading="lazy"
            className="w-full h-full rounded-full"
          />
        </div>
        <div
          className="w-full px-2 border rounded-xl text-base flex items-center text-gray-500 hover:bg-gray-100 cursor-pointer font-light"
          onClick={expandWindow}
        >
          What do you want to ask or share?
        </div>
      </div>
      <div className="w-full flex items-center justify-evenly mt-3">
        <div
          className="flex items-center justify-center gap-2 cursor-pointer text-base text-gray-600"
          onClick={expandWindow}
        >
          <FaRegQuestionCircle /> <span>Ask</span>
        </div>
        <span className="text-gray-500">|</span>
        <div
          className="flex items-center justify-center gap-2 cursor-pointer text-base text-gray-600"
          onClick={expandWindow}
        >
          <FaEdit />
          <span>Answer</span>
        </div>
        <span className="text-gray-500">|</span>
        <div
          className="flex items-center justify-center gap-2 cursor-pointer text-base text-gray-600"
          onClick={openPostWindow}
        >
          <FaPen />
          <span>Post</span>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPrompt;
