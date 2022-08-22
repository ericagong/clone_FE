import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import Post from "../post/Post";

// TODO posts와 합치기?
// TODO contents 뺴서 해시태그 검색 링크 걸기
const ResultPosts = (props) => {
  const { hashtag } = useParams();

  const [keyword, setKeyword] = useState(`#${hashtag}`);
  const [currPageNum, setCurrPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [allPosts, setAllPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
  });

  // TODO 코드 반복되는 부분 예쁘게 정리하기!
  const getPosts = async (pageNum, pageLimit, tag) => {
    // const resp = await apis.get_search_result(tag, pageNum, pageLimit);
    // const { result, status: { message }, output } = resp.data;

    // success
    const {
      result,
      status: { message },
      output,
    } = RESP.SEARCH.GET_SUCCESS;

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

    setAllPosts([...allPosts, ...posts]);
    setPageInfo({ ...pageInfo, ...rest });
  };

  useEffect(() => {
    getPosts(currPageNum, pageLimit);
  }, []);

  const postList = allPosts.map((post) => <Post key={post.id} {...post} />);

  return (
    <>
      <div>{postList}</div>
    </>
  );
};

export default ResultPosts;
