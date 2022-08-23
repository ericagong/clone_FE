import styled from "styled-components";
import Login from "../auth/Login";

// TODO change to mini size!
const MiniLogin = (props) => {
  return (
    <StMiniLogin>
      <Login />
    </StMiniLogin>
  );
};

export default MiniLogin;

const StMiniLogin = styled.div`
  padding: 10px 0;
  width: 270px;
  box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px;
`;
