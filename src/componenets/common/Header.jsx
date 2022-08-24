import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../../elements/SearchBar";

const Header = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <StHeader>
      <Link to='/home' style={{ textDecoration: "none" }}>
        <div className='logo'>5witter</div>
      </Link>
      {isLogin ? (
        <div>
          <Link to='/profile/' style={{ textDecoration: "none" }}>
            <div className='profile'>Profile</div>
          </Link>
          <Link to='/create' style={{ textDecoration: "none" }}>
            <div className='create'>Create</div>
          </Link>
        </div>
      ) : null}
      {/* <hr style={{ backgroundColor: "black", width: "100%", height: "1px" }} /> */}
      <SearchBar className='searchbar'></SearchBar>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 75px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.23);
  /* background-color: pink; */
  display: flex;
  align-items: center;
  gap: 15px;
  .logo {
    font-size: 32px;
    font-weight: bold;
  }
  .profile {
    color: royalblue;
    font-size: 30px;
    font-weight: bold;
  }
  .create {
    color: royalblue;
    font-size: 30px;
    font-weight: bold;
  }
`;
