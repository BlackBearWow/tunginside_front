import { useNavigate, Link } from "react-router-dom";
import { useMemberStore, useCategoriesStore } from "../store";
import MyButton from "../components/common/MyButton";
import DisabledInputLabel from "../components/common/DisabledInputLabel";
import memberApi from "../api/memberApi.mjs";
import categoryApi from "../api/categoryApi.mjs";

function Myinfo() {
  const { member, logoutMember, fetchMember } = useMemberStore();
  const { fetchCategories } = useCategoriesStore();
  const navigate = useNavigate();
  const handleCategoryDelete = async (e, abbr) => {
    e.preventDefault();
    try {
      const response = await categoryApi.delete({ abbr });
      if (response.status === 200 || response.status === 201) {
        alert("카테고리 삭제 성공!");
        fetchCategories();
        fetchMember();
      }
      console.log(response);
    } catch (error) {
      console.error("카테고리 삭제 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const response = await memberApi.delete();
      if (response.status === 200 || response.status === 201) {
        alert("탈퇴 성공!");
        logoutMember();
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.error("탈퇴 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="pt-10 bg-white dark:bg-black grow">
      <p className="font-semibold text-3xl text-center">내정보</p>
      <form>
        <DisabledInputLabel
          id="userid"
          defaultValue={member.userid}
        ></DisabledInputLabel>
        <DisabledInputLabel
          id="nickname"
          defaultValue={member.nickname}
        ></DisabledInputLabel>
        <div className="flex justify-end py-1 gap-1">
          <MyButton>
            <Link to="/myinfoedit">내정보 변경</Link>
          </MyButton>
          <MyButton onClick={handleOnClick}>탈퇴하기</MyButton>
        </div>
      </form>
      <p className="font-semibold text-xl text-center">내 카테고리</p>
      {member.categoryList.length > 0 ? (
        member.categoryList.map((v) => (
          <div key={v.id}>
            <a>{v.name}</a>
            <MyButton onClick={(e) => handleCategoryDelete(e, v.abbr)}>
              삭제
            </MyButton>
          </div>
        ))
      ) : (
        <div className="text-center">카테고리가 없습니다</div>
      )}
    </div>
  );
}

export default Myinfo;
