import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Add Product', path: '/seller', icon: assets.add_icon },
    { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
    { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    { name: 'Messages', path: '/seller/messages', icon: assets.message_icon },
  ];

  return (
    <div className="md:w-64 w-16 min-h-screen border-r border-gray-300 py-4 flex flex-col bg-white/50 backdrop-blur-md shadow-lg">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link href={item.path} key={item.name} passHref>
            <div
              className={`
                flex items-center py-3 px-4 gap-4 rounded-r-xl transition-all duration-200 cursor-pointer
                ${isActive 
                  ? "bg-[#fdb242]/30 border-r-4 border-[#d4af37] shadow-inner" 
                  : "hover:bg-gray-100/30 hover:backdrop-blur-sm"
                }
              `}
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={`${item.name.toLowerCase()}_icon`}
                  className="w-7 h-7 transition-transform hover:scale-110"
                />
              )}
              <p className="md:block hidden text-gray-800 font-medium select-none">
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
