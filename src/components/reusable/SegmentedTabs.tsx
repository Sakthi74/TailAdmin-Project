interface SegmentedTabsProps<T extends string> {
  tabs: readonly T[];
  activeTab: T;
  onChange: (tab: T) => void;
  className?: string;
}

const SegmentedTabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: SegmentedTabsProps<T>) => {
  return (
    <div
      className={`flex items-center bg-[#EEF2F9] dark:bg-[#2A3040] rounded-lg p-1 w-fit ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors whitespace-nowrap ${
            activeTab === tab
              ? "bg-white dark:bg-[#1C2130] text-slate-900 dark:text-white font-medium shadow-sm"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default SegmentedTabs;
