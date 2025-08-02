type Props = {
  onClick: () => void;
};

const ResetFiltersButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full h-10 px-4 bg-red-600 text-white rounded text-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
    >
      Reset Filters
    </button>
  );
};

export default ResetFiltersButton;
