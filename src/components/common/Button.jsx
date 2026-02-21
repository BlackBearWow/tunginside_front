// components/common/Button.jsx
export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md bg-blue-400 dark:bg-blue-600 px-1 text-sm text-center ${className}`}
    >
      {children}
    </button>
  );
}
