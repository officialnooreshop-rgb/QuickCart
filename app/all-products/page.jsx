'use client'

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const CustomDropdown = ({ options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-44 md:w-48">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border p-2 rounded-lg flex justify-between items-center shadow-sm hover:border-gray-400 transition"
      >
        <span>{selected.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => { setSelected(option); setOpen(false); }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AllProducts = () => {
  const { products } = useAppContext();

  // Search, filters, sort states
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState({ label: "All Categories", value: "" });
  const [ratingFilter, setRatingFilter] = useState({ label: "All Ratings", value: 0 });
  const [sortBy, setSortBy] = useState({ label: "Sort By", value: "" });
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Mobile filter modal state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get unique categories from products
  const categories = ["All Categories", ...new Set(products.map(p => p.category))];

  useEffect(() => {
    let temp = [...products];

    // Search
    if (search.trim() !== "") {
      temp = temp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Category filter
    if (categoryFilter.value && categoryFilter.value !== "All Categories") {
      temp = temp.filter(p => p.category === categoryFilter.value);
    }

    // Rating filter
    if (ratingFilter.value > 0) {
      temp = temp.filter(p => p.rating >= ratingFilter.value);
    }

    // Sort
    if (sortBy.value) {
      switch (sortBy.value) {
        case "priceAsc":
          temp.sort((a, b) => a.offerPrice - b.offerPrice);
          break;
        case "priceDesc":
          temp.sort((a, b) => b.offerPrice - a.offerPrice);
          break;
        case "rating":
          temp.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(temp);
  }, [search, categoryFilter, ratingFilter, sortBy, products]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-4 pb-20 space-y-6 w-full">

        {/* Header */}
        <p className="text-2xl md:text-3xl font-semibold text-[#1E2A38]">
          All Products
        </p>

        {/* Mobile Search + Filters Button */}
        <div className="flex w-full gap-2 md:hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-[#fdb242]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowMobileFilters(true)}
            className="bg-[#fdb242] px-4 py-2 rounded-lg text-white font-medium"
          >
            Filters
          </button>
        </div>

        {/* Desktop Search + Filters */}
        <div className="hidden md:flex flex-row gap-4 w-full items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#fdb242]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <CustomDropdown
            options={categories.map(c => ({ label: c, value: c }))}
            selected={categoryFilter}
            setSelected={setCategoryFilter}
          />

          <CustomDropdown
            options={[
              { label: "All Ratings", value: 0 },
              { label: "4 stars & up", value: 4 },
              { label: "3 stars & up", value: 3 },
              { label: "2 stars & up", value: 2 },
              { label: "1 star & up", value: 1 },
            ]}
            selected={ratingFilter}
            setSelected={setRatingFilter}
          />

          <CustomDropdown
            options={[
              { label: "Sort By", value: "" },
              { label: "Price: Low → High", value: "priceAsc" },
              { label: "Price: High → Low", value: "priceDesc" },
              { label: "Rating: High → Low", value: "rating" },
              { label: "Newest", value: "newest" },
            ]}
            selected={sortBy}
            setSelected={setSortBy}
          />
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black/40 z-20 flex justify-end">
            <div className="bg-white w-3/4 p-6 overflow-auto h-full">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="mb-4 font-bold text-lg"
              >
                Close
              </button>

              {/* Category */}
       
              {/* Rating */}
              <p className="font-semibold mt-4 mb-2">Rating</p>
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  className={`block w-full text-left mb-1 p-2 rounded-lg ${
                    ratingFilter.value === r ? "bg-[#fdb242] text-white" : "bg-gray-100"
                  }`}
                  onClick={() => setRatingFilter({ label: `${r} stars & up`, value: r })}
                >
                  {r}  & up
                </button>
              ))}

              {/* Sort */}
              <p className="font-semibold mt-4 mb-2">Sort By</p>
              {[
                { label: "Price: Low → High", value: "priceAsc" },
                { label: "Price: High → Low", value: "priceDesc" },
                { label: "Rating: High → Low", value: "rating" },
                { label: "Newest", value: "newest" },
              ].map((s) => (
                <button
                  key={s.value}
                  className={`block w-full text-left mb-1 p-2 rounded-lg ${
                    sortBy.value === s.value ? "bg-[#fdb242] text-white" : "bg-gray-100"
                  }`}
                  onClick={() => setSortBy(s)}
                >
                  {s.label}
                </button>
              ))}

              {/* Apply / Clear Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  className="flex-1 bg-[#fdb242] text-white py-2 rounded-lg"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply
                </button>
                <button
                  className="flex-1 border py-2 rounded-lg"
                  onClick={() => {
                    setCategoryFilter({ label: "All Categories", value: "" });
                    setRatingFilter({ label: "All Ratings", value: 0 });
                    setSortBy({ label: "Sort By", value: "" });
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="transition-transform duration-300 hover:scale-105">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No products found.</p>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
