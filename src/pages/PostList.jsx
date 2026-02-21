import { useNavigate, useLocation } from "react-router-dom";

function PostList({ posts, isLoading }) {
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
    <div className="divide-black dark:divide-white divide-y">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="cursor-pointer"
          >
            <li className="grid grid-cols-12">
              <div className="col-span-11">
                <p className="line-clamp-1 hover:underline">{post.title}</p>
                <p className="text-gray-500 text-sm">
                  {post.nickname}({post.ip_addr}) |{" "}
                  {post.create_at.slice(2, 16).replace("T", " ")} | 조회{" "}
                  {post.view_count} | 추천 {post.post_like_count}
                </p>
              </div>
              <div className="text-red-500 bg-gray-200 dark:bg-gray-800 grid">
                <p className="place-content-center text-center">
                  {post.comment_count}
                </p>
              </div>
            </li>
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
