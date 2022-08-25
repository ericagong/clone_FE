import { useState } from "react";
import styled from "styled-components";

import Posts from "../post/Posts";
import FollowList from "./FollowList";

const Content = ({ username }) => {
  const [curr, setCurr] = useState("Posts");

  const clickCategory = (e) => {
    const id = e.target.id;
    if (curr !== id) {
      setCurr(id);
    }
  };

  return (
    <StPorfileContent>
      <div className="category">
        <button type="button" id="Posts" onClick={clickCategory}>
          Posts
        </button>
        <button type="button" id="Followings" onClick={clickCategory}>
          Followings
        </button>
        <button type="button" id="Followers" onClick={clickCategory}>
          Followers
        </button>
      </div>
      <div>
        {curr === "Posts" ? (
          <Posts onProfile={true} username={username} />
        ) : null}
        {curr === "Followings" ? (
          <FollowList username={username} curr={curr} />
        ) : null}
        {curr === "Followers" ? (
          <FollowList username={username} curr={curr} />
        ) : null}
      </div>
    </StPorfileContent>
  );
};

export default Content;
const StPorfileContent = styled.div`
  .category {
    border-top: 1px solid #000;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    button {
      width: calc((100% - 20px) / 3);
      outline: none;
      border: none;
      background-color: #eee;
      border: 1px solid rgba(69, 79, 93, 0.15);
      border-radius: 7px;
      :hover {
        background-color: #ddd;
      }
    }
  }
`;
