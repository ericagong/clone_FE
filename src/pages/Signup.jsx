import Layout from "../componenets/common/Layout";
import Header from "../componenets/common/Header";
import SignupLayout from "../componenets/auth/SignupLayout";

const Signup = (props) => {
  return (
    <Layout>
      <Header />
      <SignupLayout />
    </Layout>
  );
};

export default Signup;
