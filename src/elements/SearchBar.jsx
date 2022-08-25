import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import { SEARCH_PATH } from "../shared/paths";
import { isHashtagCheck, noSpaceCheck, oneHashtagCheck } from "../shared/regex";
import Rank from "../componenets/common/Rank";
import { useState } from "react";

const SearchBar = (props) => {
  // const [isClick, setIsClick] = useState(false);
  // const onClick = (e) => {
  //   e.stopPropagation();
  //   console.log("누름");
  //   setIsClick((prev) => !prev);
  // };
  // console.log(isClick);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  // TODO 공통된 요소니까 그냥 Layout에 얹어 놓는게 나을듯!?
  // TODO 자동완성?
  const onSubmitHandler = ({ keyword }) => {
    const tag = keyword.slice(1);
    navigate(`${SEARCH_PATH}/${tag}`);
    reset({ keyword: "" });
  };

  return (
    <StSearchBar>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="hash_input_box">
          <input
            type="text"
            placeholder="#hashtag"
            className="search_input"
            id="search"
            {...register("keyword", {
              required: "You should type keyword for hashtag search.",
              validate: {
                isHashtag: (value) =>
                  isHashtagCheck(value) || "You can search in hashtag format.",
                noSpace: (value) =>
                  noSpaceCheck(value) || "Hashtag is not proper.",
                oneHashtag: (value) =>
                  oneHashtagCheck(value) ||
                  "You can search only one hashtag at once.",
              },
            })}
          />
          {/* {errors.keyword ? (
            <div className="error">{errors.keyword.message}</div>
          ) : null} */}
          <FaSearch className="icon" />
        </div>
      </form>
    </StSearchBar>
  );
};

export default SearchBar;

const StSearchBar = styled.div`
  margin-top: 5px;
  .error {
    width: 210px;
    text-align: center;
    font-size: 13px;
    color: red;
    white-space: wrap;
  }
  .hash_input_box {
    height: 40px;
    background-color: rgb(239, 239, 239);
    display: flex;
    align-items: center;
    border-radius: 8px;
    gap: 5px;
    color: rgb(239, 239, 239);
    padding: 0 16px;
    .icon {
      font-size: 16px;
      fill: rgb(142, 142, 142);
    }
    .search_input {
      width: 236px;
      padding: 0;
      background-color: transparent;
      border: none;
      outline: none;
      transition: width 0.4s;
      box-sizing: border-box;
      /* :focus .icon {
        display: none;
      } */
    }
  }
  .search_input :focus .icon {
    display: none;
  }
`;
