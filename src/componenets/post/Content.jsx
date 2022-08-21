import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { parseHashtags, notEmptyCheck } from "../../shared/regex";
import LikeBtn from "../../elements/LikeBtn";

// TODO 중복 해시태그?
// TODO reducer C, U, D 연결
// TODO 더보기 버튼 위로 빼기!!
// TODO store값 변경 안해주고 그냥 프론트 독단으로 처리해도 되는지?
const Content = ({
  id,
  content,
  ismine,
  isfollowing,
  isliked,
  numlikes,
  numcomments,
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

  const [showComment, setShowComment] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [inEdit, setInEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currContent, setCurrContent] = useState(content);

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

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

  return (
    <>
      {!isDeleted ? (
        <div>
          <div>
            {!inEdit ? (
              <div>{currContent}</div>
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
          <div>
            <div>
              <LikeBtn isliked={isliked} isLogin={isLogin} />
              <div>{numlikes}</div>
            </div>
            <div>
              {!showComment ? (
                <button type='button' onClick={toggleComment}>
                  Show Comments
                </button>
              ) : (
                <button type='button' onClick={toggleComment}>
                  Hide Comments
                </button>
              )}
              <div>{numcomments}</div>
            </div>
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
          <div>
            <div style={{ marginBottom: "30px" }}>
              {showComment ? <div>Comments List!</div> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Content;
