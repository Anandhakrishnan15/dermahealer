import { memo } from "react";

const FilterButton = memo(({
    label,
    value,
    activeFilter,
    setFilter,
}) => {

    const active = activeFilter === value;

    return (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${active
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
        >
            {label}
        </button>
    );
});

FilterButton.displayName = "FilterButton";

export default FilterButton;