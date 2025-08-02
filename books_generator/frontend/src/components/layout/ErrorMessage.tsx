type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div
    role="alert"
    className="max-w-xl mx-auto p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md shadow-md font-semibold text-center"
  >
    Error: {message}
  </div>
);

export default ErrorMessage;
