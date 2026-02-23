import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCategoriesStore, useMemberStore, useThemeStore } from "./store";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Myinfo from "./pages/Myinfo";
import MyinfoEdit from "./pages/MyinfoEdit";
import MakeCategory from "./pages/MakeCategory";
import EditPost from "./pages/EditPost";
import WritePost from "./pages/WritePost";
import Category from "./pages/Category";
import CategoryList from "./pages/CategoryList";
import Navigation from "./pages/Navigation";
import Content from "./pages/Content";
import AdminPage from "./pages/AdminPage";
import Footer from "./pages/Footer";
import NotificationPage from "./pages/NotificationPage";
import FloatingActionButton from "./pages/FloatingActionButton";

function App() {
  const { fetchCategories } = useCategoriesStore();
  const { fetchMember } = useMemberStore();
  const { isDarkMode } = useThemeStore();
  useEffect(() => {
    fetchCategories();
    fetchMember();
  }, []);
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className="App bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50 flex h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto flex grow">
          <Navigation />
          <div
            className="flex flex-col grow overflow-y-auto"
            id="content-scroll"
          >
            <FloatingActionButton />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/writePost/:abbr" element={<WritePost />} />
              <Route path="/editPost" element={<EditPost />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route
                path="/myinfo"
                element={
                  <MemberNecessaryRoute>
                    <Myinfo />
                  </MemberNecessaryRoute>
                }
              />
              <Route
                path="/myinfoedit"
                element={
                  <MemberNecessaryRoute>
                    <MyinfoEdit />
                  </MemberNecessaryRoute>
                }
              />
              <Route
                path="/makeCategory"
                element={
                  <MemberAdminRoute>
                    <MakeCategory />
                  </MemberAdminRoute>
                }
              />
              <Route
                path="/adminPage"
                element={
                  <MemberAdminRoute>
                    <AdminPage />
                  </MemberAdminRoute>
                }
              />
              <Route
                path="/category/:abbr"
                element={
                  <>
                    <Category />
                    <Content />
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <CategoryList />
                    <Content />
                  </>
                }
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

function MemberNecessaryRoute({ children }) {
  const { member } = useMemberStore();
  if (member === null) {
    console.log("로그인 필요용~", member);
    return <Navigate to="/" replace></Navigate>;
  }
  return children;
}

function MemberAdminRoute({ children }) {
  const { member } = useMemberStore();
  if (member === null || member.role !== "ADMIN") {
    return <Navigate to="/" replace></Navigate>;
  }
  return children;
}

export default App;
