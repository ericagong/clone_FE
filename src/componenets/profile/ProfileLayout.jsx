import { useParams } from "react-router-dom";

import Content from "./Content";
import UserDetail from "./UserDetail";

const ProfileLayout = (props) => {
  const { username } = useParams();

  return (
    <>
      <UserDetail username={username !== undefined ? username : ""} />
      <Content username={username !== undefined ? username : ""} />
    </>
  );
};

export default ProfileLayout;
