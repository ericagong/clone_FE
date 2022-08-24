import { useSelector } from "react-redux";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { apis } from "../shared/axios";
import RESP from "../server/response";
import styled from "styled-components";

const LikeBtn = ({ isliked }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
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
    <StLikeBtn>
      {!isLiked ? (
        <button type="button" onClick={toggleLike}>
          <FaRegHeart className="like" />
        </button>
      ) : (
        <button type="button" onClick={toggleLike}>
          <FaHeart className="unlike" />
        </button>
      )}
    </StLikeBtn>
  );
};

export default LikeBtn;
const StLikeBtn = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: tomato; */
  button {
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    border: none;
    transition: all 0.3s;

    .like {
      font-size: 24px;
      transition: all 0.2s;
      cursor: pointer;
      :hover {
        fill: rgb(142, 142, 142);
      }
    }
    .unlike {
      fill: #ed4956;
      font-size: 24px;
      transition: all 0.3s;
      cursor: pointer;
    }
    :active {
      margin-left: 5px;
      margin-top: 5px;
    }
  }
`;
