/* eslint-disable react/prop-types */
import { useState } from "react";


const DisplayUserProfileFeeds = ({
  // eslint-disable-next-line no-unused-vars
  id,
  question,
  answers,

}) => {
  const [showAllAnswers, setShowMoreAnswers] = useState(false);
  const toggleShowAllAnswersDisplay = (e) => {
    e.preventDefault();
    setShowMoreAnswers((showAllAnswers) => !showAllAnswers);
  };
  return (
    <div className="w-full flex flex-col bg-gray-100 rounded-md p-2 my-2 shadow-lg">
      <div className="w-full flex items-center justify-between pb-4">
        <div className="flex gap-2">
          <span className="font-bold text-lg">Que-</span>
          <p className="text-lg font-semibold">{question}</p>
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
            </div>
            <div className={showAllAnswers ? "w-full flex-col" : "hidden"}>
              {answers &&
                answers?.map((currAnswer) => {
                  const { _id, answer } = currAnswer;
                  return (
                    <div
                      className="flex flex-col justify-between py-2"
                      key={_id}
                    >
                      <div className="flex gap-2">
                        <span className="font-bold text-base">Ans-</span>
                        <p className="text-base text-gray-800">{answer}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="w-full flex items-center justify-end p-2">
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
          <div className="w-full flex items-center gap-2 justify-between p-2">
            <span className="flex items-center justify-center text-sm font-light">
              No Answer Found
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DisplayUserProfileFeeds;
