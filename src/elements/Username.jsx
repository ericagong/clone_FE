import { Link } from "react-router-dom";
import styled from "styled-components";

// TODO 상대경로 사용해봤음. 트러블슈팅.
const Username = ({ isme, username }) => {
  return (
    <StUserName>
      <Link
        to={!isme ? `/profile/${username}` : "/profile/"}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div className="name">{username}</div>
      </Link>
    </StUserName>
  );
};

export default Username;
const StUserName = styled.div`
  .name {
    font-size: 35px;
    font-weight: bold;
    color: #262626;
    line-height: 46px;
  }
`;
