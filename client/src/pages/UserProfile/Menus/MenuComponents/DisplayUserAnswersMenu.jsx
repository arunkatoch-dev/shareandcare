/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteAnswerDetails,
  editAnswerDetails,
  toggleAnswerEditDialogbox,
  toggleDeleteAnswerDialogBox,
} from "../../../../slices/userProfileSlice";
const userEmail = localStorage.getItem("userEmail");
const DisplayUserAnswersMenu = ({
  id,
  question,
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

  const openDeletePopUp = (answer, answerId) => {
    dispatch(toggleDeleteAnswerDialogBox(true));
    dispatch(
      deleteAnswerDetails({
        questionId: id,
        question: question,
        answer,
        answerId,
      })
    );
  };

  const openEditPopUp = (answerId, answer) => {
    dispatch(toggleAnswerEditDialogbox(true));
    dispatch(editAnswerDetails({ questionId: id, answerId, answer, question }));
  };
  return (
    <div className="w-full flex flex-col bg-gray-100 rounded-md p-2 my-2 shadow-lg">
      <div className="w-full flex items-center justify-between pb-4">
        <div className="flex gap-2">
          <span className="font-bold text-lg">Que- </span>
          <p className="text-lg font-semibold">{question}</p>
        </div>

        <div className="w-1/5 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {questionBy}
          </span>
          <span className="text-xs font-extralight">{questionOn}</span>
        </div>
      </div>

      <div className="w-full relative">
        {answers.length >= 1 && (
          <>
            <div
              className={
                showAllAnswers ? "hidden" : "flex flex-col justify-between"
              }
            >
              <div className="flex gap-2">
                <span className="font-bold text-base">Ans-</span>
                <p className="text-base text-gray-800">{answers[0].answer}</p>
              </div>
              <div className="flex flex-col gap-1 justify-end items-end p-2">
                <span className="text-sm font-semibold text-gray-900">
                  {answers[0].answerBy}
                </span>
                <span className="text-xs font-light">
                  {answers[0].answerOn}
                </span>
                {answers[0].answerByUserId === userEmail && (
                  <div className="flex gap-3">
                    <div
                      className="flex gap-2 items-center px-4 py-2 border cursor-pointer shadow-md hover:text-gray-800 border-gray-700 text-gray-700"
                      onClick={() => {
                        const currAnsUserId = answers[0]._id;
                        const currAns = answers[0].answer;
                        openEditPopUp(currAnsUserId, currAns);
                      }}
                    >
                      <BsPencilSquare /> <span>Edit</span>
                    </div>
                    <div
                      className="flex gap-2 items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                      onClick={() => {
                        const currAns = answers[0].answer;
                        const currAnsUserId = answers[0]._id;

                        openDeletePopUp(currAns, currAnsUserId);
                      }}
                    >
                      <MdDelete /> <span>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={showAllAnswers ? "w-full flex-col" : "hidden"}>
              {answers &&
                answers?.map((currAnswer) => {
                  const { _id, answer, answerBy, answerOn, answerByUserId } =
                    currAnswer;
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
                        {answerByUserId === userEmail && (
                          <div className="flex gap-3">
                            <div
                              className="flex gap-2 items-center px-4 py-2 border cursor-pointer shadow-md hover:text-gray-800 border-gray-700 text-gray-700"
                              onClick={() => {
                                openEditPopUp(_id, answer);
                              }}
                            >
                              <BsPencilSquare /> <span>Edit</span>
                            </div>
                            <div
                              className="flex gap-2 items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                              onClick={() => {
                                openDeletePopUp(answer, answerByUserId);
                              }}
                            >
                              <MdDelete /> <span>Delete</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="w-full flex items-center gap-2 justify-end p-2">
              <span
                className={
                  answers?.length > 1
                    ? "text-sm text-black hover:text-gray-700 cursor-pointer"
                    : "hidden"
                }
                onClick={toggleShowAllAnswersDisplay}
              >
                {showAllAnswers ? "Show Less" : "Show All Answers"}
              </span>
            </div>
          </>
        )}

        {answers?.length < 1 ? (
          <div className="w-full flex items-center gap-2 justify-end p-2">
            <span className="flex items-center justify-center text-sm font-light">
              No Answer Found
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DisplayUserAnswersMenu;
