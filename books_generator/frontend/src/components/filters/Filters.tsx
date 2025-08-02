import { useState, useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import SelectControl from "./controls/SelectControl";
import TextInputControl from "./controls/TextInputControl";
import RangeControl from "./controls/RangeControl";
import NumberInputControl from "./controls/NumberInputControl";
import ExportCsvButton from "../ExportButton";
import { BookState, FiltersProps } from "../../types/types";
import { generateRandomSeed } from "../../utils/generateRandomSeed";

const Filters = ({
  initialFilters,
  onResetBooks,
  onSetParamsBatch,
}: FiltersProps) => {
  const [localFilters, setLocalFilters] = useState(initialFilters);
  const isFirstRun = useRef(true);

  const debouncedUpdate = useMemo(
    () =>
      debounce((filters: Partial<BookState>) => {
        onSetParamsBatch(filters);
      }, 500),
    [onSetParamsBatch]
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    debouncedUpdate(localFilters);
  }, [localFilters, debouncedUpdate]);

  const setFilter = <K extends keyof BookState>(key: K, value: BookState[K]) =>
    setLocalFilters((f) => ({ ...f, [key]: value }));

  const resetFilters = () => {
    onResetBooks();
    setLocalFilters({
      lang: "en",
      seed: "default",
      likes: 0,
      reviews: 0,
    });
  };

  return (
    <div className="p-5 pb-1 border rounded-lg bg-white dark:bg-gray-900 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 items-center">
        <SelectControl
          label="Language"
          value={localFilters.lang ?? ""}
          onChange={(val) => setFilter("lang", val)}
          options={[
            { value: "en", label: "English" },
            { value: "de", label: "German" },
            { value: "ja", label: "Japan" },
          ]}
        />

        <TextInputControl
          label="Seed"
          value={localFilters.seed ?? ""}
          onChange={(val) => setFilter("seed", val)}
          button={
            <button
              type="button"
              aria-label="Generate random seed"
              onClick={() => setFilter("seed", generateRandomSeed())}
              className="px-3 py-2 text-2xl bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              🎲
            </button>
          }
        />

        <NumberInputControl
          label="Min Reviews"
          value={localFilters.reviews ?? 0}
          onChange={(val) => setFilter("reviews", val)}
          min={0}
          max={10}
          step={0.1}
        />

        <RangeControl
          label="Min Likes"
          value={localFilters.likes ?? 0}
          onChange={(val) => setFilter("likes", val)}
          min={0}
          max={10}
          step={0.1}
        />

        <ExportCsvButton />

        <button
          onClick={resetFilters}
          type="button"
          className="w-full h-10 px-4 bg-red-600 text-white rounded text-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
