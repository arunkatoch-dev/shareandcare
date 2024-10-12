/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  questionUpdation,
  toggleEditDialogbox,
} from "../../../../../slices/userProfileSlice";

const EditQuestionPopup = () => {
  const { questionToEditDetails } = useSelector(
    (state) => state.userProfileSlice
  );
  const dispatch = useDispatch();
  const { questionId, question } = questionToEditDetails;
  const [toEditInputVal, setToEditInputVal] = useState(question);
  const onInputChangeHandler = (e) => {
    e.preventDefault();
    setToEditInputVal((toEditInputVal) => e.target.value);
  };

  const closeEditWindow = () => {
    dispatch(toggleEditDialogbox(false));
  };

  const updateQuestion = (e) => {
    e.preventDefault();
    if (toEditInputVal.length <= 5) {
      return window.alert("question length is too short. Try again");
    }
    dispatch(questionUpdation({ questionId, question: toEditInputVal }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <div className="sm:w-[40%] w-full bg-white rounded-lg flex flex-col p-5">
        <div className="flex flex-col py-3 gap-1">
          <span className="sm:text-lg text-base font-bold">Question:</span>
          <input
            type="text"
            className="text-base font-light border-b border-b-blue-500 outline-none py-2"
            name="editQuestion"
            value={toEditInputVal}
            autoComplete="off"
            onChange={onInputChangeHandler}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-red-600 text-sm sm:text-base">
            Confirm Changes ?
          </span>
          <div className="flex gap-2 pr-4">
            <div
              className="px-4 py-2 text-sm sm:text-base flex gap-2 items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
              onClick={updateQuestion}
            >
              Yes <FaCheck />
            </div>
            <div
              className="px-4 text-sm sm:text-base py-2 gap-2 flex items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
              onClick={closeEditWindow}
            >
              No <IoCloseOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionPopup;
