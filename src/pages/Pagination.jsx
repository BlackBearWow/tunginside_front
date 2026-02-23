import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/common/MyButton";

function Pagination({ page, abbr, search }) {
  const navigate = useNavigate();
  const [pageList, setPageList] = useState([]);
  const pageMove = (num) => {
    if (num <= 0) {
      num = 1;
    }
    let url = "/";
    if (abbr != undefined) url += `category/${abbr}`;
    url += `?page=${num}`;
    if (search) url += `&search=${search}`;
    navigate(url);
  };
  // 자신-3부터 7개가 모일때까지 페이지를 모은다.
  useEffect(() => {
    const _pageList = [];
    for (let i = Number(page) - 2; _pageList.length < 5; i++) {
      if (i > 0) _pageList.push(i);
    }
    setPageList(_pageList);
    console.log(pageList);
  }, [page]);

  return (
    <div className="flex justify-center gap-1 pb-3">
      <MyButton
        onClick={() => pageMove(Number(page) - 3)}
        className="px-2 grow"
      >
        &lt;
      </MyButton>
      {pageList.map((v, idx) =>
        v == Number(page) ? (
          <MyButton key={idx} className="px-2 font-black grow">
            {v}
          </MyButton>
        ) : (
          <MyButton
            key={idx}
            onClick={() => pageMove(v)}
            className="px-2 font-light grow"
          >
            {v}
          </MyButton>
        ),
      )}
      <MyButton
        onClick={() => pageMove(Number(page) + 3)}
        className="px-2 grow"
      >
        &gt;
      </MyButton>
    </div>
  );
}

export default Pagination;
