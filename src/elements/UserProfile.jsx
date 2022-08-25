import styled from "styled-components";

const userProfile = ({ userprofile, inHeader }) => {
  // console.log(inHeader);
  return (
    <StImgBox inHeader={inHeader}>
      <img src={userprofile} alt="profile" />
    </StImgBox>
  );
};

export default userProfile;

const StImgBox = styled.div`
  width: ${(props) => (!props.inHeader ? "56px" : "25px")};
  height: ${(props) => (!props.inHeader ? "56px" : "25px")};
  border-radius: 50%;
  background-color: #b9b9a9;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: ${(props) => (!props.inHeader ? "56px" : "25px")};
    height: ${(props) => (!props.inHeader ? "56px" : "25px")};
    object-fit: cover;
  }
`;
