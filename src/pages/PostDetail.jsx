import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMemberStore, usePostStore } from "../store";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";
import postApi from "../api/postApi.mjs";
import CommentPage from "./CommentPage";
import LinkButton from "../components/common/LinkButton";

function PostDetail({ post_id, getPosts }) {
  const navigate = useNavigate();
  const { post, fetchPost } = usePostStore();
  const { member } = useMemberStore();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi.like(post_id);
      if (response.status === 200 || response.status === 201) {
        fetchPost(post_id);
      }
    } catch (error) {
      console.error("좋아요 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  const handleDislikeClick = async (e) => {
    e.preventDefault();
    try {
      const response = await postApi.dislike(post_id);
      if (response.status === 200 || response.status === 201) {
        fetchPost(post_id);
      }
    } catch (error) {
      console.error("싫어요 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  const deletePostCallback = async ({ password }) => {
    try {
      const data = { password };
      const response = await postApi.delete(post_id, data);
      if (response.status === 200 || response.status === 201) {
        console.log("글 삭제");
        getPosts();
        navigate(-1);
      }
    } catch (error) {
      console.error("글 삭제 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  useEffect(() => {
    if (post_id != undefined) {
      fetchPost(post_id);
      window.scrollTo(0, 0);
    }
  }, [post_id]);
  if (post == null) return null;
  return (
    <div>
      <p className="font-semibold">{post.title}</p>
      <p className="text-gray-500">
        {post.nickname}({post.ip_addr}) | 조회수{post.view_count} | 추천수
        {post.post_like_count} | 댓글{post.comment_count}
      </p>
      <hr></hr>
      <p>{post.content}</p>
      <div className="flex justify-center gap-1">
        <a>{post.post_like_count}</a>
        <Button onClick={handleLikeClick}>좋아요👍</Button>
        <Button onClick={handleDislikeClick}>싫어요👎</Button>
        <a>{post.post_dislike_count}</a>
      </div>
      <div className="flex justify-end gap-1 p-1">
        {/*내가 쓴 글이거나 익명 글이라면 수정가능*/}
        {(!post.nickname || (member && post.nickname === member.nickname)) && (
          <LinkButton className="px-2 py-1" to={`/editPost?post_id=${post_id}`}>
            수정
          </LinkButton>
        )}
        {!post.nickname && (
          <Button className="px-2" onClick={() => setIsPostModalOpen(true)}>
            삭제
          </Button>
        )}
        {post.nickname &&
          member &&
          (post.nickname === member.nickname || member.role === "ADMIN") && (
            <Button className="px-2" onClick={deletePostCallback}>
              삭제
            </Button>
          )}
      </div>
      <hr></hr>
      <DeleteModal
        title="글 비밀번호"
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onConfirm={deletePostCallback}
      ></DeleteModal>
      <CommentPage post_id={post_id} />
      <hr></hr>
    </div>
  );
}

export default PostDetail;
