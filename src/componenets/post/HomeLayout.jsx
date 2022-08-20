import { useSelector } from "react-redux";

import MiniUser from "../common/MiniUser";
import MiniLogin from "../common/MiniLogin";
import Create from "./Create";
import Posts from "./Posts";
import SearchBar from "../../elements/SearchBar";
import Rank from "../../componenets/common/Rank";

const HomeLayout = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <>
      <div id='left'>
        <div>left</div>
        {isLogin ? <MiniUser /> : <MiniLogin />}
      </div>
      <div id='center'>
        <div>center</div>
        <Create />
        <Posts />
      </div>
      <div id='right'>
        <div>right</div>
        <SearchBar />
        <Rank />
      </div>
    </>
  );
};

export default HomeLayout;
