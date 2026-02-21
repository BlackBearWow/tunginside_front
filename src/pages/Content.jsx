import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePostStore } from "../store";
import InputLabel from "../components/common/InputLabel";
import Button from "../components/common/Button";
import PostListConfig from "./PostListConfig";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import Pagination from "./Pagination";

function Content() {
  const { posts, fetchPosts } = usePostStore();
  const navigate = useNavigate();
  const { abbr } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search");
  const post_id = searchParams.get("post_id");

  const [likeCut, setLikeCut] = useState(
    () => localStorage.getItem("like_cut") || "0",
  );
  const [size, setSize] = useState(() => localStorage.getItem("size") || "20");
  const [orderBy, setOrderBy] = useState(
    () => localStorage.getItem("orderby") || "",
  );

  const [searchInput, setSearchInput] = useState(search || "");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") || "";
    if (search == "") {
      alert("검색어를 입력해주세요");
      return;
    }
    let url = "/";
    if (abbr != undefined) url += `category/${abbr}`;
    navigate(url + `?search=${search}`);
  };

  useEffect(() => {
    setSearchInput(search || "");
  }, [search]);

  async function getPosts() {
    setIsLoading(true);
    await fetchPosts({
      page,
      abbr,
      like_cut: likeCut,
      size,
      orderby: orderBy,
      search,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    localStorage.setItem("like_cut", likeCut);
    localStorage.setItem("size", size);
    localStorage.setItem("orderby", orderBy);

    getPosts();
  }, [abbr, page, likeCut, size, orderBy, search]);
  return (
    <div className="flex flex-col grow bg-gray-100 dark:bg-gray-900">
      {post_id == null ? (
        <PostListConfig
          config={{ likeCut, size, orderBy }}
          handlers={{ setLikeCut, setSize, setOrderBy }}
        ></PostListConfig>
      ) : (
        <PostDetail post_id={post_id} getPosts={getPosts}></PostDetail>
      )}
      <div className="flex-1">
        <PostList posts={posts} isLoading={isLoading}></PostList>
      </div>
      <hr></hr>
      <div className="bg-orange-200 dark:bg-orange-800 py-1 pb-3">
        <form className="pb-2" onSubmit={handleSearch}>
          <InputLabel
            name="search"
            placeholder="검색어 입력"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></InputLabel>
          <Button className="px-2">검색</Button>
        </form>
        <Pagination page={page} abbr={abbr} search={search} />
      </div>
    </div>
  );
}

export default Content;
