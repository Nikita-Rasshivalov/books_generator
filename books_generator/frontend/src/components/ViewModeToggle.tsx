type ViewModeToggleProps = {
  viewMode: "table" | "gallery";
  setViewMode: (mode: "table" | "gallery") => void;
};

const TableIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="10" y1="4" x2="10" y2="20" />
  </svg>
);

const GalleryIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" ry="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" ry="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" ry="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" ry="1" />
  </svg>
);

const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-4 p-4 ">
      <button
        onClick={() => setViewMode("table")}
        type="button"
        aria-pressed={viewMode === "table"}
        aria-label="Switch to table view"
        className={`p-2 rounded-md transition ${
          viewMode === "table"
            ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        <TableIcon />
      </button>

      <button
        onClick={() => setViewMode("gallery")}
        type="button"
        aria-pressed={viewMode === "gallery"}
        aria-label="Switch to gallery view"
        className={`p-2 rounded-md transition ${
          viewMode === "gallery"
            ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        <GalleryIcon />
      </button>
    </div>
  );
};

export default ViewModeToggle;
