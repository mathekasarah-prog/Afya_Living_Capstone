function Categories({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex min-w-0 flex-wrap gap-2" aria-label="Filter products by category">
      {categories.map((category) => {
        const active = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onSelectCategory(category)}
            className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active
                ? 'border-[#102a22] bg-[#102a22] text-white'
                : 'border-[#d5ddcf] bg-white text-[#526358] hover:border-[#708c63] hover:bg-[#f0f3eb]'
            }`}
          >
            {category === 'all' || category === 'All' ? 'All Products' : category}
          </button>
        );
      })}
    </div>
  );
}

export default Categories;
