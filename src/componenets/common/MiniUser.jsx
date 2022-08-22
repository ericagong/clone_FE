import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import { logout } from "../../modules/redux/user";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";

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
    <>
      <div>
        <UserProfile userprofile={info.userprofile} />
        <Username isme={true} username={info.username} />
        <button type='button' onClick={onLogoutHandler}>
          Logout
        </button>
      </div>
      <div>
        <div>
          <div>Posts</div>
          <div>{info.numposts}</div>
        </div>
        <div>
          <div>Following</div>
          <div>{info.numfollowing}</div>
        </div>
        <div>
          <div>Follwers</div>
          <div>{info.numfollowers}</div>
        </div>
      </div>
    </>
  );
};

export default MiniUser;
