import MyButton from "../components/common/MyButton";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <div className="py-1 gap-1 grow">
        <div className="flex justify-end">
          <MyButton>
            <Link to="/makeCategory">카테고리 만들기</Link>
          </MyButton>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
