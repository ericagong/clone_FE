import styled from "styled-components";

const Layout = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 100%;
  min-width: 450px;
  position: relative;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  background-color: rgb(250, 250, 250);
`;

export default Layout;
