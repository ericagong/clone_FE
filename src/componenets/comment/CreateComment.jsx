import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import RESP from "../../server/response";
import { parseHashtags } from "../../shared/regex";
import styled from "styled-components";
import { useNavigate, useMatch } from "react-router-dom";
import { apis } from "../../shared/axios";

const CreateComment = ({ id, content }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const url = useMatch(`/detail/${id}`);

  const submitForm = async ({ content }) => {
    const hashtags = parseHashtags(content);

    const resp = await apis.create_comment(id, content, hashtags);
    const {
      result,
      status: { message },
    } = resp.data;

    //success
    // const {
    //   result,
    //   status: { message },
    // } = RESP.COMMENT.CREATE_SUCCESS;

    //fail
    // const{
    //   result,
    //   status:{message},
    // } = RESP.COMMENT.CREATE_FAIL

    if (!result) {
      alert(message);
      return;
    }

    navigate(`/detail/${id}`);
    alert(message);
  };

  return (
    <StCreateComment>
      {url === null ? (
        <form onSubmit={handleSubmit(submitForm)}>
          <div className='input_box'>
            <input
              type='text'
              id='content'
              {...register("content", {
                required: "You should write Comments to upload comments.",
                maxLength: {
                  value: 1000,
                  message: "Content should be shorter than 1000 characters.",
                },
              })}
            />

            <button type='submit'>posting</button>
          </div>
          {errors.CreateComments ? (
            <div className='error'>{errors.CreateComments.message}</div>
          ) : null}
        </form>
      ) : null}
    </StCreateComment>
  );
};

export default CreateComment;

const StCreateComment = styled.div`
  form {
    /* background-color: pink; */
    .input_box {
      margin-top: 5px;
      position: relative;
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      input {
        width: 80%;
        height: 30px;
        border: none;
        outline: none;
        padding: 0;
        border-radius: 8px;
        padding: 0 5px;
        border: 1px solid rgba(69, 79, 93, 0.4);
        :focus {
          border: 2px solid #a5c7fe;
        }
      }

      button {
        outline: none;
        border: none;
        background-color: #eee;
        border: 1px solid rgba(69, 79, 93, 0.15);
        border-radius: 7px;
        /* font-weight: bold; */
        :hover {
          background-color: #ddd;
        }
      }
    }
  }
  .error {
    color: red;
    font-size: 13px;
  }
`;
