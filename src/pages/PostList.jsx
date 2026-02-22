import { useNavigate, useLocation } from "react-router-dom";

function PostList({ post_id, posts, isLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handlePostClick = (post_id) => {
    const params = new URLSearchParams(location.search);
    params.set("post_id", post_id);
    navigate(`${location.pathname}?${params.toString()}`);
  };
  if (isLoading) {
    return <div className="text-center">데이터를 불러오는 중입니다...</div>;
  }
  return (
    <div className="">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className={`cursor-pointer p-1 grid grid-cols-1 lg:grid-cols-5 ${post_id == post.id ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            <div className="flex hover:underline gap-1 lg:col-span-3">
              <span className="truncate">{post.title}</span>
              <span className="shrink-0">[{post.comment_count}]</span>
            </div>
            <p className="text-gray-500 text-xs lg:justify-self-end lg:col-span-2">
              {post.nickname}({post.ip_addr}) |{" "}
              {post.create_at.slice(2, 16).replace("T", " ")} | 조회{" "}
              {post.view_count} | 추천 {post.post_like_count}
            </p>
          </div>
        ))
      ) : (
        <div>
          <p className="text-lg flex justify-center">글이 없습니다 📭</p>
        </div>
      )}
    </div>
  );
}

export default PostList;
