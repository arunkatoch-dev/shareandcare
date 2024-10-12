import { FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnswerByUser,
  toggleDeleteAnswerDialogBox,
} from "../../../../../slices/userProfileSlice";

const DeleteAnswerPopup = () => {
  const dispatch = useDispatch();
  const { answerToDeleteDetails } = useSelector(
    (state) => state.userProfileSlice
  );
  const { questionId, question, answer, answerId } = answerToDeleteDetails;

  const closeDeletePopup = (e) => {
    e.preventDefault();
    dispatch(toggleDeleteAnswerDialogBox(false));
  };
  const onDeleteComfirm = (e) => {
    e.preventDefault();
    dispatch(deleteAnswerByUser({ _id: questionId, answerId }));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <div className="sm:w-[40%] w-full bg-white rounded-lg flex flex-col p-5">
        <div className="flex flex-col py-2 gap-1">
          <div className="flex  gap-2">
            <span className="text-lg font-bold">Que:</span>
            <span className="text-base">{question}</span>
          </div>
          <div className="flex mt-3 gap-2">
            <span className="sm:text-lg text-sm font-bold">Ans:</span>
            <span className="sm:text-base text-xs font-light">{answer}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-red-600 sm:text-base text-xs">
            Are you sure to delete?
          </span>
          <div className="flex gap-2 pr-4">
            <div
              className="px-4 py-2 text-sm sm:text-base flex gap-2 items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
              onClick={onDeleteComfirm}
            >
              Yes <FaCheck />
            </div>
            <div
              className="px-4 py-2 text-sm sm:text-base gap-2 flex items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
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

export default DeleteAnswerPopup;
