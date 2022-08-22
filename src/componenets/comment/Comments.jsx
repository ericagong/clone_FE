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
  };

  useEffect(() => {
    getComments();
  }, []);

  const commentList = allComments.map((comment) => (
    <Comment key={comment.id} {...comment} />
  ));

  return (
    <StComments>
      <p className="comments_header">{pageInfo.totalelements}개 Comments</p>
      <div>{commentList}</div>
    </StComments>
  );
};

export default Comments;

const StComments = styled.div`
  width: 416px;
  /* height: 200px; */
  /* background-color: royalblue; */
  .comments_header {
    border-bottom: 1px solid;
  }
`;
