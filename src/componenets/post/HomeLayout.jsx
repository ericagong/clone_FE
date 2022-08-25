import { useSelector } from "react-redux";

import MiniUser from "../common/MiniUser";
import MiniLogin from "../common/MiniLogin";
import Posts from "./Posts";

import Rank from "../../componenets/common/Rank";
import styled from "styled-components";

const HomeLayout = () => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <StHomeLayout>
      <div>{isLogin ? <MiniUser /> : <MiniLogin />}</div>
      <div>
        <Posts onProfile={false} />
      </div>
      <Rank />
    </StHomeLayout>
  );
};

export default HomeLayout;

const StHomeLayout = styled.div`
  padding-top: 20px;
  width: 1100px;
  /* min-width: 500px; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
