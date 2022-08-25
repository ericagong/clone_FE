import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";
import styled from "styled-components";

import { SIGNUP_PATH } from "../../shared/paths";
// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import { login } from "../../modules/redux/user";
import { HOME_PATH } from "../../shared/paths";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmitHandler = async ({ email, password }) => {
    const resp = await apis.login(email, password);
    const {
      result,
      status: { message },
    } = resp.data;

    const { authorization } = resp.headers;

    // success
    // const {
    //   result,
    //   status: { message },
    // } = RESP.AUTH.LOGIN_SUCCESS;

    // const { Authorization } = RESP.AUTH.LOGIN_HEADER;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.AUTH.LOGIN_FAIL;

    if (!result) {
      alert(message);
      return;
    }

    localStorage.setItem("AccessToken", authorization);

    dispatch(login());

    navigate(HOME_PATH);
  };

  return (
    <StLogin>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="input_box">
          <label htmlFor="email" className="email">
            <FaUser />
          </label>
          <input
            type="text"
            id="email"
            placeholder="UserEmail"
            {...register("email", {
              required: "You should write email.",
            })}
          />
        </div>
        {errors.email ? (
          <div className="error">{errors.email.message}</div>
        ) : null}
        <div className="input_box">
          <label htmlFor="password" className="pw">
            <FaKey />
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "You should write password",
            })}
          />
        </div>
        {errors.password ? (
          <div className="error">{errors.password.message}</div>
        ) : null}
        <div className="login_box">
          <Link to={SIGNUP_PATH}>
            <div>Sign up</div>
          </Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </StLogin>
  );
};

export default Login;

const StLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .error {
    font-size: 13px;
    color: red;
  }
  .input_box {
    width: 210px;
    height: 40px;
    display: flex;
    margin-top: 12px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 8px;
    overflow: hidden;
    label {
      width: 40px;
      height: 40px;
      border-right: none;
      box-sizing: border-box;
      background-color: #ededed;
      display: block;
      font-size: 23px;
      text-align: center;
      line-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        fill: #a6a6a6;
      }
    }
    input {
      width: 170px;
      height: 40px;
      border: none;
      outline: none;
      padding: 6px 12px;
      box-sizing: border-box;
      font-size: 17px;
    }
  }
  .login_box {
    margin-top: 8px;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    div {
      color: blue;
      font-style: italic;
    }
    button {
      width: 55px;
      height: 30px;
      background-color: #3da9fc;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      transition: all 0.4s;
      cursor: pointer;
      transition: all 0.4s;
      :hover {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
          rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
          rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      }
    }
  }
`;
