import { useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";

// TODO follow button 분리? 최적화
const Following = ({
  username,
  userprofile,
  numfollowing,
  numfollowers,
  isme,
  curr,
}) => {
  const [isFollowing, setIsFollowing] = useState(true);

  // 서버에 요청만 보내고, 리렌더링 하지 않고 토글처리만 하기!
  const toggleFollow = async () => {
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

  return (
    <>
      <div>
        <UserProfile userprofile={userprofile} />
        <div>
          <Username isme={false} username={username} />
          <div>
            <div>Following {numfollowing}</div>
            <div>Followers {numfollowers}</div>
          </div>
          {isme && curr === "Followings" ? (
            <div>
              {!isFollowing ? (
                <button type='button' onClick={toggleFollow}>
                  Unfollow
                </button>
              ) : (
                <button type='button' onClick={toggleFollow}>
                  Follow
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Following;
