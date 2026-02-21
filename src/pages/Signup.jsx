import { useNavigate } from "react-router-dom";
import InputLabel from "../components/common/InputLabel";
import Button from "../components/common/Button";
import memberApi from "../api/memberApi.mjs";

function Signup() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await memberApi.signup(data);
      if (response.status === 200 || response.status === 201) {
        alert("회원가입 성공!");
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      console.error("회원가입 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="pt-10 bg-gray-100 dark:bg-gray-900 grow">
      <p className="font-semibold text-3xl text-center">회원가입</p>
      <form onSubmit={handleSubmit}>
        <InputLabel name="userid" label="아이디"></InputLabel>
        <InputLabel
          name="password"
          label="비밀번호"
          type="password"
        ></InputLabel>
        <InputLabel name="nickname" label="닉네임"></InputLabel>
        <div className="flex justify-end py-1 gap-1">
          <Button>등록</Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
