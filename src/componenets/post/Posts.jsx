import { useState, useEffect } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import Post from "./Post";

// TODO dispatch to create
// TODO infinite scroll 구현 with currPageNum
const Posts = ({ onProfile, username }) => {
  const [currPageNum, setCurrPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [allPosts, setAllPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
  });

  // TODO 코드 반복되는 부분 예쁘게 정리하기!
  const getPosts = async (pageNum, pageLimit, username) => {
    if (!onProfile) {
      // const resp = await apis.get_posts(pageNum, pageLimit);
      // const { result, status: { message }, output } = resp.data;

      // success
      const {
        result,
        status: { message },
        output,
      } = RESP.POST.GET_SUCCESS;

      // fail
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = RESP.POST.GET_FAIL;

      if (!result) {
        alert(message);
        return;
      }

      const { posts, ...rest } = output;

      setAllPosts([...allPosts, ...posts]);
      setPageInfo({ pageInfo, ...rest });
    } else {
      // const resp = await apis.get_profile_posts(
      //   username,
      //   pageNum,
      //   pageLimit
      // );
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = resp.data;

      // success
      let resp = {};
      if (username !== "") {
        resp = RESP.PROFILE.GET_POSTS_SUCCESS;
      } else {
        resp = RESP.PROFILE.GET_MY_POSTS_SUCCESS;
      }

      const {
        result,
        status: { message },
        output,
      } = resp;

      // fail
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = RESP.PROFILE.GET_POSTS_FAIL;

      // TODO modal로 처리하기
      if (!result) {
        alert(message);
        return;
      }

      const { posts, ...rest } = output;

      setAllPosts([...allPosts, ...posts]);
      setPageInfo({ ...pageInfo, ...rest });
    }
  };

  useEffect(() => {
    if (!onProfile) {
      getPosts(currPageNum, pageLimit);
      return;
    }
    getPosts(currPageNum, pageLimit, username);
  }, []);

  const postList = allPosts.map((post) => <Post key={post.id} {...post} />);

  // )

  return (
    <>
      <div>{postList}</div>
    </>
  );
};

export default Posts;
