type Props = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

const NumberInputControl = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: Props) => (
  <div className="mb-2">
    <label
      htmlFor={label}
      className="block mb-1 font-semibold text-gray-700 dark:text-gray-300 text-xs"
    >
      {label}
    </label>
    <input
      id={label}
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-1 focus:ring-blue-500
                 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                 dark:focus:ring-blue-400 transition text-xl"
    />
  </div>
);

export default NumberInputControl;
