import { Link } from "react-router-dom";
import styled from "styled-components";

// TODO 상대경로 사용해봤음. 트러블슈팅.
const Username = ({ isme, username, inPost }) => {
  return (
    <StUserName inpost={inPost}>
      <Link
        to={!isme ? `/profile/${username}` : "/profile/"}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div className='name' inpost={inPost}>
          {username}
        </div>
      </Link>
    </StUserName>
  );
};

export default Username;
const StUserName = styled.div`
  .name {
    font-size: ${(props) => (!props.inpost ? "35px" : "15px")};
    font-weight: bold;
    color: #262626;
    line-height: 46px;
  }
`;
