import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";

import UserProfile from "../../elements/UserProfile";
import RESP from "../../server/response";

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

  // console.log(content);
  // console.log("comment :", content);

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
  console.log(showBtn);
  const submitForm = async ({ editContent }) => {
    //props 를 id, content, hashtags 줘야하는지
    const hashtags = parseHashtags(editContent);
    // console.log(editContent);

    const {
      result,
      status: { message },
      output,
    } = RESP.COMMENT.EDIT_SUCCESS;

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
    const {
      result,
      status: { message },
    } = RESP.COMMENT.DELETE_SUCCESS;

    console.log("삭제됨");
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

  // console.log(inEdit);
  return (
    <>
      {!isDeleted ? (
        <div className="card">
          {ismine ? (
            <StComment>
              <UserProfile
                className="userimg"
                userprofile={userprofile}
              ></UserProfile>
              <div className="wrap">
                <div className="userinfowrap">
                  <div className="username">{username}</div>
                  <div className="content">
                    {!inEdit ? (
                      <div>{currComment}</div>
                    ) : (
                      <form onSubmit={handleSubmit(submitForm)}>
                        <div>
                          <input
                            type="text"
                            id="editContent"
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
                          <button
                          // onClick={() => {
                          //   clickEdit();
                          // }}
                          >
                            save
                          </button>
                          <button onClick={toggleEdit}>cancel</button>

                          {errors.editComment ? (
                            <div>{errors.editComment.message}</div>
                          ) : null}
                        </div>
                      </form>
                    )}
                  </div>
                </div>
                {!showBtn ? null : (
                  <div className="btnbox">
                    <button onClick={toggleEdit}>편집</button>
                    <button onClick={clickDelete}>삭제</button>
                  </div>
                )}
              </div>
            </StComment>
          ) : (
            <StComment>
              <UserProfile
                className="userimg"
                userprofile={userprofile}
              ></UserProfile>
              <div className="wrap">
                <div className="userinfowrap">
                  <div className="username">{username}</div>
                  <div className="content">{currComment}</div>
                </div>
              </div>
            </StComment>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Comment;

const StComment = styled.div`
  background-color: pink;
  border: 1px solid;
  box-sizing: border-box;
  margin-bottom: 5px;
  width: 100%;
  /* height: 60px; */
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  .userimg {
    width: 60px;
    /* height: 60px; */
    background-color: greenyellow;
  }
  .wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .userinfowrap {
      width: 100%;
      .username {
        width: 100%;
        /* height: 30px; */
        background-color: tomato;
      }
      .content {
        width: 100%;
        /* height: 30px; */
        background-color: peru;
      }
    }
    .btnbox {
      display: flex;
      align-items: center;
      justify-content: center;
      /* flex-direction: column; */
      /* justify-content: flex-end; */
    }
  }
`;
