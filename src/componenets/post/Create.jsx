import { useForm } from "react-hook-form";
import { useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";
import ImgView from "./ImgView";

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

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <input
            type='text'
            id='content'
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
          {errors.content ? <div>{errors.content.message}</div> : null}
        </div>
        <button type='submit'>Create Post</button>
        <div>
          <input
            {...register("files")}
            id='files'
            type='file'
            accept='image/jpg, image/png, image/jpeg'
            multiple
            onChange={changeImg}
          />
        </div>
        {!isLoading ? <ImgView imgUrls={fileUrls} /> : null}
      </form>
    </>
  );
};

export default Create;
