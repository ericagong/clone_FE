import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";
import ImgView from "./ImgView";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";
import Content from "./Content";
import styled from "styled-components";

// edit delete
// TODO content hashtag Link
// TODO code spliting!
const Post = ({
  userprofile,
  imageUrls,
  username,
  time,
  content,
  ismine,
  isfollowing,
  ...rest
}) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const [isFollowing, setIsFollowing] = useState(isfollowing);
  const [showMore, setShowMore] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [currContent, setCurrContent] = useState(content);
  const [isDeleted, setIsDeleted] = useState(false);

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

  const toggleMore = () => {
    if (!isLogin) {
      alert("Sorry. Only logged in user can see more.");
      return;
    }

    setShowMore((prev) => !prev);
  };

  // 서버에 요청만 보내고, 리렌더링 하지 않고 토글처리만 하기!
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

  // TODO store값 변경 안해주고 그냥 프론트 독단으로 처리해도 되는지?
  const clickDelete = async () => {
    // const resp = await apis.delete_post(id);
    // const {
    //   result,
    // 	status: { message },
    // } = resp.data;

    // success

    const {
      result,
      status: { message },
    } = RESP.POST.DELETE_SUCCESS;

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

    // TODO output 기반 store의 posts값 변경하기?
    setIsDeleted(true);
  };

  // TODO store값 변경 안해주고 그냥 프론트 독단으로 처리해도 되는지?
  const submitForm = async ({ editContent }) => {
    const hashtags = parseHashtags(editContent);

    // const resp = await apis.edit_post(id, editContent, hashtags);
    // const {
    //   result,
    // 	status: { message },
    // 	output
    // } = resp.data;

    // success
    const {
      result,
      status: { message },
      output,
    } = RESP.POST.EDIT_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.EDIT_FAIL;

    // const {
    //   result,
    //   status: { message },
    // } = RESP.POST.EDIT_FAIL_AUTH;

    // TODO
    if (!result) {
      alert(message);
      return;
    }

    // TODO output 기반 store의 posts값 변경하기

    setInEdit((prev) => !prev);
    setCurrContent(editContent);
  };

  return (
    <>
      {!isDeleted ? (
        <StPost>
          <div>
            <div className='post_user_info'>
              <UserProfile userprofile={userprofile} inPost={true} />
              <Username isme={ismine} username={username} />
              <div>
                {!showMore ? (
                  <button type='button' onClick={toggleMore}>
                    Show more
                  </button>
                ) : (
                  <button type='button' onClick={toggleMore}>
                    Hide
                  </button>
                )}
                {showMore ? (
                  <div>
                    {!ismine && !isFollowing ? (
                      <button type='button' onClick={toggleFollow}>
                        Follow this user
                      </button>
                    ) : null}
                    {!ismine && isFollowing ? (
                      <button type='button' onClick={toggleFollow}>
                        Unfollow this user
                      </button>
                    ) : null}
                    {ismine ? (
                      <div>
                        <button type='button' onClick={toggleEdit}>
                          Edit this post
                        </button>
                        <button type='button' onClick={clickDelete}>
                          Delete this post
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
            <div>{time}</div>
            <div>
              {imageUrls.length !== 0 ? <ImgView imgUrls={imageUrls} /> : null}
            </div>
            <div className='post_user_box'></div>
            <div>
              {!inEdit ? (
                <Content content={currContent} {...rest} />
              ) : (
                <form onSubmit={handleSubmit(submitForm)}>
                  <div>
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
                      <div>{errors.editContent.message}</div>
                    ) : null}
                  </div>
                  <button type='submit'>Save Post</button>
                  <button type='button' onClick={toggleEdit}>
                    Cancel
                  </button>
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
  /* background-color: pink; */
  .no_img {
    margin: 10px 0;
    text-align: center;
    padding: 15px 0;
    background-color: rgb(224, 224, 224);
    border-radius: 8px;
    /* background-color: pink; */
  }
  .post_user_box {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .post_user_info {
      display: flex;
      gap: 14px;
    }
  }
`;
