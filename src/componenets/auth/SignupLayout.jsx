import styled from "styled-components";
import Signup from "./Signup";

const SignupLayout = () => {
  return (
    <StSignupLayout>
      <Signup />
    </StSignupLayout>
  );
};

export default SignupLayout;

const StSignupLayout = styled.div`
  /* background-color: pink; */
  margin-top: 20px;
  /* height: 900px; */
  /* box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px; */
`;
