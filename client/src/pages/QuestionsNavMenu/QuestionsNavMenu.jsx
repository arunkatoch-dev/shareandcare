import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import SpinnerCircularLoader from "../../components/loaders/SpinnerCircularLoader";
import { lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchHomepageFeed } from "../../slices/homepageSlice";
import BounceCircular from "../../components/loaders/BounceCircular";
import EndMsg from "../Home/MainBody/EndMsg/EndMsg";

const DisplayQuestionsFeed = lazy(() =>
  import("../Home/MainBody/HomepageFeedComponents/DisplayQuestionsFeed")
);
const CreatePostPopUp = lazy(() =>
  import("../Home/CreatePostPopUp/CreatePostPopUp")
);
const AddAnswerPopup = lazy(() =>
  import("../Home/AddAnswerPopup/AddAnswerPopup")
);

const QuestionsNavMenu = () => {
  const { togglePostsWindow, toggleAddAnswerWindow, homepageFeedData } =
    useSelector((state) => state.homepageSlice);

  const { defaultPage, hasMore } = useSelector((state) => state.homepageSlice);

  const dispatch = useDispatch();
  const fetchMoreData = () => {
    dispatch(fetchHomepageFeed({ defaultPage }));
  };

  return (
    <>
      <Navbar />
      <section className="sm:w-1/2 w-full flex mx-auto flex-col min-h-screen items-center border">
        <div className="w-full flex py-4 px-2 border-b">
          <span className="text-2xl text-red-700 font-bold">
            Questions For You:
          </span>
        </div>
        <div className="w-full p-2">
          <InfiniteScroll
            dataLength={homepageFeedData.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<BounceCircular />}
            endMessage={<EndMsg />}
          >
            {homepageFeedData?.map((feeds) => {
              const { _id, question, answers, questionBy, dateStamp } = feeds;
              return (
                <div key={_id}>
                  {question && (
                    <Suspense fallback={<SpinnerCircularLoader />}>
                      <DisplayQuestionsFeed
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
        </div>
      </section>
      {togglePostsWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <CreatePostPopUp />
        </Suspense>
      )}
      {toggleAddAnswerWindow && (
        <Suspense fallback={<SpinnerCircularLoader />}>
          <AddAnswerPopup />
        </Suspense>
      )}
    </>
  );
};

export default QuestionsNavMenu;
