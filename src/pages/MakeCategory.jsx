import { useNavigate } from "react-router-dom";
import { useMemberStore, useCategoriesStore } from "../store";
import MyButton from "../components/common/MyButton";
import InputLabel from "../components/common/InputLabel";
import categoryApi from "../api/categoryApi.mjs";

function MakeCategory() {
  const navigate = useNavigate();
  const { fetchMember } = useMemberStore();
  const { fetchCategories } = useCategoriesStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await categoryApi.make(data);
      if (response.status === 200 || response.status === 201) {
        console.log("카테고리 생성");
        await fetchMember();
        await fetchCategories();
        navigate("/myinfo");
      }
    } catch (error) {
      console.error("정보변경 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="pt-10 bg-white dark:bg-black grow">
      <p className="font-semibold text-3xl text-center">카테고리 만들기</p>
      <form onSubmit={handleSubmit}>
        <InputLabel name="name" label="카테고리 이름"></InputLabel>
        <InputLabel name="abbr" label="카테고리 줄임말(url)"></InputLabel>
        <div className="flex justify-end py-1 gap-1">
          <MyButton>만들기</MyButton>
        </div>
      </form>
    </div>
  );
}

export default MakeCategory;
