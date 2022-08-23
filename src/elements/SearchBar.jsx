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
          <label htmlFor="search" className="search">
            <FaSearch />
          </label>
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
        </div>
        {errors.keyword ? (
          <div className="error">{errors.keyword.message}</div>
        ) : null}
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
    background-color: #fff;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgb(204, 204, 204);
    .search {
      /* font-size: ; */
      width: 40px;
      height: 40px;
      font-size: 22px;
      text-align: center;
      line-height: 40px;
      background-color: #ededed;
    }
    .search_input {
      width: 0px;
      padding: 0;
      background-color: transparent;
      border: none;
      outline: none;
      transition: width 0.4s;
      box-sizing: border-box;
      :focus {
        width: 160px;
      }
    }
  }
`;
