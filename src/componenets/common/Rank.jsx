import { useEffect, useState } from "react";

import { apis } from "../../shared/axios";
// import RESP from "../../server/response";
import styled from "styled-components";

const Rank = (props) => {
  const [rank, setRank] = useState([]);
  const [isInit, setIsinit] = useState(false);

  const getRank = async () => {
    const resp = await apis.get_rank();
    const {
      result,
      status: { message },
      output,
    } = resp.data;

    // success : init
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.RANK.GET_INIT;

    // success : not-init
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.RANK.GET_SUCCESS;

    const { hashtags } = output;

    // TODO why !hashtags not working?
    if (hashtags.length === 0) {
      setIsinit(true);
      return;
    }

    setRank([...hashtags]);
    setIsinit(false);
  };

  useEffect(() => {
    getRank();
  }, []);

  const hashtagList = rank.map((item, i) => (
    <div className='tag' key={i}>
      <div className='tag_box'>
        <div className='s_title'>{item[0]}</div>
        <div className='tag_item'>{item[1]} posts</div>
      </div>
    </div>
  ));

  return (
    <StRank>
      <div className='rank_position'>
        <div className='rank_title'>Popular Hashtags</div>
        {isInit ? (
          <div className='init_hashList'>
            <p>You are our first user!</p>
            <p>Create Post to see Rank!</p>
          </div>
        ) : (
          <div className='tag_list'>{hashtagList}</div>
        )}
      </div>
    </StRank>
  );
};

export default Rank;
const StRank = styled.div`
  width: 220px;
  position: relative;
  .rank_position {
    box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px;
    padding: 15px 20px;
    .rank_title {
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 20px;
    }
    .init_hashList {
      font-size: 14px;
      white-space: normal;
      p {
        margin: 0 0 4px 0;
      }
    }
    .tag_list {
      .tag {
        .tag_box {
          margin-bottom: 5px;
          width: 100%;
          padding: 10px 0;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(69, 79, 93, 0.07);
          transform: scale(1);
          transition: all 0.4s;
          :hover {
            transform: scale(1.05);
            border-bottom: 1px solid rgba(69, 79, 93, 0.8);
          }
          .s_title {
            font-weight: bold;
          }
          .tag_item {
            font-size: 12px;
            color: rgb(158, 158, 158);
          }
        }
      }
    }
  }
`;
