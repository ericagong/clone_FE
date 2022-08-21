import { useState } from "react";

const ImgView = ({ imgUrls }) => {
  const [currImg, setCurrImg] = useState(0);
  const [lastImg, setLastImg] = useState(imgUrls.length - 1);

  const clickPrev = () => {
    setCurrImg((prev) => (prev - 1 < 0 ? lastImg : prev - 1));
  };

  const clickNext = () => {
    setCurrImg((prev) => (prev + 1 > lastImg ? 0 : prev + 1));
  };

  return (
    <>
      <div>
        <button type='button' onClick={clickPrev}>
          prev
        </button>
        <img src={imgUrls[currImg]} alt='img' width='300px' />
        <div>
          {currImg + 1}/ {lastImg + 1}
        </div>
        <button type='button' onClick={clickNext}>
          next
        </button>
      </div>
    </>
  );
};

export default ImgView;
