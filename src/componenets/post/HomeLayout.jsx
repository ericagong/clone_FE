import { useSelector } from "react-redux";

import MiniUser from "../common/MiniUser";
import MiniLogin from "../common/MiniLogin";
import Create from "./Create";
import Posts from "./Posts";
import SearchBar from "../../elements/SearchBar";
import Rank from "../../componenets/common/Rank";
import styled from "styled-components";

const HomeLayout = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <StHomeLayout>
      <div id="left">
        {/* <div>left</div> */}
        {isLogin ? <MiniUser /> : <MiniLogin />}
      </div>
      <div id="center">
        {/* <div>center</div> */}
        <Create />
        <Posts onProfile={false} />
      </div>
      <div id="right">
        {/* <div>right</div> */}
        <SearchBar />
        <Rank />
      </div>
    </StHomeLayout>
  );
};

export default HomeLayout;

const StHomeLayout = styled.div`
  /* background-color: pink; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  #left {
    /* background-color: royalblue; */
    width: 240px;
  }
  #center {
    /* background-color: tomato; */
    width: 500px;
  }
  #right {
    /* background-color: peachpuff; */
    width: 210px;
  }
`;
