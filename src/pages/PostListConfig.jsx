function PostListConfig({ config, handlers }) {
  return (
    <div className="">
      <select
        className="border"
        value={config.likeCut}
        onChange={(e) => handlers.setLikeCut(e.target.value)}
      >
        <option value="-20">추천컷 없음</option>
        <option value="1">추천컷 1</option>
        <option value="3">추천컷 3</option>
        <option value="5">추천컷 5</option>
      </select>
      <select
        className="border"
        value={config.size}
        onChange={(e) => handlers.setSize(e.target.value)}
      >
        <option value="10">10개</option>
        <option value="20">20개</option>
        <option value="30">30개</option>
        <option value="50">50개</option>
      </select>
      <select
        className="border"
        value={config.orderBy}
        onChange={(e) => handlers.setOrderBy(e.target.value)}
      >
        <option value="">날짜순</option>
        <option value="LIKE">좋아요순</option>
        <option value="DISLIKE">싫어요순</option>
        <option value="VIEWCOUNT">조회순</option>
      </select>
      <hr></hr>
    </div>
  );
}

export default PostListConfig;
