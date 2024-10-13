import { lazy, Suspense } from "react";
import SpinnerCircularLoader from "../../../components/loaders/SpinnerCircularLoader";
const DisplayUserQuestionsMenu = lazy(() =>
  import("./MenuComponents/DisplayUserQuestionsMenu")
);
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserQuestionMenuFeed } from "../../../slices/userProfileSlice";
import BounceCircular from "../../../components/loaders/BounceCircular";
import EndMsg from "../../Home/MainBody/EndMsg/EndMsg";


const QuestionsMenu = () => {
  const dispatch = useDispatch();
  const { userEmail } =
    useSelector((state) => state.authSlice);
  const {
    isQuestionsMenuLoading,
    hasMoreQuestionsMenuData,
    defaultQuestionsMenuPage,
    userQuestionsMenuData,
  } = useSelector((state) => state.userProfileSlice);
  const fetchQuestionsData = () => {
    dispatch(
      fetchUserQuestionMenuFeed({
        defaultPage: defaultQuestionsMenuPage,
        userEmail: userEmail,
      })
    );
  };
  return (
    <div className="w-full flex justify-center items-center border min-h-96">
      {isQuestionsMenuLoading ? (
        <SpinnerCircularLoader />
      ) : (
        <InfiniteScroll
          dataLength={userQuestionsMenuData.length}
          next={fetchQuestionsData}
          hasMore={hasMoreQuestionsMenuData}
          loader={<BounceCircular />}
          endMessage={<EndMsg />}
        >
          {userQuestionsMenuData?.map((feeds, index) => {
            const { _id, question, answers, questionBy, dateStamp } = feeds;
            return (
              <div key={_id}>
                {question && (
                  <Suspense fallback={<SpinnerCircularLoader />}>
                    <DisplayUserQuestionsMenu
                      id={_id}
                      question={question}
                      questionNumber={index}
                      answers={answers}
                      questionBy={questionBy}
                      questionOn={dateStamp}
                    />
                  </Suspense>
                )}
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default QuestionsMenu;
