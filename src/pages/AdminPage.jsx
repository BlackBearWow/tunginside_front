import Button from "../components/common/Button";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <div className="flex justify-end py-1 gap-1">
        <Button>
          <Link to="/makeCategory">카테고리 만들기</Link>
        </Button>
      </div>
    </>
  );
}

export default AdminPage;
