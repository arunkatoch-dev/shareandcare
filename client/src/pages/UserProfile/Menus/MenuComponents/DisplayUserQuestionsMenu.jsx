/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import {
  deleteQuestionDetails,
  toggleDeleteDialogBox,
  toggleEditDialogbox,
  editQuestionDetails,
} from "../../../../slices/userProfileSlice";
import { useDispatch } from "react-redux";

const DisplayUserQuestionsMenu = ({
  id,
  question,
  questionNumber,
  answers,
  questionBy,
  questionOn,
}) => {
  const [showAllAnswers, setShowMoreAnswers] = useState(false);
  const toggleShowAllAnswersDisplay = (e) => {
    e.preventDefault();
    setShowMoreAnswers((showAllAnswers) => !showAllAnswers);
  };
  const dispatch = useDispatch();
  const openDeletePopUp = (e) => {
    e.preventDefault();
    dispatch(toggleDeleteDialogBox(true));
    dispatch(deleteQuestionDetails({ questionId: id, question: question }));
  };

  const openEditPopUp = (e) => {
    e.preventDefault();
    dispatch(toggleEditDialogbox(true));
    dispatch(editQuestionDetails({ questionId: id, question: question }));
  };

  return (
    <div className="w-full flex flex-col bg-gray-100 rounded-md p-2 my-2 shadow-lg">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between pb-4">
        <div className="w-full flex  gap-2">
          <span className="font-bold text-base sm:text-lg">
            Que-{questionNumber + 1}
          </span>
          <p className="text-base sm:text-lg font-semibold">{question}</p>
        </div>

        <div className="sm:w-1/5 w-full flex flex-col sm:items-center items-end justify-end sm:justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {questionBy}
          </span>
          <span className="text-xs font-extralight">{questionOn}</span>
        </div>
      </div>

      <div className="w-full relative">
        {answers.length >= 1 && (
          <>
            <div className={showAllAnswers ? "w-full flex-col" : "hidden"}>
              {answers &&
                answers?.map((currAnswer) => {
                  const { _id, answer, answerBy, answerOn } = currAnswer;
                  return (
                    <div
                      className="flex flex-col justify-between py-2"
                      key={_id}
                    >
                      <div className="flex gap-2">
                        <span className="font-bold text-base">Ans-</span>
                        <p className="text-base text-gray-800">{answer}</p>
                      </div>
                      <div className="flex flex-col gap-1 justify-end items-end p-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {answerBy}
                        </span>
                        <span className="text-xs font-light">{answerOn}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="w-full flex items-center gap-2 justify-end p-2">
              <span
                className={
                  answers?.length >= 1
                    ? "text-sm text-black hover:text-gray-700 cursor-pointer"
                    : "hidden"
                }
                onClick={toggleShowAllAnswersDisplay}
              >
                {showAllAnswers ? "Show Less" : "Show Answers"}
              </span>
            </div>
          </>
        )}

        {answers?.length < 1 && (
          <div className="w-full flex items-center gap-2 justify-end p-2">
            <span className="flex items-center justify-center text-sm font-light">
              No Answer Found
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 justify-start px-4 ">
        <div
          className="flex  items-center gap-2 justify-center p-2 bg-gray-200 hover:shadow-md cursor-pointer hover:text-gray-800"
          onClick={openEditPopUp}
        >
          <BsPencilSquare />
          <span>Edit</span>
        </div>
        <div
          className="flex items-center text-sm sm:text-base gap-2 justify-center p-2 bg-red-600 hover:bg-red-700 cursor-pointer text-white rounded-md"
          onClick={openDeletePopUp}
        >
          <MdDelete />
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default DisplayUserQuestionsMenu;
