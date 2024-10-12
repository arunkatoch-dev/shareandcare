/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  answerUpdation,
  toggleAnswerEditDialogbox,
} from "../../../../../slices/userProfileSlice";

const EditAnswerPopup = () => {
  const { answerToEditDetails } = useSelector(
    (state) => state.userProfileSlice
  );
  const dispatch = useDispatch();
  const { questionId, question, answer, answerId } = answerToEditDetails;
  const [toEditInputVal, setToEditInputVal] = useState(answer);
  const onInputChangeHandler = (e) => {
    e.preventDefault();
    setToEditInputVal((toEditInputVal) => e.target.value);
  };

  const closeEditWindow = () => {
    dispatch(toggleAnswerEditDialogbox(false));
  };

  const updateAnswer = (e) => {
    e.preventDefault();
    if (toEditInputVal.length <= 5) {
      return window.alert("Answer length is too short");
    }
    dispatch(answerUpdation({ questionId, answerId, answer: toEditInputVal }));
  };
  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <div className="sm:w-[40%] w-full bg-white rounded-lg flex flex-col p-5">
        <div className="flex flex-col py-3 gap-1">
          <div className="flex gap-2">
            <span className="sm:text-lg text-sm font-bold">Question:</span>
            <span className="sm:text-lg text-sm font-semibold">{question}</span>
          </div>
          <textarea
            type="text"
            className="sm:text-base text-sm font-light border-b border-b-blue-500 outline-none py-2"
            name="editAnswer"
            value={toEditInputVal}
            autoComplete="off"
            onChange={onInputChangeHandler}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-red-600">Confirm Changes ?</span>
          <div className="flex gap-2 pr-4">
            <div
              className="px-4 py-2 flex text-sm sm:text-base gap-2 items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
              onClick={updateAnswer}
            >
              Yes <FaCheck />
            </div>
            <div
              className="px-4 py-2 text-sm sm:text-base gap-2 flex items-center justify-center rounded-md border cursor-pointer hover:shadow-lg border-gray-500 hover:bg-gray-100"
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

export default EditAnswerPopup;
