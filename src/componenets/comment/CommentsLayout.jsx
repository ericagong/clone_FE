// import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";

// import styled from "styled-components";
// import axios from "axios";

// import { createComment } from "../../modules/redux/comment";
// import Button from "../../elements/Button";
// import { H4_ERR } from "../styled/Hn";
// import Comments from "../comment/Comments";

// const CommentsLayout = (props) => {
//   const { id } = useParams();

//   // TODO react-hook-form reset
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const isLogin = useSelector((state) => state.user.isLogin);

//   const dispatch = useDispatch();

//   const onSubmitHandler = async (formData) => {
//     // console.log(formData);

//     const {
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.post(`http://3.34.47.86/api/post/${id}/comment`, formData, {
//       headers: {
//         Authorization: localStorage.getItem("AccessToken"),
//         RefreshToken: localStorage.getItem("RefreshToken"),
//       },
//     });

//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.CREATE_COMMENT_SUCCESS;

//     if (!result) {
//       alert(message);
//       return;
//     }

//     dispatch(createComment());
//     reset({ content: "" });
//   };

//   return (
//     <>
//       {isLogin ? (
//         <Form onSubmit={handleSubmit(onSubmitHandler)}>
//           <InputWrapper>
//             <Input
//               {...register("content", {
//                 required: "You should write content to create comment.",
//                 validate: {
//                   notEmpty: (v) =>
//                     v.replace(/\s+/g, "") !== "" ||
//                     "You should write content to create comment.",
//                 },
//               })}
//               type='text'
//               id='content'
//               placeholder='Write comment here...'
//             />
//             <Button type='submit' content='Create' />
//           </InputWrapper>
//           {errors?.content ? (
//             <ErrorWrapper>
//               <H4_ERR>{errors.content.message}</H4_ERR>
//             </ErrorWrapper>
//           ) : null}
//         </Form>
//       ) : null}
//       <Comments />
//     </>
//   );
// };

// export default CommentsLayout;

// const Form = styled.form`
//   width: 70%;
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
