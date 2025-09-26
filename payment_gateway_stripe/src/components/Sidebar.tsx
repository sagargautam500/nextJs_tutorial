"use client";

interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export default function Sidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-1/4 bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${
              selectedCategory === null ? "text-blue-600" : "text-gray-700"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`cursor-pointer ${
                selectedCategory === cat.id ? "text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceRange[0]}
            min={0}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-1/2 border rounded px-2 py-1"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            min={0}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-1/2 border rounded px-2 py-1"
          />
        </div>
      </div>
    </aside>
  );
}
