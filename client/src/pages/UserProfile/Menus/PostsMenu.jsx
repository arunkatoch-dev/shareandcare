import InfiniteScroll from "react-infinite-scroll-component";
import BounceCircular from "../../../components/loaders/BounceCircular";
import EndMsg from "../../Home/MainBody/EndMsg/EndMsg";
import { lazy, Suspense } from "react";
import SpinnerCircularLoader from "../../../components/loaders/SpinnerCircularLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPostsMenuFeed } from "../../../slices/userProfileSlice";
const DisplayUserPostsMenu = lazy(() =>
  import("./MenuComponents/DisplayUserPostsMenu")
);
const userEmail = localStorage.getItem("userEmail");
const PostsMenu = () => {
  const dispatch = useDispatch();
  const {
    hasMorePostsMenuData,
    defaultPostsMenuPage,
    userPostsMenuData,
    isPostsMenuLoading,
  } = useSelector((state) => state.userProfileSlice);

  const fetchPostssData = () => {
    dispatch(
      fetchUserPostsMenuFeed({
        defaultPage: defaultPostsMenuPage,
        userEmail: userEmail,
      })
    );
  };

  return (
    <div className="w-full flex justify-center items-center border min-h-96">
      {isPostsMenuLoading ? (
        <SpinnerCircularLoader />
      ) : (
        <InfiniteScroll
          dataLength={userPostsMenuData.length}
          next={fetchPostssData}
          hasMore={hasMorePostsMenuData}
          loader={<BounceCircular />}
          endMessage={<EndMsg />}
        >
          {userPostsMenuData?.map((feeds) => {
            const { _id, post, postBy, postOn } = feeds;
            return (
              <div key={_id}>
                {post && (
                  <Suspense fallback={<SpinnerCircularLoader />}>
                    <DisplayUserPostsMenu
                      _id={_id}
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
      )}
    </div>
  );
};

export default PostsMenu;
