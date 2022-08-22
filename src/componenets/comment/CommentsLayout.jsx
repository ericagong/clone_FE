import Comments from "./Comments";
import styled from "styled-components";

const CommentsLayout = () => {
  return (
    <StComments>
      <Comments />
    </StComments>
  );
};

export default CommentsLayout;

const StComments = styled.div`
  /* background-color: red; */
  border: 1px solid;
  box-sizing: border-box;
  width: 416px;
  /* height: 200px; */
  /* opacity: 0.1; */
`;
