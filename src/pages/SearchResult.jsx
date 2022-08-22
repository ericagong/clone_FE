import Layout from "../componenets/common/Layout";
import Header from "../componenets/common/Header";
import SearchResultLayout from "../componenets/search/SearchResultLayout";

const SearchResult = (props) => {
  return (
    <Layout>
      <Header />
      <SearchResultLayout />
    </Layout>
  );
};

export default SearchResult;
