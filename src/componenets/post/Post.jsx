import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";
import ImgView from "./ImgView";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";
import Content from "./Content";

// TODO content hashtag Link
// TODO code spliting!
const Post = ({
  id,
  userprofile,
  imageurls,
  username,
  time,
  content,
  ismine,
  isfollowing,
  goDetail,
  ...rest
}) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      editContent: content,
    },
  });

  const [isFollowing, setIsFollowing] = useState(isfollowing);
  const [showMore, setShowMore] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [currContent, setCurrContent] = useState(content);
  const [isDeleted, setIsDeleted] = useState(false);

  const toggleMore = () => {
    setShowMore((prev) => !prev);
  };

  const toggleFollow = async () => {
    if (!isFollowing) {
      // const resp = await apis.follow_user(username);
      // const { result, status: { message } } = resp.data;

      // success
      const {
        result,
        status: { message },
      } = RESP.FOLLOW.FOLLOW_SUCCESS;

      // fail
      // const { result, status: { message } } = RESP.FOLLOW.FOLLOW_FAIL;

      // TODO Change to modal!
      // 색상 다르게 처리하기
      if (!result) {
        alert(message);
        return;
      }

      alert(message);

      setIsFollowing(true);
      setShowMore((prev) => !prev);
    } else {
      // const resp = await apis.unfollow_user(username);
      // const { result, status: { message } } = resp.data;

      // success
      const {
        result,
        status: { message },
      } = RESP.FOLLOW.UNFOLLOW_SUCCESS;

      // fail
      // const { result, status: { message } } = RESP.FOLLOW.UNFOLLOW_FAIL;

      // TODO Change to modal!
      // 색상 다르게 처리하기
      if (!result) {
        alert(message);
        return;
      }

      alert(message);

      setIsFollowing(false);
      setShowMore((prev) => !prev);
    }
  };

  const toggleEdit = () => {
    if (!inEdit) {
      setInEdit((prev) => !prev);
      setShowMore((prev) => !prev);
      return;
    }
    // cancel button
    reset({ editContent: content });
    setInEdit((prev) => !prev);
  };

  const clickDelete = async () => {
    const resp = await apis.delete_post(id);
    const {
      result,
      status: { message },
    } = resp.data;

    // success
    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.DELETE_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.DELETE_FAIL;

    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.DELETE_FAIL_AUTH;

    // TODO
    if (!result) {
      alert(message);
      return;
    }

    setIsDeleted(true);
  };

  const submitForm = async ({ editContent }) => {
    const hashtags = parseHashtags(editContent);

    const resp = await apis.edit_post(id, editContent, hashtags);
    const {
      result,
      status: { message },
      output,
    } = resp.data;

    // success
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.POST.EDIT_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.EDIT_FAIL;

    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.EDIT_FAIL_AUTH;

    if (!result) {
      alert(message);
      return;
    }

    setInEdit((prev) => !prev);
    setCurrContent(editContent);
  };

  return (
    <>
      {!isDeleted ? (
        <StPost>
          <div className='wrap'>
            <div className='post_user_info'>
              <div className='user_flex'>
                <UserProfile userprofile={userprofile} />
                <Username isme={ismine} username={username} inPost={true} />
              </div>
              <div className='showmore_btn'>
                {isLogin ? (
                  <div>
                    {!showMore ? (
                      <div className='more'>
                        <div className='circle_box' onClick={toggleMore}>
                          <div className='circle'></div>
                          <div className='circle'></div>
                          <div className='circle'></div>
                        </div>
                      </div>
                    ) : (
                      <div onClick={toggleMore} className='close'>
                        <FiX />
                      </div>
                    )}
                  </div>
                ) : null}
                {showMore ? (
                  <div>
                    {!ismine && !isFollowing ? (
                      <div type='button' onClick={toggleFollow}>
                        Follow this user
                      </div>
                    ) : null}
                    {!ismine && isFollowing ? (
                      <div className='option' onClick={toggleFollow}>
                        Unfollow this user
                      </div>
                    ) : null}
                    {ismine ? (
                      <div>
                        <div className='option' onClick={toggleEdit}>
                          Edit
                        </div>
                        <div className='option' onClick={clickDelete}>
                          Delete
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              {imageurls.length !== 0 ? <ImgView imgUrls={imageurls} /> : null}
            </div>

            <div className='post_user_box'></div>
            <div className='content'>
              {!inEdit ? (
                <Content
                  content={currContent}
                  id={id}
                  {...rest}
                  time={time}
                  goDetail={true}
                />
              ) : (
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className='input_box'>
                    <input
                      type='text'
                      id='editContent'
                      {...register("editContent", {
                        required: "You should write content to edit post.",
                        maxLength: {
                          value: 1000,
                          message:
                            "Content should be shorter than 1000 characters.",
                        },
                        validate: {
                          notEmpty: (value) =>
                            notEmptyCheck(value) ||
                            "Content cannot be empty string.",
                        },
                      })}
                    />
                    {errors.editContent ? (
                      <div className='error'>{errors.editContent.message}</div>
                    ) : null}
                  </div>
                  <div className='btn_group'>
                    <button type='submit'>Save Post</button>
                    <button type='button' onClick={toggleEdit}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </StPost>
      ) : null}
    </>
  );
};

export default Post;

const StPost = styled.div`
  width: 500px;
  padding: 5px 10px;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px;
  margin-bottom: 30px;
  .post_user_info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 8px;
    padding: 8px 5px;
    .user_flex {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .showmore_btn {
      .close {
        height: 24px;
        cursor: pointer;
        text-align: right;

        margin-bottom: 5px;
        font-size: 16px;
        transition: all 0.3s;
        :hover {
          font-size: 18px;
        }
      }
      .more {
        width: 50px;
        position: relative;
        .circle_box {
          height: 30px;
          cursor: pointer;
          transform: translateY(50%);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2px;
          border: none;
          .circle {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #b7bbc7;
          }
        }
      }
      .option {
        transition: all 0.4s;
        border-bottom: 1px solid rgba(69, 79, 93, 0.07);
        border-radius: 4px;
        padding: 0 5px;
        box-sizing: border-box;
        margin-bottom: 4px;
        :hover {
          background-color: #eee;
          border-bottom: 1px solid rgba(69, 79, 93, 0.15);
        }
      }
    }
  }
  .content {
    cursor: default;
    form {
      .input_box {
        input {
          width: 100%;
          outline: none;
          border: 1px solid rgba(69, 79, 93, 0.4);
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .error {
          color: red;
          font-size: 13px;
        }
      }
      .btn_group {
        display: flex;
        justify-content: end;
        gap: 20px;
        button {
          outline: none;
          border: none;
          background-color: #eee;
          border: 1px solid rgba(69, 79, 93, 0.15);
          border-radius: 7px;
          :hover {
            background-color: #ddd;
          }
        }
      }
    }
  }
`;
