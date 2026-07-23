'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/product/seller-list', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(productId);
      const token = await getToken();
      const { data } = await axios.delete(`/api/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts((current) => current.filter((product) => product._id !== productId));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (user) fetchSellerProduct();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-between bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6]">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-4 md:p-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Catalog Manager</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">All Products</h2>
              <p className="mt-2 text-sm text-gray-500">Keep your storefront collection sharp and up to date.</p>
            </div>
            <div className="w-fit rounded-2xl border border-[#f2e1b8] bg-white px-5 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Catalog size</p>
              <p className="mt-1 text-2xl font-bold text-[#1E2A38]">{products.length}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-[1.5rem] border border-[#f2e1b8] bg-white shadow-[0_12px_35px_rgba(184,134,11,0.08)]">
            <table className="min-w-full overflow-hidden">
              <thead className="bg-[#fff7e6] text-left text-sm text-gray-700">
                <tr>
                  <th className="px-4 py-3 w-2/3 md:w-2/5">Product</th>
                  <th className="px-4 py-3 max-sm:hidden">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3 max-sm:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 transition hover:bg-[#fffdf8]"
                  >
                    {/* Product */}
                    <td className="px-4 py-3 flex items-center gap-3 truncate">
                      <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-[#fff2cf] to-gray-100 p-2">
                        <Image
                          src={product.image[0]}
                          alt="product image"
                          className="w-16 h-16 object-cover rounded"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <span className="truncate">{product.name}</span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>

                    {/* Price */}
                    <td className="px-4 py-3 font-medium text-gray-800">
                      Rs.{product.offerPrice}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => router.push(`/seller/product-list/edit/${product._id}`)}
                          className="rounded-md bg-[#B8860B] px-3 py-2 text-white transition hover:bg-[#A7780A]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          disabled={deletingId === product._id}
                          className="rounded-md bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 disabled:opacity-60"
                        >
                          {deletingId === product._id ? "Deleting..." : "Delete"}
                        </button>
                        <button
                          onClick={() => router.push(`/product/${product._id}`)}
                          aria-label="Visit product"
                          className="flex items-center gap-2 rounded-md bg-gray-700 px-3 py-2 text-white transition hover:bg-gray-800"
                        >
                          <span>Visit</span>
                          <Image
                            src={assets.redirect_icon}
                            alt="redirect icon"
                            className="h-4 w-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
