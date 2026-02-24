import { useCategoriesStore } from "../store";
import LinkButton from "../components/common/LinkButton";
import { Expand, Minimize } from "lucide-react";
import { useState } from "react";

function CategoryList() {
  const { categories } = useCategoriesStore();
  const [isExpand, setIsExpand] = useState(false);
  return (
    <div
      className={`bg-orange-300 dark:bg-orange-400 flex ${isExpand ? "flex-col" : ""}`}
    >
      <div
        className={`flex gap-1 p-1 ${
          isExpand ? "flex-wrap" : "flex-nowrap overflow-x-auto scrollbar-hide"
        }`}
      >
        {categories.map((v) => (
          <LinkButton
            key={v.abbr}
            to={"/category/" + v.abbr}
            className="shrink-0"
          >
            {v.name}
          </LinkButton>
        ))}
      </div>
      {isExpand ? (
        <div className="flex justify-end">
          <Minimize
            className="m-1 w-5 h-5 shrink-0"
            onClick={() => setIsExpand(false)}
          />
        </div>
      ) : (
        <Expand
          className="m-1 w-5 h-5 shrink-0"
          onClick={() => setIsExpand(true)}
        />
      )}
    </div>
  );
}

export default CategoryList;
