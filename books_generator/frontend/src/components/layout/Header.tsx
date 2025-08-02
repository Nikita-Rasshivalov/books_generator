import ViewModeToggle from "../ViewModeToggle";

type HeaderProps = {
  viewMode: "table" | "gallery";
  setViewMode: (mode: "table" | "gallery") => void;
};

export const Header = ({ viewMode, setViewMode }: HeaderProps) => (
  <header className="py-1 p-0 border-b border-gray-300 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
        Book Generator
      </h1>
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  </header>
);
