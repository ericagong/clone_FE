import { apis } from "../../shared/axios";
import RESP from "../../server/response";
import ImgView from "./ImgView";
import UserProfile from "../../elements/UserProfile";
import Username from "../../elements/Username";
import Content from "./Content";
import styled from "styled-components";

// edit delete
// TODO content hashtag Link
// TODO code spliting!
const Post = ({ userprofile, imageUrls, username, time, ismine, ...rest }) => {
  return (
    <StPost>
      <div>
        <div>
          {imageUrls.length !== 0 ? (
            <ImgView imgUrls={imageUrls} />
          ) : (
            <div className="no_img">No Images</div>
          )}
        </div>
        <div className="post_user_box">
          <div className="post_user_info">
            <UserProfile userprofile={userprofile} />
            <Username isme={ismine} username={username} />
          </div>
          <div>{time}</div>
        </div>
        <div>
          <Content ismine={ismine} {...rest} />
        </div>
      </div>
    </StPost>
  );
};

export default Post;

const StPost = styled.div`
  width: 500px;
  padding: 5px 10px;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 23%) 3px 3px 8px 0px;
  margin-bottom: 30px;
  /* background-color: pink; */
  .no_img {
    margin: 10px 0;
    text-align: center;
    padding: 15px 0;
    background-color: rgb(224, 224, 224);
    border-radius: 8px;
    /* background-color: pink; */
  }
  .post_user_box {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .post_user_info {
      display: flex;
      gap: 14px;
    }
  }
`;
