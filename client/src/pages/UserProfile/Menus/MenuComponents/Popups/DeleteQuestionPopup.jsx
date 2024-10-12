import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestionByUser,
  toggleDeleteDialogBox,
} from "../../../../../slices/userProfileSlice";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const DeleteQuestionPopup = () => {
  const dispatch = useDispatch();
  const { questionToDeleteDetails } = useSelector(
    (state) => state.userProfileSlice
  );
  const { questionId, question } = questionToDeleteDetails;

  const closeDeletePopup = (e) => {
    e.preventDefault();
    dispatch(toggleDeleteDialogBox(false));
  };
  const onDeleteComfirm = (e) => {
    e.preventDefault();
    dispatch(deleteQuestionByUser({ _id: questionId }));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <div className="sm:w-[40%] w-full bg-white rounded-lg flex flex-col p-5">
        <div className="flex flex-col py-3 gap-1">
          <span className="text-lg font-bold">Question:</span>
          <span className="text-base font-light">{question}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-red-600">Are you sure to delete?</span>
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

export default DeleteQuestionPopup;
