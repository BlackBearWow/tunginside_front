import NavigationDrawer from "../components/common/NavigationDrawer";
import FloatingActionButton from "./FloatingActionButton";
import { useMemberStore, useThemeStore } from "../store";
import { Link } from "react-router-dom";
import { Bell, House, LogIn, Menu, Search } from "lucide-react";

function Navigation() {
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
      <nav className="bg-orange-400 flex flex-row justify-between">
        <div className="items-center">
          <Link to="/" className="flex font-bold gap-1">
            <img src="/tungtungtung.jpg" alt="tung" className="h-8 w-auto" />
            Tunginside
          </Link>
        </div>
        <div className="flex gap-3 px-2">
          <button
            onClick={toggleDarkMode}
            className="font-semibold hover:underline"
          >
            다크모드
          </button>
          <NavigationDrawer title="메뉴" icon={member ? member.nickname : null}>
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
                  className="font-semibold hover:underline text-start"
                >
                  로그아웃
                </button>
                <Link to="/myinfo" className="font-semibold hover:underline">
                  내정보
                </Link>
                {member.role === "ADMIN" && (
                  <Link
                    to="/adminPage"
                    className="font-semibold hover:underline"
                  >
                    관리자페이지
                  </Link>
                )}
              </>
            )}
          </NavigationDrawer>
        </div>
      </nav>
      <div className="fixed bottom-0 right-0 w-full">
        <FloatingActionButton />
        <div className="md:hidden flex min-w-full border-t border-gray-200 bg-white/95 dark:border-gray-800 dark:bg-black/95">
          <Link to="/" className="grow flex justify-center p-3">
            <Menu className="w-5 h-5" />
          </Link>
          <Link to="/" className="grow flex justify-center p-3">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/" className="grow flex justify-center p-3">
            <House className="w-5 h-5" />
          </Link>
          <Link to="/notification" className="grow flex justify-center p-3">
            <Bell className="w-5 h-5" />
          </Link>
          <Link to="/" className="grow flex justify-center p-3">
            <LogIn className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navigation;
