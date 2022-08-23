import { useSelector } from "react-redux";

import MiniUser from "../common/MiniUser";
import MiniLogin from "../common/MiniLogin";
import Posts from "./Posts";
import SearchBar from "../../elements/SearchBar";
import Rank from "../../componenets/common/Rank";
import styled from "styled-components";

const HomeLayout = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <StHomeLayout>
      <div id='left'>
        {/* <MiniLogin />
        <MiniUser /> */}

        {isLogin ? <MiniUser /> : <MiniLogin />}
      </div>
      <div id='center'>
        <Posts onProfile={false} />
      </div>
      <div id='right'>
        <SearchBar />
        <Rank />
      </div>
    </StHomeLayout>
  );
};

export default HomeLayout;

const StHomeLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
