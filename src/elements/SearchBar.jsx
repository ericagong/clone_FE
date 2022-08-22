import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { SEARCH_PATH } from "../shared/paths";
import { isHashtagCheck, noSpaceCheck, oneHashtagCheck } from "../shared/regex";

const SearchBar = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  // TODO 공통된 요소니까 그냥 Layout에 얹어 놓는게 나을듯!?
  // TODO 자동완성?
  const onSubmitHandler = ({ keyword }) => {
    const tag = keyword.slice(1);
    navigate(`${SEARCH_PATH}/${tag}`);
    reset({ keyword: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          type='text'
          placeholder='#hashtag'
          {...register("keyword", {
            required: "You should type keyword for hashtag search.",
            validate: {
              isHashtag: (value) =>
                isHashtagCheck(value) || "You can search in hashtag format.",
              noSpace: (value) =>
                noSpaceCheck(value) || "Hashtag is not proper.",
              oneHashtag: (value) =>
                oneHashtagCheck(value) ||
                "You can search only one hashtag at once.",
            },
          })}
        />
        {errors.keyword ? <div>{errors.keyword.message}</div> : null}
      </form>
    </>
  );
};

export default SearchBar;
