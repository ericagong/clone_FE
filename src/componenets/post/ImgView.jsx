import { useState } from "react";
import styled from "styled-components";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ImgView = ({ imgUrls }) => {
  const [currImg, setCurrImg] = useState(0);
  const [lastImg, setLastImg] = useState(imgUrls.length - 1);

  const clickPrev = () => {
    setCurrImg((prev) => (prev - 1 < 0 ? lastImg : prev - 1));
    console.log("prev");
  };

  const clickNext = () => {
    setCurrImg((prev) => (prev + 1 > lastImg ? 0 : prev + 1));
  };

  return (
    <StImgView>
      <div className="img">
        <div className="btn_box">
          <FaChevronCircleLeft className="icon_left" onClick={clickPrev} />
          <FaChevronCircleRight className="icon_right" onClick={clickNext} />
        </div>
        <img src={imgUrls[currImg]} alt="img" />
        <div className="img_page">
          {currImg + 1}/ {lastImg + 1}
        </div>
      </div>
    </StImgView>
  );
};

export default ImgView;

const StImgView = styled.div`
  width: 100%;
  .img {
    width: 95%;
    position: relative;
    margin: 0 auto;
    .btn_box {
      width: 100%;
      position: absolute;
      top: 50%;
      /* background-color: red; */
      display: flex;
      justify-content: space-between;
      .icon_left {
        font-size: 24px;
        fill: #f6f6f6;
        opacity: 0.5;
        transition: all 0.4s;
        :hover {
          opacity: 0.9;
        }
      }
      .icon_right {
        font-size: 24px;
        fill: #f6f6f6;
        opacity: 0.5;
        transition: all 0.4s;
        :hover {
          opacity: 0.9;
        }
      }
    }
    img {
      width: 100%;
    }
    .img_page {
      text-align: center;
      margin-top: 5px;
      border: 1px solid #eee;
    }
  }
`;
