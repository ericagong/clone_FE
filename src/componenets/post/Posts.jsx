import { useState, useEffect, useRef } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import Post from "./Post";

// TODO check hasMorePosts!
const Posts = ({ onProfile, username, targetId }) => {
  const [allPosts, setAllPosts] = useState([]);
  const currPageNum = useRef(1);
  const pageLimit = useRef(5);
  const hasMorePosts = useRef(true);

  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
  });

  // TODO 코드 반복되는 부분 예쁘게 정리하기!
  const getPosts = async () => {
    if (!onProfile) {
      const resp = await apis.get_posts(currPageNum.current, pageLimit.current);
      const {
        result,
        status: { message },
        output,
      } = resp.data;

      console.log(`getPosts called!`);
      console.log(`\t pageNum: ${currPageNum.current}`);
      console.log(`\t pageLimit: ${pageLimit.current}`);

      console.log(resp);
      // success
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = RESP.POST.GET_SUCCESS;

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

      setAllPosts((prev) => [...prev, ...posts]);
      setPageInfo({ ...pageInfo, ...rest });
      currPageNum.current += 1;
      hasMorePosts.current = rest.currpage !== rest.totalpage;
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

      setAllPosts((prev) => [...prev, ...posts]);
      setPageInfo({ ...pageInfo, ...rest });
      currPageNum.current += 1;
      hasMorePosts.current = rest.currpage !== rest.totalpage;
    }
  };

  useEffect(() => {
    if (!onProfile) {
      getPosts();
      return;
    }
    getPosts();
  }, []);

  useEffect(() => {
    const onScorll = () => {
      const threshold = 10;
      const shouldCall =
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - threshold;
      if (shouldCall && hasMorePosts.current) {
        getPosts();
      }
    };
    window.addEventListener("scroll", onScorll);

    return () => {
      window.removeEventListener("scroll", onScorll);
    };
  }, [getPosts]);

  // const postList = allPosts.map((post) => <Post key={post.id} {...post} />);

  const postList =
    targetId === undefined
      ? allPosts.map((post) => <Post key={post.id} {...post} />)
      : allPosts
          .filter((post) => post.id === parseInt(targetId))
          .map((post) => <Post key={post.id} {...post} goDetail={true} />);

  return (
    <>
      <div>{postList}</div>
    </>
  );
};

export default Posts;
