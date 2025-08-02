type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

const SelectControl = ({ label, value, options, onChange }: Props) => (
  <div className="mb-2">
    <label
      htmlFor={label}
      className="block mb-1 font-semibold text-gray-700 dark:text-gray-300 text-xs"
    >
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md
                 bg-white text-gray-900 text-xl
                 focus:outline-none focus:ring-1 focus:ring-blue-500
                 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                 dark:focus:ring-blue-400
                 transition"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectControl;
