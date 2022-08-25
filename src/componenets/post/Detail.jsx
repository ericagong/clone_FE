import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apis } from "../../shared/axios";
import Post from "./Post";

const Detail = (props) => {
  const [post, setPost] = useState({
    id: 0,
    username: "",
    userprofile: "",
    content: "",
    imageurls: [],
    hashtags: [],
    time: "",
    ismine: false,
    isliked: false,
    isfollowing: false,
    numcomments: 0,
    numlikes: 0,
  });

  const { id } = useParams();

  const getPost = async () => {
    const resp = await apis.get_post(id);
    const {
      result,
      status: { message },
      output,
    } = resp.data;

    if (!result) {
      alert(message);
      return;
    }

    setPost({ ...post, ...output });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Post {...post} />
    </>
  );
};

export default Detail;
