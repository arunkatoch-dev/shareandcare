import { BsPencilSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  togglePostsWindowReducer,
  toggleQueNdPostWindowReducer,
} from "../../../../slices/homepageSlice";

/* eslint-disable react/prop-types */
const DisplayPostsFeed = ({ post, postBy, postOn }) => {
  const dispatch = useDispatch();
  const openCreatePostWindow = (e) => {
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
    <div className="flex flex-col justify-between py-2 shadow-lg border my-2">
      <div className="flex flex-col gap-1  p-2">
        <span className="sm:text-lg text-base font-semibold">{postBy}</span>
        <span className="text-xs font-light">{postOn}</span>
      </div>
      <p className="sm:text-base text-sm text-gray-800 p-2">{post}</p>
      <div
        className="flex items-center gap-2 justify-center p-2 bg-gray-200 hover:shadow-sm cursor-pointer"
        onClick={openCreatePostWindow}
      >
        <BsPencilSquare />
        <span className="hover:text-gray-800">Create New Post</span>
      </div>
    </div>
  );
};

export default DisplayPostsFeed;
