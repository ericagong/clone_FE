import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { LOGIN_PATH } from "../../shared/paths";
import { apis } from "../../shared/axios";
// import RESP from "../../server/response";
import { emailCheck, usernameCheck, pwCheck } from "../../shared/regex";
import styled from "styled-components";

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
    const {
      data: {
        result,
        status: { message },
      },
    } = await apis.signup(email, username, password);

    // success
    // const {
    //   result,
    //   status: { message },
    // } = RESP.AUTH.SIGN_UP_SUCCESS;

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
    <StSignUp>
      <div className="wrap">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="email">
            <label htmlFor="email" className="email_label">
              email
            </label>
            <input
              type="text"
              id="email"
              placeholder="email"
              {...register("email", {
                required: "You should write email.",
                validate: {
                  type: (value) =>
                    emailCheck(value) ||
                    "You should write in proper email format.",
                },
              })}
            />
            {errors.email ? (
              <div className="error">{errors.email.message}</div>
            ) : null}
          </div>
          <div className="username">
            <label htmlFor="username" className="username_label">
              username
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
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
                  message: "Username should be shorter than 11 letters.",
                },
              })}
            />
            {errors.username ? (
              <div className="error">{errors.username.message}</div>
            ) : null}
          </div>
          <div className="pw">
            <label htmlFor="password">password</label>
            <input
              type={!show ? "password" : "text"}
              id="password"
              placeholder="password"
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
            {!show ? (
              <button type="button" onClick={onShowHandler}>
                <FaEye className="icon" />
              </button>
            ) : (
              <button type="button" onClick={onShowHandler}>
                <FaEyeSlash className="icon" />
              </button>
            )}
            <div className="guide">
              Password should be length of 8 to 15, mixture of english letters,
              number and following special characters(@$!%*#?&).
            </div>
            {errors.password ? (
              <div className="error">{errors.password.message}</div>
            ) : null}
          </div>
          <div className="pwcheck">
            <label htmlFor="passwordCheck">password check</label>
            <input
              type={!show ? "password" : "text"}
              id="passwordCheck"
              placeholder="password check"
              {...register("passwordCheck", {
                required: "You should check password again",
                validate: {
                  check: (value) =>
                    watch("password") === value || "Password not matched!",
                },
              })}
            />
            {errors.passwordCheck ? (
              <div className="error">{errors.passwordCheck.message}</div>
            ) : null}
          </div>
          <div className="signup_footer">
            <Link to={LOGIN_PATH}>
              <div className="go">Go Sign in</div>
            </Link>
            <button type="submit" className="signup">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </StSignUp>
  );
};
// FaEye
// FaEyeSlash
export default Signup;

const StSignUp = styled.div`
  width: 700px;
  height: 500px;
  background-color: #f8f9fa;
  box-shadow: rgb(95 108 123 / 30%) 0px 6px 15px 7px;
  border-radius: 30px;
  padding: 60px 100px;
  box-sizing: border-box;
  position: relative;
  .wrap {
    /* background-color: pink; */
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 10%;
    right: 10%;
    form {
      height: 100%;
      position: relative;
      .error {
        font-size: 13px;
        color: red;
      }
      .email {
        margin-bottom: 8px;
        .email_label {
          margin-bottom: 4px;
        }
        input {
          width: 100%;
          height: 30px;
          outline: none;
          border-radius: 8px;
          padding: 0 5px;
          border: 1px solid rgba(69, 79, 93, 0.4);
          :focus {
            border: 2px solid #a5c7fe;
          }
        }
      }
      .username {
        margin-bottom: 8px;
        .username_label {
          margin-bottom: 4px;
        }
        input {
          width: 100%;
          height: 30px;
          outline: none;
          border-radius: 8px;
          padding: 0 5px;
          border: 1px solid rgba(69, 79, 93, 0.4);
          :focus {
            border: 2px solid #a5c7fe;
          }
        }
      }
      .pw {
        margin-bottom: 8px;
        position: relative;
        .pw_label {
          margin-bottom: 4px;
        }
        .guide {
          margin-top: 4px;
          font-size: 8px;
        }
        input {
          width: 93%;
          height: 30px;
          outline: none;
          border-radius: 8px;
          padding: 0 5px;
          border: 1px solid rgba(69, 79, 93, 0.4);
          :focus {
            border: 2px solid #a5c7fe;
          }
        }
        button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          /* background-color: pink; */
          outline: none;
          border: none;
          background-color: transparent;
          position: absolute;
          top: 23px;
          right: 10px;
          .icon {
          }
        }
      }
      .pwcheck {
        margin-bottom: 8px;
        label {
          margin-bottom: 4px;
        }
        input {
          width: 100%;
          height: 30px;
          outline: none;
          border-radius: 8px;
          padding: 0 5px;
          border: 1px solid rgba(69, 79, 93, 0.4);
          :focus {
            border: 2px solid #a5c7fe;
          }
        }
      }
      .signup_footer {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        .signup {
          width: 150px;

          outline: none;
          border: none;
          background-color: #eee;
          border: 1px solid rgba(69, 79, 93, 0.15);
          border-radius: 7px;
          :hover {
            background-color: #ddd;
          }
        }
        .go {
          font-style: italic;
        }
      }
    }
  }
`;
