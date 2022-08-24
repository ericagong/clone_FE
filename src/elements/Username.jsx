import { Link } from "react-router-dom";
import styled from "styled-components";

// TODO 상대경로 사용해봤음. 트러블슈팅.
const Username = ({ isme, username, inPost }) => {
  // console.log(inPost);
  return (
    <StUserName inpost={inPost}>
      <Link
        to={!isme ? `/profile/${username}` : "/profile/"}
        style={{ textDecoration: "none", display: "block" }}
      >
        <StuserName inpost={inPost}>{username}</StuserName>

      </Link>
    </StUserName>
  );
};

export default Username;
const StUserName = styled.div`

  /* .name {
    font-size: 35px;
    font-weight: bold;
    color: #262626;
    line-height: 46px;
  } */
`;

const StuserName = styled.div`
  font-size: ${(props) => (!props.inpost ? "35px" : "20px")};
  font-weight: bold;
  color: #262626;
  line-height: 46px;
`;
