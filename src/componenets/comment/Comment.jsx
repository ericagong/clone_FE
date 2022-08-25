import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

import UserProfile from "../../elements/UserProfile";
import RESP from "../../server/response";
import { apis } from "../../shared/axios";

const Comment = ({ id, username, userprofile, ismine, content }) => {
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

  const [inEdit, setInEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currComment, setCurrComment] = useState(content);
  const [showBtn, setShowBtn] = useState(true);

  const toggleEdit = () => {
    if (!inEdit) {
      setInEdit((prev) => !prev);
      setShowBtn((prev) => !prev);
      return;
    }
    reset({ editContent: content });
    setInEdit((prev) => !prev);
    setShowBtn((prev) => !prev);
  };

  const submitForm = async ({ editContent }) => {
    //props 를 id, content, hashtags 줘야하는지
    const hashtags = parseHashtags(editContent);

    const resp = await apis.edit_comment(id, content, hashtags);

    const {
      result,
      status: { message },
    } = resp.data;

    //success
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.COMMENT.EDIT_SUCCESS;

    //fail
    // const {
    //   result,
    //   status:{message},
    // } = RESP.COMMENT.EDIT_FAIL

    // const {
    //   result,
    //   status:{message},
    // } = RESP.COMMENT.EDIT_FAIL_AUTH

    if (!result) {
      alert(message);
      return;
    }

    setInEdit((prev) => !prev);
    setCurrComment(editContent);
    setShowBtn((prev) => !prev);
  };

  const clickDelete = async (id) => {
    const resp = await apis.delete_comment(id);
    const {
      result,
      status: { message },
    } = resp.data;

    // const {
    //   result,
    //   status: { message },
    // } = RESP.COMMENT.DELETE_SUCCESS;

    //fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.COMMENT.DELETE_FAIL;
    // const {
    //   result,
    //   status: { message },
    // } = RESP.COMMENT.DELETE_FAIL_AUTH;

    if (!result) {
      alert(message);
      return;
    }

    setIsDeleted(true);
  };

  return (
    <StCommentWrap>
      {!isDeleted ? (
        <div className='card'>
          {ismine ? (
            <StComment>
              <UserProfile userprofile={userprofile}></UserProfile>
              <div className='wrap'>
                <div className='userinfowrap'>
                  <div className='username'>{username}</div>
                  <div className='comment_content'>
                    {!inEdit ? (
                      <div className='curr_comment'>{currComment}</div>
                    ) : (
                      <div className='what'>
                        <form onSubmit={handleSubmit(submitForm)}>
                          <div className='ed_input_box'>
                            <input
                              type='text'
                              id='editContent'
                              className='ed_input'
                              {...register("editContent", {
                                required:
                                  "You should write comment to edit post.",
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

                            <div className='ed_button_group'>
                              <button className='ed_option'>save</button>
                              <button
                                onClick={toggleEdit}
                                className='ed_option'
                              >
                                cancel
                              </button>
                            </div>
                            {errors.editContent ? (
                              <div className='error'>
                                {errors.editContent.message}
                              </div>
                            ) : null}
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                {!showBtn ? null : (
                  <div className='btnbox'>
                    <FaRegEdit onClick={toggleEdit} className='comment_btn' />

                    <FaTrashAlt className='comment_btn' onClick={clickDelete} />
                  </div>
                )}
              </div>
            </StComment>
          ) : (
            <StNotMineComment>
              <UserProfile userprofile={userprofile}></UserProfile>
              <div className='NM_wrap'>
                <div className='NM_userinfowrap'>
                  <div className='NM_username'>{username}</div>
                  <div className='NM_content'>{currComment}</div>
                </div>
              </div>
            </StNotMineComment>
          )}
        </div>
      ) : null}
    </StCommentWrap>
  );
};

export default Comment;
const StCommentWrap = styled.div`
  .card {
    margin-bottom: 5px;
    padding: 5px 8px;
    box-sizing: border-box;
  }
`;

const StComment = styled.div`
  box-sizing: border-box;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  /* background-color: aqua; */
  .wrap {
    width: calc(100% - 56px);
    display: flex;
    justify-content: space-between;
    position: relative;
    .userinfowrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .username {
        height: 28px;
        font-weight: bold;
      }
      .comment_content {
        width: 400px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.23);
        color: rgb(142, 142, 142);
        .what {
          form {
            width: 400px;
            .curr_comment {
              background-color: yellowgreen;
            }
            .ed_input_box {
              position: relative;

              .ed_input {
                width: 97%;
                border: none;
                outline: none;
                padding: 0;
                color: rgb(142, 142, 142);
                overflow: hidden;
                /* background-color: tomato; */
                :focus {
                  border: 2px solid #a5c7fe;
                }
              }
              .ed_button_group {
                position: absolute;
                top: -37px;
                right: 0;
                display: flex;
                gap: 5px;
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
              .error {
                color: red;
                font-size: 13px;
              }
            }
          }
        }
      }
    }
    .btnbox {
      width: 60px;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      .comment_btn {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
`;

const StNotMineComment = styled.div`
  box-sizing: border-box;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  .NM_wrap {
    display: flex;
    justify-content: space-between;
    position: relative;
    .NM_userinfowrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .NM_username {
        height: 28px;
        font-weight: bold;
      }
      .NM_content {
        padding: 5px;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.23);
        color: rgb(142, 142, 142);
        white-space: wrap;
      }
    }
  }
`;
