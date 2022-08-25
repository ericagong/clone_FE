import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaRegPlusSquare } from "react-icons/fa";

import RESP from "../../server/response";
import SearchBar from "../../elements/SearchBar";
import UserProfile from "../../elements/UserProfile";
import { useEffect, useState } from "react";

// TODO header check 
const Header = () => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const [info, setInfo] = useState({
    username: "",
    userprofile: "",
    numposts: 0,
    numfollowing: 0,
    numfollowers: 0,
  });

  const getProfileInfo = async () => {
    // const resp = await apis.get_profile_info("");
    // const {
    //   result,
    //   status: { message },
    //   username,
    //   userprofile,
    //   numposts,
    //   numfollowing,
    //   numfollowers,
    // } = resp.data;

    // // success
    const {
      result,
      status: { message },
      output,
    } = RESP.PROFILE.GET_INFO_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    //    output,
    // } = RESP.PROFILE.GET_INFO_FAIL;

    if (!result) {
      alert(message);
      return;
    }

    setInfo({
      ...info,
      ...output,
    });
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  // console.log(info);
  return (
    <StHeader>
      <div className="header">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="logo">5witter</div>
        </Link>
        <SearchBar className="searchbar"></SearchBar>
        <div className="menu">
          <Link to="/">
            <div className="home">
              <FaHome className="svg" />
            </div>
          </Link>
          {isLogin ? (
            <>
              <Link to="/create" style={{ textDecoration: "none" }}>
                <div className="create">
                  <FaRegPlusSquare className="svg" />
                </div>
              </Link>
              <Link to="/profile/" style={{ textDecoration: "none" }}>
                <div className="profile">
                  <UserProfile userprofile={info.userprofile} inHeader={true} />
                </div>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgba(219, 219, 219);
  background-color: #fff;
  .header {
    max-width: 975px;
    min-width: 400px;
    height: 60px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    .logo {
      font-size: 32px;
      font-weight: bold;
      margin-left: 8px;
      color: #000;
    }
    .menu {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      align-items: center;
      margin-right: 8px;
      /* background-color: yellow; */
      .home {
        width: 30px;
        height: 30px;
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        .svg {
          fill: #000;
        }
      }
      .profile {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .create {
        width: 30px;
        height: 30px;
        font-size: 25px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        .svg {
          fill: #000;
        }
      }
    }
  }
`;