import { useNavigate } from "react-router-dom";
import { useMemberStore } from "../store";
import MyButton from "../components/common/MyButton";
import InputLabel from "../components/common/InputLabel";
import memberApi from "../api/memberApi.mjs";

function MyinfoEdit() {
  const navigate = useNavigate();
  const { member, updateMember } = useMemberStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await memberApi.edit(data);
      if (response.status === 200 || response.status === 201) {
        alert("정보변경 성공!");
        updateMember(response.data);
        navigate("/myinfo");
      }
      console.log(response);
    } catch (error) {
      console.error("정보변경 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="pt-10 bg-white dark:bg-black grow">
      <p className="font-semibold text-3xl text-center">내정보 변경하기</p>
      <form onSubmit={handleSubmit}>
        <InputLabel
          name="userid"
          label="아이디"
          defaultValue={member.userid}
        ></InputLabel>
        <InputLabel
          name="nickname"
          label="닉네임"
          defaultValue={member.nickname}
        ></InputLabel>
        <InputLabel
          name="password"
          label="비밀번호"
          type="password"
        ></InputLabel>
        <InputLabel
          name="newPassword"
          label="새 비밀번호"
          type="password"
        ></InputLabel>
        <div className="flex justify-end py-1 gap-1">
          <MyButton>변경하기</MyButton>
        </div>
      </form>
    </div>
  );
}

export default MyinfoEdit;
