import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { LOGIN_PATH } from "../../shared/paths";
import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { emailCheck, usernameCheck, pwCheck } from "../../shared/regex";

const Signup = (props) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const onShowHandler = () => {
    setShow((prev) => !prev);
  };

  const onSubmitHandler = async ({ email, username, password }) => {
    // const {
    //   data: {
    //     result,
    //     status: { message },
    //   },
    // } = await apis.signup(email, username, password);

    // success
    const {
      result,
      status: { message },
    } = RESP.AUTH.SIGN_UP_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.AUTH.SIGN_UP_FAIL;

    // TODO 하단 모달로 처리
    if (!result) {
      alert(message);
      return;
    }

    navigate(LOGIN_PATH);
  };

  return (
    <>
      <Link to={LOGIN_PATH}>
        <div>Go Sign in</div>
      </Link>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor='email'>email</label>
          <input
            type='text'
            id='email'
            {...register("email", {
              required: "You should write email.",
              validate: {
                type: (value) =>
                  emailCheck(value) ||
                  "You should write in proper email format.",
              },
            })}
          />
          {errors.email ? <div>{errors.email.message}</div> : null}
        </div>
        <div>
          <label htmlFor='username'>username</label>
          <div>Username should consists of english letters or number.</div>
          <input
            type='text'
            id='username'
            {...register("username", {
              required: "You should write username.",
              validate: {
                type: (value) =>
                  usernameCheck(value) ||
                  "Username should consists of english letters or numbers.",
              },
              minLength: {
                value: 3,
                message: "Username should be longer than 2 letters.",
              },
              maxLength: {
                value: 10,
                message: "Username should be longer than 2 letters.",
              },
            })}
          />
          {errors.username ? <div>{errors.username.message}</div> : null}
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <div>
            Password should be length of 8 to 15, mixture of english letters,
            number and following special characters(@$!%*#?&).
          </div>
          <input
            type={!show ? "password" : "text"}
            id='password'
            {...register("password", {
              required: "You should write password",
              minLength: {
                value: 8,
                message: "Password shoule be longer than 7 letters.",
              },
              maxLength: {
                value: 15,
                message: "Password shoule be shorter than 16 letters.",
              },
              validate: {
                check: (value) =>
                  pwCheck(value) ||
                  "Password should be mixture of english letters, numbers and special characters.(@$!%*#?&)",
              },
            })}
          />
          <button type='button' onClick={onShowHandler}>
            show
          </button>
          {errors.password ? <div>{errors.password.message}</div> : null}
        </div>
        <div>
          <label htmlFor='passwordCheck'>password check</label>
          <input
            type={!show ? "password" : "text"}
            id='passwordCheck'
            {...register("passwordCheck", {
              required: "You should check password again",
              validate: {
                check: (value) =>
                  watch("password") === value || "Password not matched!",
              },
            })}
          />
          {errors.passwordCheck ? (
            <div>{errors.passwordCheck.message}</div>
          ) : null}
        </div>
        <button type='submit'>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
