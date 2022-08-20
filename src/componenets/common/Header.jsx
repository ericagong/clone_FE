import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <>
      <div>Project Name</div>
      {isLogin ? (
        <Link to='/profile/'>
          <div>Profile</div>
        </Link>
      ) : null}
      <hr style={{ backgroundColor: "black", width: "100%", height: "1px" }} />
    </>
  );
};

export default Header;
