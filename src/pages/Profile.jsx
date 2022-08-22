import Layout from "../componenets/common/Layout";
import Header from "../componenets/common/Header";
import ProfileLayout from "../componenets/profile/ProfileLayout";

const Profile = (props) => {
  return (
    <Layout>
      <Header />
      <ProfileLayout />
    </Layout>
  );
};

export default Profile;
