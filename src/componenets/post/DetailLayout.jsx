import { useState } from "react";
import { useParams } from "react-router-dom";

import Posts from "./Posts";

const DetailLayout = (props) => {
  const { id } = useParams();
  // console.log(id);
  // console.log(allPosts);

  return (
    <>
      <Posts targetId={id} />
    </>
  );
};

export default DetailLayout;
