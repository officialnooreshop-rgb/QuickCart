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
        className="flex w-full items-center justify-between rounded-xl border border-[#e7d4aa] bg-white/90 p-3 shadow-sm transition hover:border-[#b8860b]"
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
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-[#f2e1b8] bg-white shadow-lg">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => { setSelected(option); setOpen(false); }}
              className="cursor-pointer px-4 py-3 text-sm hover:bg-[#fff8e8]"
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

      <div className="min-h-screen w-full bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6] px-6 pb-20 pt-10 md:px-16 md:pt-14 lg:px-32">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">The Collection</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E2A38] md:text-4xl">All Products</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">Explore thoughtful pieces made for everyday comfort, celebration, and personal style.</p>
          </div>
        </div>

        {/* Mobile Search + Filters Button */}
        <div className="flex w-full gap-2 md:hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="min-w-0 flex-1 rounded-xl border border-[#e7d4aa] bg-white/90 p-3 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            onClick={() => setShowMobileFilters(true)}
            className="rounded-xl bg-[#B8860B] px-4 py-2 font-semibold text-white shadow-sm"
          >
            Filters
          </button>
        </div>

        {/* Desktop Search + Filters */}
        <div className="hidden w-full flex-row items-center gap-4 rounded-[1.5rem] border border-[#f2e1b8] bg-white/70 p-4 shadow-sm md:flex">
          <input
            type="text"
            placeholder="Search products..."
            className="w-64 rounded-xl border border-[#e7d4aa] bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
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
            <div className="h-full w-3/4 overflow-auto border-l border-[#f2e1b8] bg-[#fffdf8] p-6 shadow-2xl">
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
                    className={`mb-1 block w-full rounded-xl p-3 text-left ${
                      ratingFilter.value === r ? "bg-[#B8860B] text-white" : "border border-gray-200 bg-white"
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
                    className={`mb-1 block w-full rounded-xl p-3 text-left ${
                      sortBy.value === s.value ? "bg-[#B8860B] text-white" : "border border-gray-200 bg-white"
                  }`}
                  onClick={() => setSortBy(s)}
                >
                  {s.label}
                </button>
              ))}

              {/* Apply / Clear Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  className="flex-1 rounded-xl bg-[#B8860B] py-3 font-semibold text-white"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply
                </button>
                <button
                  className="flex-1 rounded-xl border border-gray-300 bg-white py-3"
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
