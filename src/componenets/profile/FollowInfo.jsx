import { useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";
import styled from "styled-components";

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

  const toggleFollow = async () => {
    if (!isFollowing) {
      const resp = await apis.follow_user(username);
      const {
        result,
        status: { message },
      } = resp.data;

      // success
      // const {
      //   result,
      //   status: { message },
      // } = RESP.FOLLOW.FOLLOW_SUCCESS;

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
      const resp = await apis.unfollow_user(username);
      const {
        result,
        status: { message },
      } = resp.data;

      // success
      // const {
      //   result,
      //   status: { message },
      // } = RESP.FOLLOW.UNFOLLOW_SUCCESS;

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
    <StListInfo>
      <div className='flex_box'>
        <UserProfile userprofile={userprofile} />
        <div className='info'>
          <Username isme={false} username={username} />
          <div className='f_box'>
            <div className='follow_g'>
              <div>Following {numfollowing}</div>
              <div>Followers {numfollowers}</div>
            </div>
            {isme && curr === "Followings" ? (
              <div className='btn_flex'>
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
      </div>
    </StListInfo>
  );
};

export default Following;

const StListInfo = styled.div`
  /* background-color: skyblue; */
  .flex_box {
    display: flex;
    gap: 5px;
    /* background-color: pink; */
    padding: 5px;
    margin-bottom: 5px;
    border: 1px solid rgba(69, 79, 93, 0.4);
    border-radius: 8px;
    .info {
      width: 95%;
      /* background-color: royalblue; */
      display: flex;
      justify-content: space-between;
      .f_box {
        /* background-color: yellowgreen; */
        display: flex;
        align-items: center;
        gap: 8px;
        .follow_g {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          /* background-color: skyblue; */
        }
        .btn_flex {
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            outline: none;
            border: none;
            background-color: #eee;
            border: 1px solid rgba(69, 79, 93, 0.15);
            border-radius: 7px;
            :hover {
              background-color: #ddd;
            }
          }
        }
      }
    }
  }
`;
