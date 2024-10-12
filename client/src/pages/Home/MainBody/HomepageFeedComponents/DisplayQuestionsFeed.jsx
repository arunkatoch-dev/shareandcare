/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { toggleAddAnswerWindowReducer } from "../../../../slices/homepageSlice";
import { useDispatch } from "react-redux";

const DisplayQuestionsFeed = ({
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

  const openAddAnswerWindow = (e) => {
    e.preventDefault();
    dispatch(
      toggleAddAnswerWindowReducer({
        answerWindowDisplay: true,
        questionId: id,
      })
    );
  };

  return (
    <div className="w-full flex flex-col bg-gray-100 rounded-md p-2 my-2 shadow-lg">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4">
        <div className="flex gap-2">
          <span className="font-bold text-base sm:text-lg">Que-</span>
          <p className="sm:text-lg text-base font-semibold">{question}</p>
        </div>

        <div className="sm:w-1/5 w-full flex flex-col sm:items-center sm:justify-center justify-end items-end">
          <span className="sm:text-sm text-xs font-semibold text-gray-900">
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
                <p className="text-sm sm:text-base text-gray-800">
                  {answers[0].answer}
                </p>
              </div>
              <div className="flex flex-col gap-1 justify-end items-end p-2">
                <span className="sm:text-xs text-sm font-semibold text-gray-900">
                  {answers[0].answerBy}
                </span>
                <span className="text-xs font-light">
                  {answers[0].answerOn}
                </span>
              </div>
            </div>
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
            <div className="flex px-2 gap-2">
              <span className="font-semibold test-base">Total Answers:</span>
              <span className="font-semibold test-base">{answers.length}</span>
            </div>
            <div className="w-full flex items-center gap-2 justify-between p-2">
              <div
                className="flex items-center gap-2 justify-center p-2 bg-gray-200 hover:shadow-md cursor-pointer hover:text-gray-800"
                onClick={openAddAnswerWindow}
              >
                <BsPencilSquare />
                <span>Add Answer</span>
              </div>
              <span
                className={
                  answers?.length > 1
                    ? "sm:text-sm text-xs text-black hover:text-gray-700 cursor-pointer"
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
          <div className="w-full flex items-center gap-2 justify-between p-2">
            <div
              className="flex items-center gap-2 justify-center p-2 bg-gray-200 hover:shadow-md cursor-pointer hover:text-gray-800"
              onClick={openAddAnswerWindow}
            >
              <BsPencilSquare />
              <span>Add Answer</span>
            </div>
            <span className="flex items-center justify-center text-sm font-light">
              No Answer Found
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DisplayQuestionsFeed;
