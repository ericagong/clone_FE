import styled from "styled-components";

const userProfile = ({ userprofile }) => {
  return (
    <StImgBox>
      <img src={userprofile} alt="profile" />
    </StImgBox>
  );
};

export default userProfile;

const StImgBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #b9b9a9;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
  }
`;
