import Layout from "../componenets/common/Layout";
import Header from "../componenets/common/Header";
import CreateLayout from "../componenets/post/CreateLayout";

const Create = (props) => {
  return (
    <Layout>
      <Header />
      <CreateLayout />
    </Layout>
  );
};

export default Create;
