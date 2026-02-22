import { useParams, Link } from "react-router-dom";
import { useCategoriesStore } from "../store";

function Category() {
  const { abbr } = useParams();
  const { categories } = useCategoriesStore();
  const currentCategory = categories.find((v) => v.abbr === abbr);
  return (
    <div className="bg-orange-300 flex justify-between items-center px-1">
      <Link to={"/category/" + abbr} className="text-2xl">
        {currentCategory.name}
      </Link>
      <Link to={"/writePost/" + abbr} className="border">
        글쓰기
      </Link>
    </div>
  );
}

export default Category;
