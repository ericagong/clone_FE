import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { getPostsRequest, getPostsDone } from "../../modules/redux/post";
import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import Post from "./Post";
// TODO dispatch to create
// TODO infinite scroll 구현 with currPageNum
const Posts = ({ onProfile, username }) => {
  const isLoading = useSelector((state) => state.post.isLoading);
  // const currPage = useSelector((state) => state.post.currPage);

  const dispatch = useDispatch();

  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const currPageNum = useRef(1);
  const pageLimit = useRef(5);

  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
  });

  // TODO 코드 반복되는 부분 예쁘게 정리하기!
  const getPosts = async () => {
    if (!hasMorePosts) {
      return;
    }

    // TODO 전역 axios 가 프라미스 반환하게 바꾸거나, 아니면 then으로 변경해야함.
    if (!onProfile) {
      // const resp = await apis.get_posts(pageNum, pageLimit);
      // const { result, status: { message }, output } = resp.data;

      dispatch(getPostsRequest());

      console.log(`getPosts called!`);
      console.log(`\t pageNum: ${currPageNum.current}`);
      console.log(`\t pageLimit: ${pageLimit}`);

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

      setAllPosts((prev) => [...prev, ...posts]);
      setPageInfo({ ...pageInfo, ...rest });
      currPageNum.current += 1;

      dispatch(getPostsDone());
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
      getPosts();
      return;
    }
    getPosts(currPageNum, pageLimit, username);
  }, []);

  useEffect(() => {
    const onScorll = () => {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );
      const threshold = 300;
      const shouldCall =
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - threshold;
      if (shouldCall && !isLoading) {
        // isLoading으로 해결
        getPosts(); // 계속 호출 문제 -> throttle or takelatest
      }
    };
    window.addEventListener("scroll", onScorll);

    return () => {
      window.removeEventListener("scroll", onScorll);
    };
  }, []);

  console.log(allPosts);
  console.log(pageInfo);
  console.log(currPageNum);

  const postList = allPosts.map((post) => <Post key={post.id} {...post} />);

  // )

  return (
    <>
      <div>{postList}</div>
    </>
  );
};

export default Posts;
