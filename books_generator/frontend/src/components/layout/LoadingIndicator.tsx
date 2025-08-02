const LoadingIndicator = () => (
  <div
    role="status"
    className="flex items-center justify-center p-4 space-x-2 text-blue-600 dark:text-blue-400 font-semibold"
  >
    <svg
      className="w-6 h-6 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span>Loading books...</span>
  </div>
);

export default LoadingIndicator;
