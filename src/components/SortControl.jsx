
function SortControl({ sortOption, onSortChange }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-3">
      <label
        htmlFor="sort"
        className="text-sm font-semibold text-[#526358]"
      >
        Sort by
      </label>

      <select
        id="sort"
        value={sortOption}
        onChange={(event) => onSortChange(event.target.value)}
        className="min-h-11 max-w-full rounded-xl border border-[#d5ddcf] bg-white px-3 py-2 text-sm text-[#102a22] outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
      >
        <option value="default">Recommended</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
}

export default SortControl;
