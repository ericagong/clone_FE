import { useState, useEffect } from "react";
import styled from "styled-components";

import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import Comment from "./Comment";

const Comments = (props) => {
  const [currPageNum, setCurrPageNum] = useState(1);
  const [allComments, setAllComments] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
    totalelements: 0,
  });

  const getComments = async (postId, pageNum, pageLimit) => {
    // const resp = await apis.get_comments(postId, pageNum, pageLimit);
    // const { result, statue:{message}, output} = resp.data

    //success
    const {
      result,
      status: { message },
      output,
    } = RESP.COMMENT.GET_SUCCESS;

    //fail
    // const {
    //   result,
    //   status:{message},
    //   output,
    // } = RESP.COMMENT.GET_FAIL

    if (!result) {
      alert(message);
      return;
    }

    const { comments, ...rest } = output;

    setAllComments([...allComments, ...comments]);
    setPageInfo({ pageInfo, ...rest });
    // currPageNum.current += 1
  };

  useEffect(() => {
    getComments();
  }, []);

  const getMore = () => {
    getComments();
  };

  const commentList = allComments.map((comment) => (
    <Comment key={comment.id} {...comment} />
  ));

  return (
    <StComments>
      <p className="comments_header">
        <span>{pageInfo.totalelements}</span>개 Comments
      </p>
      <div>{commentList}</div>
      {/* {pageInfo.currpage !== pageInfo.totalpage ? (
        <button onClick={getMore} className="more">
          get more
        </button>
      ) : null} */}
      <div className="btn_G">
        <button onClick={getMore} className="more">
          get more
        </button>
      </div>
    </StComments>
  );
};

export default Comments;

const StComments = styled.div`
  /* background-color: pink; */
  width: 100%;
  .comments_header {
    margin-bottom: 5px;
    padding: 5px 15px 5px 15px;
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.23);
    span {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .btn_G {
    display: flex;
    justify-content: end;
    .more {
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
`;
