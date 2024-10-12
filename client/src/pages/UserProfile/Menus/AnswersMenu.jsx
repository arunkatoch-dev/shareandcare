import InfiniteScroll from "react-infinite-scroll-component";
import BounceCircular from "../../../components/loaders/BounceCircular";
import EndMsg from "../../Home/MainBody/EndMsg/EndMsg";
import { lazy, Suspense } from "react";
import SpinnerCircularLoader from "../../../components/loaders/SpinnerCircularLoader";
const DisplayUserAnswersMenu = lazy(() =>
  import("./MenuComponents/DisplayUserAnswersMenu")
);
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAnswersMenuFeed } from "../../../slices/userProfileSlice";
const userEmail = localStorage.getItem("userEmail");

const AnswersMenu = () => {
  const dispatch = useDispatch();
  const {
    isAnswersMenuLoading,
    hasMoreAnswersMenuData,
    defaultAnswersMenuPage,
    userAnswersMenuData,
  } = useSelector((state) => state.userProfileSlice);

  const fetchAnswersData = () => {
    dispatch(
      fetchUserAnswersMenuFeed({
        defaultPage: defaultAnswersMenuPage,
        userEmail: userEmail,
      })
    );
  };

  return (
    <div className="w-full flex justify-center items-center border min-h-96">
      {isAnswersMenuLoading ? (
        <SpinnerCircularLoader />
      ) : (
        <InfiniteScroll
          dataLength={userAnswersMenuData.length}
          next={fetchAnswersData}
          hasMore={hasMoreAnswersMenuData}
          loader={<BounceCircular />}
          endMessage={<EndMsg />}
        >
          {userAnswersMenuData?.map((feeds) => {
            const { _id, question, answers, questionBy, dateStamp } = feeds;
            return (
              <div key={_id}>
                {question && (
                  <Suspense fallback={<SpinnerCircularLoader />}>
                    <DisplayUserAnswersMenu
                      id={_id}
                      question={question}
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

export default AnswersMenu;
