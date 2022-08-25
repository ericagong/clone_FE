import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import Post from "../post/Post";

// TODO posts와 합치기?
// TODO contents 뺴서 해시태그 검색 링크 걸기
const ResultPosts = (props) => {
  const { hashtag } = useParams();

  const [tag, setTag] = useState(`#${hashtag}`);

  const [allPosts, setAllPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
  });

  const currPageNum = useRef(1);
  const pageLimit = useRef(5);
  const hasMorePosts = useRef(true);

  const getPosts = async () => {
    const resp = await apis.get_search_result(
      tag,
      currPageNum.current,
      pageLimit.current
    );
    const {
      result,
      status: { message },
      output,
    } = resp.data;

    // success
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.SEARCH.GET_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.SEARCH.GET_FAIL;

    // TODO modal 처리
    if (!result) {
      alert(message);
      return;
    }

    const { posts, ...rest } = output;

    setAllPosts((prev) => [...prev, ...posts]);
    setPageInfo({ ...pageInfo, ...rest });
    currPageNum.current += 1;
    hasMorePosts.current = rest.currpage !== rest.totalpage;
  };

  useEffect(() => {
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

  const postList = allPosts.map((post) => <Post key={post.id} {...post} />);

  console.log(tag);

  return (
    <>
      <div>{postList}</div>
    </>
  );
};

export default ResultPosts;
