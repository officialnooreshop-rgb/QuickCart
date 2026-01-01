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

  useEffect(() => {
    if (user) fetchSellerProduct();
  }, [user]);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-gray-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Products</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-left text-sm">
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
                    className="border-t border-gray-300 hover:bg-gray-50 transition"
                  >
                    {/* Product */}
                    <td className="px-4 py-3 flex items-center gap-3 truncate">
                      <div className="bg-gray-200/20 p-2 rounded-lg flex-shrink-0">
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

                    {/* Action */}
                    <td className="px-4 py-3 max-sm:hidden">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center gap-2 px-3 py-2 bg-[#fdb242] text-white rounded-md hover:bg-[#f2a832] transition"
                      >
                        <span className="hidden md:block">Visit</span>
                        <Image
                          src={assets.redirect_icon}
                          alt="redirect icon"
                          className="h-4 w-4"
                        />
                      </button>
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
