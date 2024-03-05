import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TweetAndComment, TweetsList } from "../../components";
import { getUserTweets } from "../../store/Slices/tweetSlice";

const ChannelTweets = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);

  console.log(tweets);

  useEffect(() => {
    if (userId) dispatch(getUserTweets(userId));
  }, [dispatch, userId]);

  return (
    <>
      {userData?._id === userId && (
        <TweetAndComment tweet={true} profileImg={userData?.avatar?.url} />
      )}

      {tweets?.map((tweet) => (
        <TweetsList
          key={tweet?._id}
          avatar={tweet?.ownerDetails?.avatar.url}
          content={tweet?.content}
          createdAt={tweet?.createdAt}
          likesCount={tweet?.likesCount}
          tweetId={tweet?._id}
          userName={tweet?.ownerDetails?.userName}
          isLiked={tweet?.isLiked}
        />
      ))}
    </>
  );
};

export default ChannelTweets;
