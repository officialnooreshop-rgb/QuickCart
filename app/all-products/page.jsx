'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
    const { products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-4 pb-20"> {/* Added pb-20 for footer spacing */}
                
                {/* Section Header */}
                <div className="flex flex-col items-end">
                    <p className="text-2xl md:text-3xl font-semibold text-[#1E2A38]">
                        All Products
                    </p>
                    <div className="w-16 h-1 bg-[#fdb242] rounded-full mt-1"></div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 w-full">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="transition-transform duration-300 hover:scale-105"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
