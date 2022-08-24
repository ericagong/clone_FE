import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../../elements/SearchBar";
import { HOME_PATH, PROFILE_MY_PATH, CREATE_PATH } from "../../shared/paths";

const Header = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <StHeader>
      <Link to={HOME_PATH} style={{ textDecoration: "none" }}>
        <div className='logo'>5witter</div>
      </Link>
      {isLogin ? (
        <div>
          <Link to={PROFILE_MY_PATH} style={{ textDecoration: "none" }}>
            <div className='profile'>Profile</div>
          </Link>
          <Link to={CREATE_PATH} style={{ textDecoration: "none" }}>
            <div className='create'>Create</div>
          </Link>
        </div>
      ) : null}
      <SearchBar className='searchbar'></SearchBar>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  width: 100%;
  height: 75px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.23);
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
