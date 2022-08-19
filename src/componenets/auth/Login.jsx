// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import styled from "styled-components";
// import RESP from "../../server/response";

// import axios from "axios";
// import { login } from "../../modules/redux/user";

// import { H3, H4_ERR } from "../styled/Hn";
// import Button from "../../elements/Button";

// // TODO id 저장하시겠습니까? 로컬 스토리지 저장하고 그렇지 않은 경우는 쿠키 저장?
// // TODO 아이디 및 패스워드 유효성 검사?
// const Login = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [userInfo, setUserInfo] = useState({
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   const onSubmitHandler = async (formData) => {
//     // console.log(formData);

//     const {
//       headers: { authorization, refreshtoken },
//       data: {
//         result,
//         status: { message },
//       },
//     } = await axios.post(`http://3.34.47.86/user/login`, formData);

//     // const {
//     //   result,
//     //   status: { message },
//     // } = RESP.LOGIN_SUCCESS;

//     // const { Authorization, RefreshToken } = RESP.LOGIN_HEADER;

//     if (!result) {
//       alert(message);
//       return;
//     }

//     localStorage.setItem("AccessToken", authorization);
//     localStorage.setItem("RefreshToken", refreshtoken);

//     dispatch(login());

//     navigate("/home");
//   };

//   return (
//     <Form onSubmit={handleSubmit(onSubmitHandler)}>
//       <FormWrapper>
//         <H3 as='label' htmlFor='username'>
//           ID
//         </H3>
//         <InputWrapper>
//           <Input
//             {...register("username", {
//               required: "You should write ID for login.",
//             })}
//             type='text'
//             onChange={onChangeHandler}
//           />
//         </InputWrapper>
//         {errors?.username ? (
//           <ErrorWrapper>
//             <H4_ERR>{errors.username.message}</H4_ERR>
//           </ErrorWrapper>
//         ) : null}
//         <H3 as='label' htmlFor='password'>
//           Password
//         </H3>
//         <InputWrapper>
//           <Input
//             {...register("password", {
//               required: "You should write password for login.",
//             })}
//             type='password'
//             id='password'
//             onChange={onChangeHandler}
//           />
//         </InputWrapper>
//         {errors?.password ? (
//           <ErrorWrapper>
//             <H4_ERR>{errors.password.message}</H4_ERR>
//           </ErrorWrapper>
//         ) : null}
//       </FormWrapper>
//       <Button type='submit' size='lg' content='Login' />
//     </Form>
//   );
// };

// export default Login;

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

// const FormWrapper = styled.div`
//   display: flex;
//   align-items: flex-start;
//   flex-direction: column;
//   margin-bottom: 10px;
// `;

// const InputWrapper = styled.div`
//   box-sizing: border-box;
//   padding: 5px 0px;
// `;

// const Input = styled.input`
//   width: 100%;
// `;

// const ErrorWrapper = styled.div`
//   box-sizing: border-box;
//   padding: 0px 0px 20px;
// `;
