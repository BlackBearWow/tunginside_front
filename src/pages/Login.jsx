import { useNavigate } from "react-router-dom";
import { useMemberStore } from "../store";
import InputLabel from "../components/common/InputLabel";
import Button from "../components/common/Button";
import memberApi from "../api/memberApi.mjs";

function Login() {
  const navigate = useNavigate();
  const { fetchMember } = useMemberStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await memberApi.login(formData);
      if (response.status === 200 || response.status === 201) {
        console.log("로그인 성공!");
        // jwt토큰 분석
        const authHeader = response.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const jwtToken = authHeader.substring(7);
          localStorage.setItem("authorization", jwtToken);
          console.log("jwt 토큰 저장 완료");
        }
        await fetchMember();
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.error("로그인 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <div className="pt-10 bg-gray-100 dark:bg-gray-900 grow">
      <p className="font-semibold text-3xl text-center">로그인</p>
      <form onSubmit={handleSubmit}>
        <InputLabel name="userid" label="아이디"></InputLabel>
        <InputLabel
          name="password"
          type="password"
          label="비밀번호"
        ></InputLabel>
        <div className="flex justify-end py-1 gap-1">
          <Button>로그인</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
