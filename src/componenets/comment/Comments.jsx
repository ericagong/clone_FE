// import { useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import styled from "styled-components";
// import axios from "axios";

// import Comment from "./Comment";

// const Comments = (props) => {
//   const fetchWatcher = useSelector((state) => state.comment.fetchWatcher);

//   const [comments, setComments] = useState([]);

//   const { id } = useParams();

//   const navigate = useNavigate();

//   // TODO 에러 발생 시 홈으로 갈건지?
//   const getComments = async (commentsNum, pageLimit) => {
//     const {
//       data: { result, data },
//     } = await axios.get(
//       `http://3.34.47.86/api/post/${id}/comments?commentsNum=${commentsNum}&pageLimit=${pageLimit}`,
//       {
//         headers: {
//           Authorization: localStorage.getItem("AccessToken"),
//           RefreshToken: localStorage.getItem("RefreshToken"),
//         },
//       }
//     );

//     // const { result, data } = RESP.GET_COMMENTS_SUCCESS;

//     if (!result) {
//       navigate("/home");
//       return;
//     }

//     setComments([...data]);
//   };

//   useEffect(() => {
//     const commentsNum = 0;
//     const pageLimit = 10;
//     getComments(commentsNum, pageLimit);
//   }, [fetchWatcher]);

//   const allComments = comments.map((comment) => (
//     <Comment key={comment.id} {...comment} postId={id} />
//   ));

//   return <CommentsWrapper>{allComments}</CommentsWrapper>;
// };

// export default Comments;

// const CommentsWrapper = styled.div`
//   width: 70%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// `;
