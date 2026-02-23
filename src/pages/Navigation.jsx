import NavigationDrawer from "../components/common/NavigationDrawer";
import FloatingActionButton from "./FloatingActionButton";
import { useMemberStore, useThemeStore } from "../store";
import { Link } from "react-router-dom";
import { Bell, House, LogIn, Menu, Search, Sun, User } from "lucide-react";

function Navigation() {
  const { member, logoutMember } = useMemberStore();
  const { toggleDarkMode } = useThemeStore();
  const handleLogout = async (e) => {
    try {
      // jwt방식으로는 로컬스토리지에서 토큰만 삭제하면 된다.
      logoutMember();
      localStorage.removeItem("authorization");
    } catch (error) {
      console.error("로그아웃 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  return (
    <>
      {/* 사이드 네비게이션 */}
      <div className="flex-col border-r hidden md:flex">
        <div className="flex p-1">
          <img src="/tungtungtung.jpg" alt="tung" className="w-9 h-9" />
        </div>
        <div className="flex justify-center p-3" onClick={toggleDarkMode}>
          <Sun className="w-5 h-5" />
        </div>
        <Link to="/" className="flex justify-center p-3">
          <House className="w-5 h-5" />
        </Link>
        <Link to="/" className="flex justify-center p-3">
          <Menu className="w-5 h-5" />
        </Link>
        <Link to="/" className="flex justify-center p-3">
          <Search className="w-5 h-5" />
        </Link>
        <Link to="/notification" className="flex justify-center p-3">
          <Bell className="w-5 h-5" />
        </Link>
        <NavigationDrawer
          className="flex justify-center p-3"
          title={member ? member.nickname : "익명"}
          icon={
            member ? (
              <User className="w-5 h-5" />
            ) : (
              <LogIn className="w-5 h-5" />
            )
          }
        >
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
                <Link to="/adminPage" className="font-semibold hover:underline">
                  관리자페이지
                </Link>
              )}
            </>
          )}
        </NavigationDrawer>
      </div>

      {/* 바텀 네비게이션 */}
      <div className="md:hidden fixed bottom-0 right-0 flex min-w-full border-t border-gray-200 bg-white/95 dark:border-gray-800 dark:bg-black/95">
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
        <NavigationDrawer
          className="grow flex justify-center p-3"
          title={member ? member.nickname : "익명"}
          icon={
            member ? (
              <User className="w-5 h-5" />
            ) : (
              <LogIn className="w-5 h-5" />
            )
          }
        >
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
                <Link to="/adminPage" className="font-semibold hover:underline">
                  관리자페이지
                </Link>
              )}
            </>
          )}
        </NavigationDrawer>
      </div>
    </>
  );
}

export default Navigation;
