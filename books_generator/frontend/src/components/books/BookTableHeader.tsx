const BookTableHeader = () => (
  <div
    className="
      grid 
      grid-cols-[40px_160px_2fr_2fr_2fr] 
      sticky top-0 sm:top-72 z-20 
      bg-gray-50 dark:bg-gray-900 
      border-b border-gray-200 dark:border-gray-700
      text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300
      px-2 py-2 sm:py-3
      w-full 
    "
  >
    <div className="text-left">#</div>
    <div className="text-left">ISBN</div>
    <div className="text-left">Title</div>
    <div className="text-left">Authors</div>
    <div className="text-left">Publisher</div>
  </div>
);

export default BookTableHeader;
