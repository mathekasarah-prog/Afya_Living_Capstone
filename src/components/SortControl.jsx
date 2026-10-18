function SortControl({ sortOption, onSortChange }) {
  return (
    <div className="sort-control">
      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
      </select>
    </div>
  );
}

export default SortControl;