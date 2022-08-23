import Layout from "../componenets/common/Layout";
import Header from "../componenets/common/Header";
import CreatePost from "../componenets/post/CreatePost";

const Create = (props) => {
  return (
    <Layout>
      <Header />
      <CreatePost />
    </Layout>
  );
};

export default Create;
