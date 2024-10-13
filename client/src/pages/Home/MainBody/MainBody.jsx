import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomepageFeed } from "../../../slices/homepageSlice";
import SpinnerCircularLoader from "../../../components/loaders/SpinnerCircularLoader";
import BounceCircular from "../../../components/loaders/BounceCircular";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMsg from "./EndMsg/EndMsg";
const AskQuestionPrompt = lazy(() =>
  import("./AskQuestionPromt/AskQuestionPrompt")
);
const DisplayPostsFeed = lazy(() =>
  import("./HomepageFeedComponents/DisplayPostsFeed")
);
const DisplayQuestionsFeed = lazy(() =>
  import("./HomepageFeedComponents/DisplayQuestionsFeed")
);

const MainBody = () => {
  const homepageFeedData = useSelector(
    (state) => state.homepageSlice.homepageFeedData
  );
  const { defaultPage, hasMore } = useSelector((state) => state.homepageSlice);

  const dispatch = useDispatch();
  const fetchMoreData = () => {
    dispatch(fetchHomepageFeed({ defaultPage }));
  };
  return (
    <section className="sm:w-1/2 w-full flex p-2 sm:p-0 sm:mx-auto flex-col min-h-screen items-center">
      <Suspense fallback={<SpinnerCircularLoader />}>
        <AskQuestionPrompt />
      </Suspense>
      <div className="w-full p-2">
        <InfiniteScroll
          dataLength={homepageFeedData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<BounceCircular />}
          endMessage={<EndMsg />}
        >
          {homepageFeedData?.map((feeds) => {
            const {
              _id,
              question,
              answers,
              questionBy,
              dateStamp,
              post,
              postBy,
              postOn,
            } = feeds;
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
                {post && (
                  <Suspense fallback={<SpinnerCircularLoader />}>
                    <DisplayPostsFeed
                      id={post ? post._id : null}
                      post={post}
                      postBy={postBy}
                      postOn={postOn}
                    />
                  </Suspense>
                )}
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default MainBody;
