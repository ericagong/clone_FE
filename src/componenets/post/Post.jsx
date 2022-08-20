import { useState } from "react";
import { useSelector } from "react-redux";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import ImgView from "./ImgView";
import UserProfile from "../../elements/UserProfile";
import LikeBtn from "../../elements/LikeBtn";

// edit delete
// TODO content hashtag Link
// TODO Comment, More component (categories) 분리!
const Post = ({
  id,
  username,
  userprofile,
  content,
  imageUrls,
  hashtags,
  time,
  ismine,
  isliked,
  isfollowing,
  numcomments,
  numlikes,
}) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const [hasImage, setHasImage] = useState(imageUrls.length !== 0);
  const [showComment, setShowComment] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [inEdit, setInEdit] = useState(false);

  const [isFollowing, setIsFollowing] = useState(isfollowing);

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  const toggleMore = () => {
    if (!isLogin) {
      alert("Sorry. Only logged in user can see more.");
      return;
    }

    setShowMore((prev) => !prev);
  };

  // 서버에 요청만 보내고, 리렌더링 하지 않고 토글처리만 하기!
  const toggleFollow = () => {
    if (!isFollowing) {
      // const resp = await apis.follow_user(username);
      // const { result, status: { message } } = resp.data;

      // success
      const {
        result,
        status: { message },
      } = RESP.FOLLOW.FOLLOW_SUCCESS;

      // fail
      // const { result, status: { message } } = RESP.FOLLOW.FOLLOW_FAIL;

      // TODO Change to modal!
      // 색상 다르게 처리하기
      if (!result) {
        alert(message);
        return;
      }

      alert(message);

      setIsFollowing(true);
    } else {
      // const resp = await apis.unfollow_user(username);
      // const { result, status: { message } } = resp.data;

      // success
      const {
        result,
        status: { message },
      } = RESP.FOLLOW.UNFOLLOW_SUCCESS;

      // fail
      // const { result, status: { message } } = RESP.FOLLOW.UNFOLLOW_FAIL;

      // TODO Change to modal!
      // 색상 다르게 처리하기
      if (!result) {
        alert(message);
        return;
      }

      alert(message);

      setIsFollowing(false);
    }
  };

  const toggleEdit = () => {};

  const clickDelete = () => {};

  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <div>
          {hasImage ? <ImgView imgUrls={imageUrls} /> : <div>No Images</div>}
        </div>
        <div>
          <UserProfile userprofile={userprofile} />
          <div>{username}</div>
          <div>{time}</div>
        </div>
        <div>
          <div>{content}</div>
        </div>
        <div>
          <div>
            <LikeBtn isliked={isliked} isLogin={isLogin} />
            <div>{numlikes}</div>
          </div>
          <div>
            {!showComment ? (
              <button type='button' onClick={toggleComment}>
                Show Comments
              </button>
            ) : (
              <button type='button' onClick={toggleComment}>
                Hide Comments
              </button>
            )}
            <div>{numcomments}</div>
          </div>
          <div>
            {!showMore ? (
              <button type='button' onClick={toggleMore}>
                Show more
              </button>
            ) : (
              <button type='button' onClick={toggleMore}>
                Hide
              </button>
            )}
            {showMore ? (
              <div>
                {!ismine && !isFollowing ? (
                  <button type='button' onClick={toggleFollow}>
                    Follow this user
                  </button>
                ) : null}
                {!ismine && isFollowing ? (
                  <button type='button' onClick={toggleFollow}>
                    Unfollow this user
                  </button>
                ) : null}
                {ismine ? (
                  <div>
                    <button type='button' onClick={toggleEdit}>
                      Edit this post
                    </button>
                    <button type='button' onClick={clickDelete}>
                      Delete this post
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "30px" }}>
        {showComment ? <div>Comments List!</div> : null}
      </div>
    </>
  );
};

export default Post;
