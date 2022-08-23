import { useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import LikeBtn from "../../elements/LikeBtn";
import CommentsLayout from "../comment/CommentsLayout";
import styled from "styled-components";

// TODO 중복 해시태그?
// TODO reducer C, U, D 연결
// TODO 더보기 버튼 위로 빼기!!
// TODO store값 변경 안해주고 그냥 프론트 독단으로 처리해도 되는지?
const Content = ({ content, isliked, numlikes, numcomments }) => {
  const [showComment, setShowComment] = useState(false);

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <StContent>
      <div>
        <div>
          <div>{content}</div>
        </div>
        <div>
          <div>
            <LikeBtn isliked={isliked} />
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
        </div>
        <div>
          <div style={{ marginBottom: "30px" }}>
            {showComment ? <CommentsLayout /> : null}
          </div>
        </div>
      </div>
    </StContent>
  );
};

export default Content;

const StContent = styled.div`
  width: 100%;
  background-color: pink;
`;
