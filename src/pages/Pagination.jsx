import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

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
    <div className="flex justify-center gap-1">
      <Button onClick={() => pageMove(Number(page) - 3)} className="px-2 grow">
        &lt;
      </Button>
      {pageList.map((v, idx) =>
        v == Number(page) ? (
          <Button key={idx} className="px-2 font-extrabold grow">
            {v}
          </Button>
        ) : (
          <Button key={idx} onClick={() => pageMove(v)} className="px-2 grow">
            {v}
          </Button>
        ),
      )}
      <Button onClick={() => pageMove(Number(page) + 3)} className="px-2 grow">
        &gt;
      </Button>
    </div>
  );
}

export default Pagination;
