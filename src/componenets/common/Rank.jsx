import { useEffect, useState } from "react";

import { apis } from "../../shared/axios";
import RESP from "../../server/response";

const Rank = (props) => {
  const [rank, setRank] = useState([]);
  const [isInit, setIsinit] = useState(false);

  // TODO check await
  const getRank = async () => {
    // const resp = await apis.get_rank();
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = resp.data;

    // success : init
    // const {
    //   result,
    //   status: { message },
    //   output,
    // } = RESP.RANK.GET_INIT;

    // success : not-init
    const {
      result,
      status: { message },
      output,
    } = RESP.RANK.GET_SUCCESS;

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
    <div key={i}>
      <div>{item[0]}</div>
      <div>{item[1]} posts</div>
    </div>
  ));

  return (
    <>
      <div>Popular Hashtags</div>
      {isInit ? (
        <div>You are our first user! Create Post to see Rank!</div>
      ) : (
        <div>{hashtagList}</div>
      )}
    </>
  );
};

export default Rank;
