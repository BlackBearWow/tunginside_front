import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { usePostStore, useCategoriesStore } from "../store";
import { useEffect, useState } from "react";
import postApi from "../api/postApi.mjs";

function EditPost() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const post_id = searchParams.get("post_id");
  const { categories } = useCategoriesStore();
  const { post, fetchPost } = usePostStore();
  const [category, setCategory] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await postApi.edit(post_id, data);
      if (response.status === 200 || response.status === 201) {
        console.log("글 수정 성공");
        fetchPost(post_id);
        navigate(-1);
      }
      console.log(response);
    } catch (error) {
      console.error("글 수정 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  useEffect(() => {
    if (post_id != null) fetchPost(post_id);
  }, [post_id]);

  useEffect(() => {
    if (post != null && categories.length > 0) {
      setCategory(categories.find((v) => v.abbr === post.category_abbr));
    }
  }, [post]);

  if (post === null) return <>asdfasf</>;

  return (
    <div className="flex flex-col flex-auto bg-white dark:bg-black grow">
      <Link to={"/category/" + post.category_abbr} className="p-1 text-2xl">
        {category.name}
      </Link>
      <hr></hr>
      <p className="p-1 text-xl">글 수정</p>
      <hr></hr>
      <form className="flex flex-col flex-auto gap-y-1" onSubmit={handleSubmit}>
        {!post.nickname && (
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
          defaultValue={post.title}
        ></input>
        <textarea
          className="border p-1 flex-auto"
          cols=""
          placeholder="글 내용"
          name="content"
          defaultValue={post.content}
        ></textarea>
        <div className="flex justify-end">
          <button className="bg-blue-400 rounded p-1 px-3">수정</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
