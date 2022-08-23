import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";
import ImgView from "./ImgView";
import styled from "styled-components";

// TODO change to 정사각형
const Create = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState(true);
  const [fileUrls, setFileUrls] = useState([]);

  // TODO blob 알아보기
  const submitForm = async ({ content, files }) => {
    // const contentBlob = new Blob([json], { type: "application/json" });
    // const formData = new FormData();
    // formData.append("content", content);
    // formData.append("files", files);

    const hashtags = parseHashtags(content);

    // const resp = await apis.create_post(content, files, hashtags);
    // const { result, status: { message } } = resp.data;

    // success
    const {
      result,
      status: { message },
    } = RESP.POST.CREATE_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.CREATE_FAIL;

    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.CREATE_FAIL_AUTH;

    // TODO
    if (!result) {
      alert(message);
      return;
    }

    reset({ content: "", files: [] });
  };

  const changeImg = async (e) => {
    setIsLoading(true);

    const files = e.target.files;
    const fileList = Array.from(files);
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    setFileUrls([...urlList]);

    if (files.length !== 0) {
      setIsLoading(false);
    }
  };

  const onClickClose = () => {
    setIsLoading(true);
  };

  return (
    <StCreate>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="input_box">
          <input
            type="text"
            id="content"
            {...register("content", {
              required: "You should write content to create post.",
              maxLength: {
                value: 1000,
                message: "Content should be shorter than 1000 characters.",
              },
              validate: {
                notEmpty: (value) =>
                  notEmptyCheck(value) || "Content cannot be empty string.",
              },
            })}
          />
          {errors.content ? (
            <div className="error">{errors.content.message}</div>
          ) : null}
        </div>
        <div className="input_imgbox">
          <label htmlFor="img-file" className="input-file">
            <FaPaperclip />
          </label>
          <input
            {...register("files")}
            id="img-file"
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            multiple
            onChange={changeImg}
            style={{ display: "none" }}
          />
          <button type="submit">Create</button>
        </div>

        {!isLoading ? (
          <div className="x_btn_flex">
            <IoIosClose className="x_btn" onClick={onClickClose} />
          </div>
        ) : null}

        {!isLoading ? <ImgView imgUrls={fileUrls} /> : null}
      </form>
    </StCreate>
  );
};

export default Create;

const StCreate = styled.div`
  width: 500px;
  padding: 5px 10px 20px 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px;
  .input_box {
    width: 100%;
    input {
      width: 100%;
      height: 100px;
      padding: 0 15px;
      box-sizing: border-box;
      border: none;
      outline: none;
      border-radius: 8px;
      background-color: rgb(224, 224, 224);
    }
    .error {
      color: red;
      font-size: 13px;
    }
  }
  .input_imgbox {
    margin-top: 10px;
    display: flex;
    justify-content: end;
    gap: 20px;
    align-items: center;
    label {
      font-size: 27px;
      cursor: pointer;
      svg {
        fill: rgb(224 224 224);
        transition: all 0.4s;
        :hover {
          fill: #393838;
        }
      }
    }
    button {
      width: 70px;
      height: 30px;
      background-color: rgb(224, 224, 224);
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      /* font-weight: bold; */
      cursor: pointer;
      transition: all 0.4s;
      :hover {
        background-color: #393838;
        color: #fff;
      }
    }
  }
  .x_btn_flex {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: end;
    align-items: center;
    .x_btn {
      font-size: 27px;
      display: block;
      cursor: pointer;
      transition: all 0.4s;
      transform: scale(1);
      :hover {
        transform: scale(1.2);
      }
    }
  }
`;
