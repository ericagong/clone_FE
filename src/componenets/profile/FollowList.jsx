import { useState, useRef, useEffect } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import FollowInfo from "./FollowInfo";

// TODO infinite scroll 구현 with currPageNum
const FollowList = ({ username, curr }) => {
  const [allFollowList, setAllFollowList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 1,
    currcontent: 0,
    totalelements: 0,
    isme: false,
  });

  const currPageNum = useRef(1);
  const pageLimit = useRef(5);

  const getFollowList = async () => {
    if (curr === "Followings") {
      // const resp = await apis.get_profile_followings(
      //   username,
      //   pageNum,
      //   pageLimit
      // );
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = resp.data;

      // success
      let resp = {};
      if (username !== "") {
        resp = RESP.PROFILE.GET_FOLLOWINGS_SUCCESS;
      } else {
        resp = RESP.PROFILE.GET_MY_FOLLOWINGS_SUCCESS;
      }

      const {
        result,
        status: { message },
        output,
      } = resp;

      // fail
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = RESP.PROFILE.GET_FOLLOWINGS_FAIL;

      // TODO modal로 처리하기
      if (!result) {
        alert(message);
        return;
      }

      const { following, ...rest } = output;

      setAllFollowList((prev) => [...prev, ...following]);
      setPageInfo({ ...pageInfo, ...rest });
      currPageNum.current += 1;
    }
    // curr === 'Followers'
    else {
      // const resp = await apis.get_profile_followers(
      //   username,
      //   pageNum,
      //   pageLimit
      // );
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = resp.data;

      // success
      let resp = {};
      if (username !== "") {
        resp = RESP.PROFILE.GET_FOLLOWERS_SUCCESS;
      } else {
        resp = RESP.PROFILE.GET_MY_FOLLOWERS_SUCCESS;
      }

      const {
        result,
        status: { message },
        output,
      } = resp;

      // fail
      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = RESP.PROFILE.GET_FOLLOWERS_FAIL;

      // TODO modal로 처리하기
      if (!result) {
        alert(message);
        return;
      }

      const { followers, ...rest } = output;

      setAllFollowList((prev) => [...prev, ...followers]);
      setPageInfo({ ...pageInfo, ...rest });
    }
  };

  useEffect(() => {
    getFollowList();
  }, []);

  const getMore = () => {
    getFollowList();
  };

  const followingList = allFollowList.map((followInfo) => (
    <FollowInfo
      key={followInfo.username}
      {...followInfo}
      isme={pageInfo.isme}
      curr={curr}
    />
  ));

  console.log(pageInfo.currpage, pageInfo.totalpage);

  return (
    <>
      <div>{`${pageInfo.totalelements} ${curr}`}</div>
      <div>{followingList}</div>
      {pageInfo.currpage !== pageInfo.totalpage ? (
        <button type='button' onClick={getMore}>
          get more
        </button>
      ) : null}
    </>
  );
};

export default FollowList;
