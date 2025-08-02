import React from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  button?: React.ReactNode;
};

const TextInputControl = ({ label, value, onChange, button }: Props) => (
  <div className="mb-2">
    <label
      htmlFor={label}
      className="block mb-1 font-semibold text-gray-700 dark:text-gray-300 text-xs"
    >
      {label}
    </label>
    <div className="flex flex-nowrap gap-1.5">
      <input
        id={label}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow min-w-0 px-3 py-2 border border-gray-300 rounded-md
                   bg-white text-gray-900 text-xl
                   focus:outline-none focus:ring-1 focus:ring-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                   dark:focus:ring-blue-400
                   transition"
      />
      {button && <div className="flex-shrink-0 text-xs">{button}</div>}
    </div>
  </div>
);

export default TextInputControl;
