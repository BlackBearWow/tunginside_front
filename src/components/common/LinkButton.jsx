import { Link } from "react-router-dom";

export default function LinkButton({ to, className, children }) {
  return (
    <Link
      to={to}
      className={`bg-blue-400 dark:bg-blue-600 rounded-md text-sm text-center px-1 ${className}`}
    >
      {children}
    </Link>
  );
}
