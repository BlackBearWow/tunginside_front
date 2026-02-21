import { useNavigate, useParams, Link } from "react-router-dom";
import { useMemberStore, useCategoriesStore } from "../store";
import postApi from "../api/postApi.mjs";
import Button from "../components/common/Button";

function WritePost() {
  const navigate = useNavigate();
  const { abbr } = useParams();
  const { categories } = useCategoriesStore();
  const { member } = useMemberStore();
  const currentCategory = categories.find((v) => v.abbr === abbr);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.abbr = abbr;
    try {
      const response = await postApi.write(data);
      if (response.status === 200 || response.status === 201) {
        console.log("글쓰기 성공");
        navigate("/category/" + abbr);
      }
      console.log(response);
    } catch (error) {
      console.error("글쓰기 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="flex flex-col flex-auto bg-gray-100 dark:bg-gray-900 grow">
      <Link to={"/category/" + abbr} className="p-1 text-2xl">
        {currentCategory.name}
      </Link>
      <hr></hr>
      <p className="p-1 text-xl">글쓰기</p>
      <hr></hr>
      <form className="flex flex-col flex-auto gap-y-1" onSubmit={handleSubmit}>
        {!member && (
          <input
            type="password"
            className="border p-1"
            placeholder="비밀번호"
            name="password"
          ></input>
        )}
        <input
          type="text"
          className="border p-1"
          placeholder="글제목"
          name="title"
        ></input>
        <textarea
          className="border p-1 flex-auto"
          cols=""
          placeholder="글 내용"
          name="content"
        ></textarea>
        <div className="flex justify-end">
          <Button>등록</Button>
        </div>
      </form>
    </div>
  );
}

export default WritePost;
