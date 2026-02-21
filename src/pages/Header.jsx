import { useMemberStore, useThemeStore } from "../store";
import { Link } from "react-router-dom";

function Header() {
  const { member, logoutMember } = useMemberStore();
  const { toggleDarkMode } = useThemeStore();
  const handleLogout = async (e) => {
    try {
      // jwt방식으로는 로컬스토리지에서 토큰만 삭제하면 된다.
      logoutMember();
      localStorage.removeItem("authorization");
      // const response = await memberApi.logout();
      // if (response.status === 200 || response.status === 201) {
      //   console.log("로그아웃!");
      //   logoutMember();
      // }
    } catch (error) {
      console.error("로그아웃 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <>
      <nav className="bg-orange-300 dark:bg-orange-700 flex flex-row justify-between">
        <div className="items-center">
          <Link to="/" className="flex font-bold gap-1">
            <img src="/tungtungtung.jpg" alt="tung" className="h-8 w-auto" />
            Tunginside
          </Link>
        </div>
        <div className="flex items-center gap-3 px-2">
          {member == null ? (
            <>
              <Link to="/login" className="font-semibold hover:underline">
                로그인
              </Link>
              <Link to="/signup" className="font-semibold hover:underline">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="font-semibold hover:underline"
              >
                로그아웃
              </button>
              <Link to="/myinfo" className="font-semibold hover:underline">
                내정보
              </Link>
              {member.role === "ADMIN" && (
                <Link to="/adminPage" className="font-semibold hover:underline">
                  관리자페이지
                </Link>
              )}
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="font-semibold hover:underline"
          >
            다크모드
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
