import styled from "styled-components";

const Layout = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 90vw;
  max-width: 1200px;
  min-width: 450px;
  position: relative;
  margin: auto;
  box-sizing: border-box;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  background-color: "#FFFFFF";
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow: hidden;
`;

export default Layout;
