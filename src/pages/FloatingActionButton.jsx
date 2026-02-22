export default function FloatingActionButton() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <div className="fixed bottom-4 right-4 flex gap-1">
      <button className="rounded-4xl bg-gray-400 dark:bg-gray-600 p-3 shadow">
        <img src="/setting.svg" className="w-5 h-5" />
      </button>
      <button
        className="rounded-4xl bg-gray-400 dark:bg-gray-600 p-3 shadow"
        onClick={scrollToTop}
      >
        <img src="/up-arrow.svg" className="w-5 h-5" />
      </button>
      <button
        className="rounded-4xl bg-gray-400 dark:bg-gray-600 p-3 shadow"
        onClick={scrollToBottom}
      >
        <img src="/down-arrow.svg" className="w-5 h-5" />
      </button>
    </div>
  );
}
