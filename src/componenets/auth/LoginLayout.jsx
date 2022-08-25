import styled from "styled-components";
import Login from "./Login";

const LoginLayout = () => {
  return (
    <StLoginLayout>
      <Login />
    </StLoginLayout>
  );
};

export default LoginLayout;

const StLoginLayout = styled.div`
  padding-top: 100px;
  /* background-color: pink; */
`;
