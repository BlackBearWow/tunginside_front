import { useCategoriesStore } from "../store";
import LinkButton from "../components/common/LinkButton";

function CategoryList() {
  const { categories } = useCategoriesStore();
  return (
    <>
      <div className="bg-orange-300 flex flex-wrap gap-1 p-1">
        {categories.map((v) => (
          <LinkButton
            key={v.abbr}
            to={"/category/" + v.abbr}
            className="flex-auto"
          >
            {v.name}
          </LinkButton>
        ))}
      </div>
    </>
  );
}

export default CategoryList;
