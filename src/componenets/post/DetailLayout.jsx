import { useParams } from "react-router-dom";

import Posts from "./Posts";

const DetailLayout = (props) => {
  const { id } = useParams();

  return (
    <>
      <Posts targetId={id} />
    </>
  );
};

export default DetailLayout;
