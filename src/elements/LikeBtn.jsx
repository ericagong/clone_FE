import { useState } from "react";

import { apis } from "../shared/axios";
import RESP from "../server/response";

const LikeBtn = ({ isliked, isLogin }) => {
  const [isLiked, setIsLiked] = useState(isliked);

  // 서버에 요청만 보내고, 리렌더링 하지 않고 토글처리만 하기!
  const toggleLike = async () => {
    if (!isLogin) {
      alert("Sorry. Only logged in user can like post.");
      return;
    }

    if (!isLiked) {
      // const resp = await apis.like_post(id);
      // const { result, status: { message } } = resp.data;

      // success
      const {
        result,
        status: { message },
      } = RESP.POST.LIKE_SUCCESS;

      // fail
      // const { result, status: { message } } = RESP.POST.LIKE_FAIL;
      // const { result, status: { message } } = RESP.POST.LIKE_FAIL_AUTH;

      // TODO Change to modal!
      if (!result) {
        alert(message);
        return;
      }

      setIsLiked(true);
    } else {
      // const resp = await apis.unlike_post(id);
      // const { result, status: { message } } = resp.data;

      // success
      const {
        result,
        status: { message },
      } = RESP.POST.UNLIKE_SUCCESS;

      // fail
      // const { result, status: { message } } = RESP.POST.UNLIKE_FAIL;
      // const { result, status: { message } } = RESP.POST.UNLIKE_FAIL_AUTH;

      // TODO Change to modal!
      if (!result) {
        alert(message);
        return;
      }

      setIsLiked(false);
    }
  };

  return (
    <>
      {!isLiked ? (
        <button type='button' onClick={toggleLike}>
          Like
        </button>
      ) : (
        <button type='button' onClick={toggleLike}>
          Unlike
        </button>
      )}
    </>
  );
};

export default LikeBtn;
