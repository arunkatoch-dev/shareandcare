import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileMenuFeed } from "../../../slices/userProfileSlice";
import { lazy, Suspense } from "react";
import SpinnerCircularLoader from "../../../components/loaders/SpinnerCircularLoader";
const DisplayUserProfilePostsFeed = lazy(() =>
  import("./MenuComponents/DisplayUserProfilePostsFeed")
);
const DisplayUserProfileFeeds = lazy(() =>
  import("./MenuComponents/DisplayUserProfileFeeds")
);
import BounceCircular from "../../../components/loaders/BounceCircular";
import EndMsg from "../../Home/MainBody/EndMsg/EndMsg";
import InfiniteScroll from "react-infinite-scroll-component";
const userEmail = localStorage.getItem("userEmail");

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const {
    isProfileMenuLoading,
    hasMoreProfileMenuData,
    defaultProfileMenuPage,
    userProfileMenuData,
  } = useSelector((state) => state.userProfileSlice);
  const fetchProfileData = () => {
    dispatch(
      fetchUserProfileMenuFeed({
        defaultPage: defaultProfileMenuPage,
        userEmail: userEmail,
      })
    );
  };
  return (
    <div className="w-full flex justify-center items-center border min-h-96">
      {isProfileMenuLoading ? (
        <SpinnerCircularLoader />
      ) : (
        <InfiniteScroll
          dataLength={userProfileMenuData.length}
          next={fetchProfileData}
          hasMore={hasMoreProfileMenuData}
          loader={<BounceCircular />}
          endMessage={<EndMsg />}
        >
          {userProfileMenuData?.map((feeds) => {
            const { _id, question, answers, post, postBy, postOn } = feeds;
            return (
              <div key={_id}>
                {question && (
                  <Suspense fallback={<SpinnerCircularLoader />}>
                    <DisplayUserProfileFeeds
                      id={_id}
                      question={question}
                      answers={answers}
                    />
                  </Suspense>
                )}
                {post && (
                  <Suspense fallback={<SpinnerCircularLoader />}>
                    <DisplayUserProfilePostsFeed
                      post={post}
                      postOn={postOn}
                      postBy={postBy}
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

export default ProfileMenu;
