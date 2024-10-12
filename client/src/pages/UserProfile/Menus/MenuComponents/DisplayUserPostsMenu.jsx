/* eslint-disable react/prop-types */
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deletePostDetails,
  editPostDetails,
  togglePostDeleteDialogbox,
  togglePostEditDialogbox,
} from "../../../../slices/userProfileSlice";

const DisplayUserPostsMenu = ({ _id, postBy, post, postOn }) => {
  const dispatch = useDispatch();
  const openEditPopUp = () => {
    dispatch(togglePostEditDialogbox(true));
    dispatch(editPostDetails({ _id, postBy, post }));
  };
  const openDeletePopUp = () => {
    dispatch(togglePostDeleteDialogbox(true));
    dispatch(deletePostDetails({ _id, postBy, post }));
  };

  return (
    <div className="flex flex-col justify-between py-2 shadow-lg border my-2">
      <div className="flex flex-col gap-1  p-2">
        <span className="text-lg font-semibold">{postBy}</span>
        <span className="text-xs font-light">{postOn}</span>
      </div>
      <p className="text-base text-gray-800 p-2">{post}</p>

      <div className="flex items-center justify-end px-5 gap-3">
        <div
          className="flex gap-2 items-center px-4 py-2 border cursor-pointer shadow-md hover:text-gray-800 border-gray-700 text-gray-700"
          onClick={openEditPopUp}
        >
          <BsPencilSquare /> <span>Edit</span>
        </div>
        <div
          className="flex gap-2 items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          onClick={openDeletePopUp}
        >
          <MdDelete /> <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default DisplayUserPostsMenu;
