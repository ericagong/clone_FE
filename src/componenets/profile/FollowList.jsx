import { useState, useRef, useEffect } from "react";

import { apis } from "../../shared/axios";
// import RESP from "../../server/response";
import FollowInfo from "./FollowInfo";
import styled from "styled-components";

// TODO infinite scroll 구현 with currPageNum
const FollowList = ({ username, curr }) => {
  const [allFollowList, setAllFollowList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currpage: 0,
    totalpage: 0,
    currcontent: 0,
    totalelements: 0,
    isme: false,
  });

  const currPageNum = useRef(1);
  const pageLimit = useRef(5);

  const getFollowList = async () => {
    if (curr === "Followings") {
      const resp = await apis.get_profile_followings(
        username || "",
        currPageNum.current,
        pageLimit.current
      );
      const {
        result,
        status: { message },
        output,
      } = resp.data;

      // success
      // let resp = {};
      // if (username !== "") {
      //   resp = RESP.PROFILE.GET_FOLLOWINGS_SUCCESS;
      // } else {
      //   resp = RESP.PROFILE.GET_MY_FOLLOWINGS_SUCCESS;
      // }

      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = resp;

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
      const resp = await apis.get_profile_followers(
        username,
        currPageNum.current,
        pageLimit.current
      );
      const {
        result,
        status: { message },
        output,
      } = resp.data;

      // success
      // let resp = {};
      // if (username !== "") {
      //   resp = RESP.PROFILE.GET_FOLLOWERS_SUCCESS;
      // } else {
      //   resp = RESP.PROFILE.GET_MY_FOLLOWERS_SUCCESS;
      // }

      // const {
      //   result,
      //   status: { message },
      //   output,
      // } = resp;

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
      currPageNum.current += 1;
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

  return (
    <StFollow>
      <div className='list_header'>{`${pageInfo.totalelements} ${curr}`}</div>
      <div className='list_body'>{followingList}</div>
      {pageInfo.totalelements !== 0 &&
      pageInfo.currpage !== pageInfo.totalpage ? (
        <button type='button' onClick={getMore} className='more'>
          get more
        </button>
      ) : null}
    </StFollow>
  );
};

export default FollowList;

const StFollow = styled.div`
  /* background-color: pink; */
  width: 500px;
  .list_header {
    /* background-color: skyblue; */
    text-align: center;
    padding: 7px 0;
    font-weight: bold;
    font-size: 20px;
  }
  .list_body {
    padding: 0 5px;
    box-sizing: border-box;
    /* background-color: pink; */
  }
  .more {
    outline: none;
    border: none;
    background-color: #eee;
    border: 1px solid rgba(69, 79, 93, 0.15);
    border-radius: 7px;
    :hover {
      background-color: #ddd;
    }
  }
`;
