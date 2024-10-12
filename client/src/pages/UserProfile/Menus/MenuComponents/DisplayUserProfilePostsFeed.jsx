/* eslint-disable react/prop-types */

const DisplayUserProfilePostsFeed = ({ post, postBy, postOn }) => {
  return (
    <div className="flex flex-col justify-between py-2 shadow-lg border my-2">
      <div className="flex flex-col gap-1  p-2">
        <span className="text-lg font-semibold">{postBy}</span>
        <span className="text-xs font-light">{postOn}</span>
      </div>
      <p className="text-base text-gray-800 p-2">{post}</p>
    </div>
  );
};

export default DisplayUserProfilePostsFeed;
