import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { SIGNUP_PATH } from "../../shared/paths";
import RESP from "../../server/response";
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
    // const resp = await apis.login(email, password);
    // const {
    //   result,
    //   status: { message },
    // } = resp.data;

    // // TODO check Authorization or authorization
    // const { authorization } = resp.headers;

    // success
    const {
      result,
      status: { message },
    } = RESP.AUTH.LOGIN_SUCCESS;

    const { Authorization } = RESP.AUTH.LOGIN_HEADER;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.AUTH.LOGIN_FAIL;

    // TODO 하단 모달로 처리
    if (!result) {
      alert(message);
      return;
    }

    // TODO check Authorization or authorization
    localStorage.setItem("AccessToken", Authorization);

    dispatch(login());

    navigate(HOME_PATH);
  };

  return (
    <>
      <Link to={SIGNUP_PATH}>
        <div>Go Signup</div>
      </Link>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor='email'>email</label>
          <input
            type='text'
            id='email'
            {...register("email", {
              required: "You should write email.",
            })}
          />
          {errors.email ? <div>{errors.email.message}</div> : null}
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            {...register("password", {
              required: "You should write password",
            })}
          />
          {errors.password ? <div>{errors.password.message}</div> : null}
        </div>
        <button type='submit'>Sign in</button>
      </form>
    </>
  );
};

export default Login;
