// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import styled from "styled-components";
// import axios from "axios";

// // import RESP from "../../server/response";
// import { H3, H4, H4_ERR, H4_SUC } from "../styled/Hn";
// import Button from "../../elements/Button";

// // TODO check onchange option!
// const Signup = (props) => {
//   const [userInfo, setUserInfo] = useState({
//     username: "",
//     nickname: "",
//     password: "",
//     passwordCheck: "",
//   });

//   const [check, setCheck] = useState({
//     username: false,
//     usernameMsg: "",
//     nickname: false,
//     nicknameMsg: "",
//     password: false,
//     passwordMsg: "",
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });

//   const navigate = useNavigate();

//   const changeHandler = (e) => {
//     let name = e.target.name;
//     const value = e.target.value;
//     setUserInfo({ ...userInfo, [name]: value });
//     if (name === "passwordCheck") {
//       name = "password";
//     }
//     const nameMsg = name + "Msg";
//     setCheck({ ...check, [name]: false, [nameMsg]: "" });
//   };

//   const checkusernameHandler = async (e) => {
//     const username = userInfo.username;
//     if (!username) {
//       setCheck({
//         ...check,
//         username: false,
//         usernameMsg: "You should write username for check!",
//       });
//       return;
//     }

//     // console.log(username);
//     const {
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.post(`http://3.34.47.86/user/username`, {
//       username,
//     });
//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.ID_CHECK_SUCCESS;

//     setCheck({ ...check, username: result, usernameMsg: message });
//   };

//   const checkNickHandler = async (e) => {
//     const nickname = userInfo.nickname;
//     if (!nickname) {
//       setCheck({
//         ...check,
//         nickname: false,
//         nicknameMsg: "You should write nickname for check!",
//       });
//       return;
//     }

//     const {
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.post(`http://3.34.47.86/user/nickname`, { nickname });

//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.NICKNAME_CHECK_SUCCESS;
//     setCheck({ ...check, nickname: result, nicknameMsg: message });
//   };

//   const checkPWandler = (e) => {
//     const password = userInfo.password;
//     const passwordCheck = userInfo.passwordCheck;

//     if (!password) {
//       setCheck({
//         ...check,
//         password: false,
//         passwordMsg: "You should write password for check!",
//       });
//       return;
//     }

//     const result = password === passwordCheck;
//     const message = result
//       ? "Password matched!"
//       : "Password not matching, Please check!";
//     setCheck({ ...check, password: result, passwordMsg: message });
//   };

//   const submitHandler = async (formData) => {
//     // console.log(formData);

//     const {
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.post(`http://3.34.47.86/user/signup`, formData);

//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.SIGN_UP_SUCCESS;

//     alert(message);
//     if (result) {
//       navigate("/login");
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit(submitHandler)}>
//       <HelperWrapper>
//         <H3 as='label' htmlFor='username'>
//           ID
//         </H3>
//         <H4>Use 8 to 16 characters with a mix of letters, numbers.</H4>
//       </HelperWrapper>

//       <InputWrapper>
//         <Input
//           type='text'
//           {...register("username", {
//             required: "You should write username.",
//             pattern: {
//               value: /[A-Za-z0-9]{8,16}/,
//               message:
//                 "ID should be 8 to 16 characters with a mix of letters, numbers.",
//             },
//             validate: {
//               noWhiteSpace: (v) =>
//                 !/[\s]/g.test(v) || "ID cannot contain space.",
//             },
//           })}
//           onChange={changeHandler}
//         />
//         <Button
//           type='button'
//           size='sm'
//           content='check'
//           onClick={checkusernameHandler}
//         />

//         {check.username ? (
//           <MessageWrapper>
//             <H4_SUC>{check.usernameMsg}</H4_SUC>
//           </MessageWrapper>
//         ) : (
//           <MessageWrapper>
//             <H4_ERR>{check.usernameMsg}</H4_ERR>
//           </MessageWrapper>
//         )}
//       </InputWrapper>

//       {errors?.username && (
//         <ErrorWrapper>
//           <H4_ERR>{errors.username.message}</H4_ERR>
//         </ErrorWrapper>
//       )}

//       <HelperWrapper>
//         <H3 as='label' htmlFor='nickname'>
//           Nickname
//         </H3>
//         <H4>
//           Use 2 to 8 characters with a mix of letters(Englisth or Korean),
//           numbers.
//         </H4>
//       </HelperWrapper>

//       <InputWrapper>
//         <Input
//           type='text'
//           {...register("nickname", {
//             required: "You should write Nickname.",
//             pattern: {
//               value: /[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,8}/,
//               message:
//                 "Nickname should be 2 to 8 characters with a mix of letters(English or Korean), numbers.",
//             },
//             validate: {
//               noWhiteSpace: (v) =>
//                 !/[\s]/g.test(v) || "Nickname cannot contain space.",
//             },
//           })}
//           onChange={changeHandler}
//         />
//         <Button
//           type='button'
//           size='sm'
//           content='check'
//           onClick={checkNickHandler}
//         />

//         {check.nickname ? (
//           <MessageWrapper>
//             <H4_SUC>{check.nicknameMsg}</H4_SUC>
//           </MessageWrapper>
//         ) : (
//           <MessageWrapper>
//             <H4_ERR>{check.nicknameMsg}</H4_ERR>
//           </MessageWrapper>
//         )}
//       </InputWrapper>

//       {errors?.nickname && (
//         <ErrorWrapper>
//           <H4_ERR>{errors.nickname.message}</H4_ERR>
//         </ErrorWrapper>
//       )}

//       <HelperWrapper>
//         <H3 as='label' htmlFor='password'>
//           Password
//         </H3>
//         <H4>
//           Use 8 to 16 characters with a mix of letters, numbers and special
//           characters(!@#$%^&*()?_~).
//         </H4>
//       </HelperWrapper>

//       <InputWrapper>
//         <Input
//           type='password'
//           {...register("password", {
//             required: true,
//             pattern: {
//               value: /[a-zA-Z0-9!@#$%^&*()?_~]{8,16}/,
//               message:
//                 "Password should be 8 to 16 characters with a mix of letters, numbers and special characters.",
//             },
//             validate: {
//               noWhiteSpace: (v) =>
//                 !/[\s]/g.test(v) || "Password cannot contain space.",
//               mixOfTwo: (v) => {
//                 let cnt = 0;
//                 if (v.search(/[0-9]/) !== -1) cnt++;
//                 if (v.search(/[a-zA-Z]/) !== -1) cnt++;
//                 if (v.search(/[!@#$%^&*()?_~]/) !== -1) cnt++;
//                 return (
//                   cnt > 1 ||
//                   "Password should contain two of followings: letters, numbers, special characters."
//                 );
//               },
//             },
//           })}
//           onChange={changeHandler}
//         />
//       </InputWrapper>

//       {errors?.password && (
//         <ErrorWrapper>
//           <H4_ERR>{errors.password.message}</H4_ERR>
//         </ErrorWrapper>
//       )}

//       <HelperWrapper>
//         <H3 as='label' htmlFor='password check'>
//           Password Check
//         </H3>
//         <H4>Use 8 to 16 characters with a mix of letters, numbers.</H4>
//       </HelperWrapper>

//       <InputWrapper>
//         <Input
//           type='password'
//           {...register("passwordCheck", { required: true })}
//           onChange={changeHandler}
//         />
//         <Button
//           type='button'
//           size='sm'
//           content='check'
//           onClick={checkPWandler}
//         />

//         {check.password ? (
//           <MessageWrapper>
//             <H4_SUC>{check.passwordMsg}</H4_SUC>
//           </MessageWrapper>
//         ) : (
//           <MessageWrapper>
//             <H4_ERR>{check.passwordMsg}</H4_ERR>
//           </MessageWrapper>
//         )}
//       </InputWrapper>

//       <ButtonWrapper>
//         <Button
//           type='submit'
//           size='lg'
//           content='Sign up'
//           disabled={!(check.username && check.nickname & check.password)}
//         />
//       </ButtonWrapper>
//     </Form>
//   );
// };

// export default Signup;

// const Form = styled.form`
//   width: 70%;
//   height: 100%;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: nowrap;
//   align-items: flex-start;
//   box-sizing: border-box;
//   padding-left: 10%;
// `;

// const HelperWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   box-sizing: border-box;
// `;

// const Input = styled.input`
//   width: 100%;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: center;
//   align-items: center;
//   box-sizing: border-box;
//   padding: 5px 0px;
// `;

// const MessageWrapper = styled.div`
//   margin-left: 10px;
// `;

// const ErrorWrapper = styled.div`
//   box-sizing: border-box;
//   padding: 0px 0px 20px;
// `;

// const ButtonWrapper = styled.div`
//   box-sizing: border-box;
//   padding: 10px 0px;
// `;
