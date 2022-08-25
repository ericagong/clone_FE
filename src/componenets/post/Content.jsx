import { useSelector } from "react-redux";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaCommentAlt } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
// import LikeBtn from "../../elements/LikeBtn";
import CommentsLayout from "../comment/CommentsLayout";

// TODO 중복 해시태그?
// TODO reducer C, U, D 연결
// TODO 더보기 버튼 위로 빼기!!
// TODO store값 변경 안해주고 그냥 프론트 독단으로 처리해도 되는지?
const Content = ({ content, isliked, numlikes, numcomments, id, time }) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const [showComment, setShowComment] = useState(false);
  const [isLiked, setIsLiked] = useState(isliked);

  const navigate = useNavigate();

  const temp = useMatch(`/detail/${id}`);

  const toggleComment = () => {
    if (temp === null) {
      navigate(`/detail/${id}`);
    } else {
      setShowComment((prev) => !prev);
    }
  };

  const toggleLike = async () => {
    if (!isLogin) {
      alert("Sorry. Only logged in user can like post.");
      return;
    }

    if (!isLiked) {
      const resp = await apis.like_post(id);
      const {
        result,
        status: { message },
      } = resp.data;

      // success
      // const {
      //   result,
      //   status: { message },
      // } = RESP.POST.LIKE_SUCCESS;

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
      const resp = await apis.unlike_post(id);
      const {
        result,
        status: { message },
      } = resp.data;

      // success
      // const {
      //   result,
      //   status: { message },
      // } = RESP.POST.UNLIKE_SUCCESS;

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

  // 디테일 페이지이면 !null
  // 홈이면 null

  return (
    <StContent>
      <div>
        <div>
          <div className='content'>{content}</div>
        </div>
        <div className='icon_box'>
          <div>
            <StLikeBtn>
              {!isLiked ? (
                <button type='button' onClick={toggleLike}>
                  <FaRegHeart className='like' />
                </button>
              ) : (
                <button type='button' onClick={toggleLike}>
                  <FaHeart className='unlike' />
                </button>
              )}
            </StLikeBtn>
            <div className='like_num'>
              좋아요 <span>{isLiked ? numlikes + 1 : numlikes}</span>개
            </div>
          </div>
          <div>
            {!showComment ? (
              <button type='button' onClick={toggleComment}>
                <FiMessageCircle className='full' />
              </button>
            ) : (
              <button type='button' onClick={toggleComment}>
                <FiMessageCircle className='unfull' />
              </button>
            )}
            <div className='comment_num'>댓글 {numcomments}개</div>
          </div>
        </div>
        <div>
          <div>{showComment ? <CommentsLayout /> : null}</div>
          <div className='time'>{time}</div>
        </div>
      </div>
    </StContent>
  );
};

export default Content;

const StContent = styled.div`
  width: 100%;
  /* background-color: pink; */
  .time {
    font-size: 10px;
    color: rgb(142, 142, 142);
    margin-left: 5px;
  }
  .icon_box {
    width: 100%;
    height: 80px;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    position: relative;
    button {
      width: 35px;
      height: 35px;
      cursor: default;
      background-color: transparent;
      padding: 0;
      border: none;
      transition: all 0.3s;
      .full {
        font-size: 28px;
        transition: all 0.2s;
        stroke: #000;
        fill: transparent;
        stroke-width: 1.5px;
        cursor: pointer;
        :hover {
          fill: rgb(142, 142, 142);
        }
      }
      .unfull {
        font-size: 28px;
        transition: all 0.2s;
        stroke: transparent;
        fill: rgb(142, 142, 142);
        cursor: pointer;
      }
      :active {
        margin-left: 5px;
        margin-top: 5px;
      }
    }
    .like_num {
      position: absolute;
      left: 5px;
      font-size: 14px;
      span {
        font-weight: bold;
      }
    }
    .comment_num {
      position: absolute;
      top: 57px;
      left: 5px;
      font-size: 12px;
      color: rgb(142, 142, 142);
    }
  }
  .content {
    width: 100%;
    height: 130px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px 8px;
    margin-bottom: 8px;
  }
`;

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
