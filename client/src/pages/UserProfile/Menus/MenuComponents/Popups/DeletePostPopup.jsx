import { FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostByUser,
  togglePostDeleteDialogbox,
} from "../../../../../slices/userProfileSlice";

const DeletePostPopup = () => {
  const dispatch = useDispatch();
  const { postToDeleteDetails } = useSelector(
    (state) => state.userProfileSlice
  );
  const { post, _id, postBy } = postToDeleteDetails;

  const closeDeletePopup = (e) => {
    e.preventDefault();
    dispatch(togglePostDeleteDialogbox(false));
  };
  const onDeleteComfirm = (e) => {
    e.preventDefault();
    dispatch(deletePostByUser({ _id }));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <div className="sm:w-[60%] w-full h-[80%] bg-white rounded-lg flex flex-col p-5 overflow-y-auto">
        <div className="flex flex-col py-2 gap-1">
          <div className="flex flex-col  gap-2">
            <span className="sm:text-lg text-base font-bold">{postBy}</span>
            <span className="sm:text-base text-sm">{post}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-red-600 sm:text-base text-sm">
            Are you sure to delete?
          </span>
          <div className="flex gap-2 pr-4">
            <div
              className="px-4 py-2 flex gap-2 items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
              onClick={onDeleteComfirm}
            >
              Yes <FaCheck />
            </div>
            <div
              className="px-4 py-2 gap-2 flex items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
              onClick={closeDeletePopup}
            >
              No <IoCloseOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostPopup;
