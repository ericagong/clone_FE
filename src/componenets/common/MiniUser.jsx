import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { logout } from "../../modules/redux/user";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";
import styled from "styled-components";

// TODO check cookie issue after axios connection.
const MiniUser = (props) => {
  const [info, setInfo] = useState({
    username: "",
    userprofile: "",
    numposts: 0,
    numfollowing: 0,
    numfollowers: 0,
  });

  const dispatch = useDispatch();

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
    // 	output,
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

  const onLogoutHandler = async () => {
    // const resp = await apis.logout();
    // const {
    //   result,
    //   status: { message },
    // } = resp.data;

    // success
    const {
      result,
      status: { message },
    } = RESP.AUTH.LOGOUT_SUCCESS;

    // fail
    // const {
    //   result,
    //   status: { message },
    // } = RESP.AUTH.LOGOUT_FAIL;

    dispatch(logout());

    localStorage.removeItem("AccessToken");
  };

  return (
    <StMiniUser>
      <div className="profile_box">
        <UserProfile userprofile={info.userprofile} />
        <Username isme={true} username={info.username} />
        <button type="button" onClick={onLogoutHandler}>
          Logout
        </button>
      </div>
      <div className="info_box">
        <div className="info_item">
          <div className="title">Posts</div>
          <div className="total">{info.numposts}</div>
        </div>
        <div className="info_item">
          <div className="title">Following</div>
          <div className="total">{info.numfollowing}</div>
        </div>
        <div className="info_item">
          <div className="title">Follwers</div>
          <div className="total">{info.numfollowers}</div>
        </div>
      </div>
    </StMiniUser>
  );
};

export default MiniUser;

const StMiniUser = styled.div`
  width: 270px;
  box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px;
  .profile_box {
    height: 60px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.23);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    button {
      width: 55px;
      height: 30px;
      background-color: rgb(224, 224, 224);
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
      cursor: pointer;
      transition: all 0.4s;
      :hover {
        background-color: #393838;
        color: #fff;
      }
    }
  }
  .info_box {
    padding: 5px 0 15px 0;
    display: flex;
    .info_item {
      width: 90px;
      text-align: center;
      color: #393838;
      .title {
        margin-bottom: 5px;
        font-weight: bold;
        cursor: pointer;
      }
      .total {
        font-weight: normal;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
`;
