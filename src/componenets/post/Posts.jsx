import { useState, useEffect } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import Post from "./Post";

// TODO dispatch to create
// TODO infinite scroll 구현 with currPageNum
const Posts = (props) => {
  const [currPageNum, setCurrPageNum] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
  });

  const getPosts = async (pageNum, pageLimit) => {
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
  };

  useEffect(() => {
    getPosts();
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
