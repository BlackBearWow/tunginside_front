import { ArrowDown, ArrowUp, Settings } from "lucide-react";

export default function FloatingActionButton() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <div className="flex flex-col gap-1 m-2">
      <div className="flex justify-end">
        <button className="rounded-full border border-gray-500 bg-gray-400 dark:bg-gray-600 p-3 shadow">
          <Settings className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="rounded-full border border-gray-500 bg-gray-400 dark:bg-gray-600 p-3 shadow"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="rounded-full border border-gray-500 bg-gray-400 dark:bg-gray-600 p-3 shadow"
          onClick={scrollToBottom}
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
