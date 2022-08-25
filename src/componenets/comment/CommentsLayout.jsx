import styled from "styled-components";

import Comments from "./Comments";

const CommentsLayout = () => {
  return (
    <StComments>
      <Comments />
    </StComments>
  );
};

export default CommentsLayout;

const StComments = styled.div`
  margin-top: 15px;
  box-sizing: border-box;
  width: 100%;
`;
