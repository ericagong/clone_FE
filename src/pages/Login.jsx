import Layout from "../componenets/common/Layout";
import Header from "../componenets/common/Header";
import LoginLayout from "../componenets/auth/LoginLayout";

const Login = (props) => {
  return (
    <Layout>
      <Header />
      <LoginLayout />
    </Layout>
  );
};

export default Login;
