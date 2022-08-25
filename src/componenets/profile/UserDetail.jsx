import { useState, useEffect } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";
import styled from "styled-components";

const UserDetail = ({ username }) => {
  const [info, setInfo] = useState({
    username: username,
    userprofile: "",
    numposts: 0,
    numfollowing: 0,
    numfollowers: 0,
  });

  const getProfileInfo = async () => {
    // const resp = await apis.get_profile_info(username);
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

  return (
    <StUserDetail>
      <div className="top">
        <UserProfile userprofile={info.userprofile} />
        <Username isme={!username ? true : false} username={info.username} />
      </div>
    </StUserDetail>
  );
};

export default UserDetail;

const StUserDetail = styled.div`
  .top {
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
