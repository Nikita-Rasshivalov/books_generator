type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
};

const RangeControl = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: Props) => (
  <div className="mb-3">
    <label
      htmlFor={label}
      className="block mb-1 font-semibold text-gray-700 dark:text-gray-300 text-xl"
    >
      {label}
    </label>
    <input
      id={label}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none
                 cursor-pointer dark:bg-gray-700 
                 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition"
    />
    <div className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-400">
      {value.toFixed(1)}
    </div>
  </div>
);

export default RangeControl;
