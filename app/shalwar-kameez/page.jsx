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

  // Filter products by category "Men Shalwar Kameez"
  const menShalwarKameezProducts = products.filter(
    (product) => product.category === "Men Shalwar Kameez"
  );

  // Search, filters, sort states
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState({ label: "All Ratings", value: 0 });
  const [sortBy, setSortBy] = useState({ label: "Sort By", value: "" });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mobile filter modal state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let temp = [...menShalwarKameezProducts];

    // Search
    if (search.trim() !== "") {
      temp = temp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
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
  }, [search, ratingFilter, sortBy]); // Removed categoryFilter from dependencies

  // Initialize filteredProducts with menShalwarKameezProducts on component mount
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === "Men Shalwar Kameez"
    );
    setFilteredProducts(filtered);
  }, [products]); // Use products as the dependency instead of menShalwarKameezProducts

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 pb-20 pt-10 md:px-16 md:pt-14 lg:px-32">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Men's Collection</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E2A38] md:text-4xl">Men Shalwar Kameez</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">Timeless cuts, comfortable fabrics, and refined looks for every occasion.</p>
        </div>

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
        <div className="mt-10 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-7">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="transition-transform duration-300 hover:-translate-y-1">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-[1.5rem] border border-dashed border-[#d9caa6] bg-white/70 p-12 text-center text-gray-500">No products found.</div>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
