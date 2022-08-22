import { Link } from "react-router-dom";

// TODO 상대경로 사용해봤음. 트러블슈팅.
const Username = ({ isme, username }) => {
  return (
    <>
      <Link to={!isme ? `/profile/${username}` : "/profile/"}>
        <div>{username}</div>
      </Link>
    </>
  );
};

export default Username;
