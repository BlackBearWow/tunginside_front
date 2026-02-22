import { useEffect, useState } from "react";
import { useMemberStore, usePostStore } from "../store";
import DeleteModal from "../components/common/DeleteModal";
import InputLabel from "../components/common/InputLabel";
import MyButton from "../components/common/MyButton";
import commentApi from "../api/commentApi.mjs";

function CommentPage({ post_id }) {
  const { member } = useMemberStore();
  const [commentId, setCommentId] = useState(1);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isSelectedCommentAnonymous, setIsSelectedCommentAnonymous] =
    useState(false);
  const [isCommentEditOpen, setIsCommentEditOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isNestedCommentOpen, setIsNestedCommentOpen] = useState(false);
  const getComments = async () => {
    try {
      // 댓글 정보
      const response = await commentApi.get(post_id);
      if (response.status === 200 || response.status === 201) {
        let _comments = response.data;
        const commentMap = {};
        const rootComments = [];
        _comments.forEach(
          (comment) =>
            (commentMap[comment.id] = {
              ...comment,
              childComments: [],
              nestedCount: 0,
            }),
        );
        _comments.forEach((c) => {
          const current = commentMap[c.id];
          if (current.prev_comment_id && commentMap[current.prev_comment_id]) {
            commentMap[current.prev_comment_id].childComments.push(current);
          } else rootComments.push(current);
        });
        const sortedComments = [];
        const visitedIds = new Set();

        const commentTraverse = (comments, depth) => {
          comments.forEach((c) => {
            if (!visitedIds.has(c.id)) {
              visitedIds.add(c.id);
              c.nestedCount = depth;
              sortedComments.push(c);
              if (c.childComments.length > 0)
                commentTraverse(c.childComments, depth + 1);
            }
          });
        };
        commentTraverse(rootComments, 0);
        // console.log(response.data);
        console.log(sortedComments);
        setComments(sortedComments);
      }
    } catch (error) {
      console.error("댓글 정보 가져오기 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.comment_id = commentId;
    try {
      const response = await commentApi.edit(data);
      if (response.status === 200 || response.status === 201) {
        console.log("댓글수정 성공!");
        setIsCommentEditOpen(false);
        getComments();
      }
      console.log(response);
    } catch (error) {
      console.error("댓글수정 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  const commentDeletemodalCallback = async ({
    password,
    comment_id = commentId,
  }) => {
    try {
      const data = { comment_id, password };
      const response = await commentApi.delete(data);
      if (response.status === 200 || response.status === 201) {
        console.log("댓글삭제 성공!");
        getComments();
      }
      console.log(response);
    } catch (error) {
      console.error("댓글삭제 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  const handleWriteComment = async (e, prev_comment_id) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (prev_comment_id != null) data.prev_comment_id = prev_comment_id;
    if (data.content == "") {
      alert("내용을 입력해주세요");
      return;
    }
    try {
      const response = await commentApi.write(post_id, data);
      if (response.status === 200 || response.status === 201) {
        console.log("댓글쓰기 성공!");
        getComments();
        setIsNestedCommentOpen(false);
        setCommentInput("");
      }
      console.log(response);
    } catch (error) {
      console.error("댓글쓰기 에러", error);
      alert(JSON.stringify(error.response.data));
    }
  };
  useEffect(() => {
    if (post_id != undefined) {
      getComments(post_id);
    }
  }, [post_id]);
  return (
    <>
      <DeleteModal
        title="댓글 비밀번호"
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onConfirm={commentDeletemodalCallback}
      ></DeleteModal>
      {comments.map((v) => (
        <div key={v.id} className={"border ml-" + v.nestedCount}>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <span>
                {v.nickname}({v.ip_addr})
              </span>
              <span className="text-gray-500 text-sm">
                {v.create_at.slice(5, 16).replace("T", " ")}
              </span>
            </div>
            <div className="flex gap-1">
              {/* 내가 쓴 댓글이면 수정 버튼이 뜬다 */}
              {member && v.nickname == member.nickname && (
                <MyButton
                  className="px-2"
                  onClick={() => {
                    setCommentId(v.id);
                    setIsCommentEditOpen(true);
                    setIsSelectedCommentAnonymous(false);
                    setIsNestedCommentOpen(false);
                  }}
                >
                  수정
                </MyButton>
              )}
              {/* 내가 쓴 댓글이거나 관리자면 삭제 버튼이 뜬다 */}
              {member &&
                (v.nickname == member.nickname || member.role === "ADMIN") && (
                  <>
                    <MyButton
                      className="px-2"
                      onClick={() => {
                        setCommentId(v.id);
                        commentDeletemodalCallback({ comment_id: v.id });
                      }}
                    >
                      삭제
                    </MyButton>
                  </>
                )}
              {/* 익명이 쓴 댓글이면 수정, 삭제 버튼이 뜸 */}
              {!v.nickname && (
                <>
                  <MyButton
                    className="px-2"
                    onClick={() => {
                      setCommentId(v.id);
                      setIsCommentEditOpen(true);
                      setIsSelectedCommentAnonymous(true);
                      setIsNestedCommentOpen(false);
                    }}
                  >
                    수정
                  </MyButton>
                  <MyButton
                    className="px-2"
                    onClick={() => {
                      setCommentId(v.id);
                      setIsCommentModalOpen(true);
                    }}
                  >
                    삭제
                  </MyButton>
                </>
              )}
              <MyButton
                className="px-2"
                onClick={() => {
                  setCommentId(v.id);
                  setIsNestedCommentOpen(true);
                  setIsCommentEditOpen(false);
                }}
              >
                답글
              </MyButton>
            </div>
          </div>
          <p>{v.content}</p>
          {isNestedCommentOpen && v.id == commentId && (
            <form onSubmit={(e) => handleWriteComment(e, v.id)}>
              <InputLabel name="content" label="답글"></InputLabel>
              {!member && (
                <InputLabel
                  name="password"
                  label="비밀번호"
                  type="password"
                ></InputLabel>
              )}
              <MyButton className="px-2">답글작성</MyButton>
            </form>
          )}
          {isCommentEditOpen && v.id == commentId && (
            <form
              className="flex flex-col py-1 gap-1"
              onSubmit={handleEditCommentSubmit}
            >
              {isSelectedCommentAnonymous && (
                <input
                  className="border rounded"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                ></input>
              )}
              <input
                className="border rounded"
                name="content"
                defaultValue={comments.find((v) => v.id == commentId).content}
              ></input>
              <div className="flex justify-end">
                <button className="rounded bg-blue-400 px-2">작성</button>
              </div>
            </form>
          )}
        </div>
      ))}
      <form onSubmit={handleWriteComment}>
        <InputLabel
          name="content"
          label="댓글"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></InputLabel>
        {!member && (
          <InputLabel
            name="password"
            label="비밀번호"
            type="password"
          ></InputLabel>
        )}
        <MyButton className="px-2">댓글작성</MyButton>
      </form>
    </>
  );
}

export default CommentPage;
