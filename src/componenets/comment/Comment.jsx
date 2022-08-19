// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useDispatch } from "react-redux";

// import styled from "styled-components";
// import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import RESP from "../../server/response";

// import { deleteComment, editComment } from "../../modules/redux/comment";
// import { H3_BOLD, H3, H4_ERR } from "../styled/Hn";
// import Button from "../../elements/Button";

// // TODO 한번에 하나만 수정 가능하게?
// // TODO 이전 값 원형 복귀 안됨!
// const Comment = ({ id, nickname, content, isMine, postId }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const [inEdit, setInEdit] = useState(false);
//   const [editContent, setEditContent] = useState(content);

//   const dispatch = useDispatch();

//   const onEditHandler = () => {
//     setInEdit(true);
//   };

//   const onChangeHandler = (e) => {
//     const value = e.target.value;
//     setEditContent(value);
//   };

//   const onCancelHandler = () => {
//     setInEdit(false);
//     setEditContent(content);
//   };

//   const onSubmitHandler = async (formData) => {
//     // console.log(formData);

//     const {
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.put(
//       `http://3.34.47.86/api/post/${postId}/${id}`,
//       formData,
//       {
//         headers: {
//           Authorization: localStorage.getItem("AccessToken"),
//           RefreshToken: localStorage.getItem("RefreshToken"),
//         },
//       }
//     );

//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.CREATE_COMMENT_SUCCESS;

//     if (!result) {
//       alert(message);
//       return;
//     }

//     setInEdit(false);
//     dispatch(editComment());
//   };

//   const deletePost = async () => {
//     const {
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.delete(`http://3.34.47.86/api/post/${postId}/${id}`, {
//       headers: {
//         Authorization: localStorage.getItem("AccessToken"),
//         RefreshToken: localStorage.getItem("RefreshToken"),
//       },
//     });

//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.DELETE_COMMENT_SUCCESS;

//     if (!result) {
//       alert(message);
//       return;
//     }

//     dispatch(deleteComment());
//   };

//   const onDeleteHandler = () => {
//     let answer = window.confirm("Are you sure to delete this comment?");
//     if (!answer) {
//       return;
//     }
//     deletePost();
//   };

//   return (
//     <CommentWrapper>
//       <NicknameWrapper>
//         <H3_BOLD>{nickname}</H3_BOLD>
//       </NicknameWrapper>
//       {!inEdit ? (
//         <>
//           <ContentWrapper>
//             <H3>{content}</H3>
//           </ContentWrapper>
//           {isMine ? (
//             <>
//               <ButtonWrapper>
//                 <Button icon={faPencil} size='sm' onClick={onEditHandler} />
//               </ButtonWrapper>
//               <ButtonWrapper>
//                 <Button icon={faXmark} size='sm' onClick={onDeleteHandler} />
//               </ButtonWrapper>
//             </>
//           ) : null}
//         </>
//       ) : null}
//       {inEdit ? (
//         <Form onSubmit={handleSubmit(onSubmitHandler)}>
//           <InputWrapper>
//             <Input
//               {...register("content", {
//                 required: "You should write content to edit comment.",
//                 validate: {
//                   notEmpty: (v) =>
//                     v.replace(/\s+/g, "") !== "" ||
//                     "You should write content to edit comment.",
//                 },
//               })}
//               type='text'
//               id='content'
//               placeholder='Write comment here...'
//               value={editContent}
//               onChange={onChangeHandler}
//             />
//             <Button type='submit' content='save' size='sm' />
//             <Button
//               type='button'
//               content='cancel'
//               size='sm'
//               onClick={onCancelHandler}
//             />
//           </InputWrapper>
//           {errors?.content ? (
//             <ErrorWrapper>
//               <H4_ERR>{errors.content.message}</H4_ERR>
//             </ErrorWrapper>
//           ) : null}
//         </Form>
//       ) : null}
//     </CommentWrapper>
//   );
// };

// export default Comment;

// const CommentWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-wrap: nowrap;
//   box-sizing: border-box;
//   padding: 5px;
// `;

// // TODO min width? 넘침...
// const NicknameWrapper = styled.div`
//   width: 35%;
//   margin-left: 10px;
// 	overflow: hidden;
// `;

// const ContentWrapper = styled.div`
//   width: 70%;
// `;

// const ButtonWrapper = styled.div`
//   margin-left: 10px;
// `;

// const Form = styled.form`
//   width: 100%;
//   height: 100%;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: nowrap;
//   align-items: flex-start;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   box-sizing: border-box;
//   padding: 10px;
// `;

// const Input = styled.input`
//   width: 100%;
// `;

// const ErrorWrapper = styled.div`
//   box-sizing: border-box;
//   padding: 0px 10px 20px;
// `;
