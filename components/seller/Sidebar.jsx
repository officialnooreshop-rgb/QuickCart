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
    { name: 'Emails', path: '/seller/emails', icon: assets.message_icon },
    { name: 'Settings', path: '/seller/settings', icon: null },
  ];

  return (
    <div className="md:w-64 w-16 min-h-screen border-r border-gray-300 py-4 flex flex-col bg-gradient-to-b from-[#fffdf8] to-[#fff7e6] shadow-[8px_0_30px_rgba(0,0,0,0.05)]">
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link href={item.path} key={item.name} passHref>
            <div
              className={`
                flex items-center py-3 px-4 gap-4 rounded-r-xl transition-all duration-200 cursor-pointer
                ${isActive 
                  ? "bg-[#fff2cf] border-r-4 border-[#d4af37] shadow-inner" 
                  : "hover:bg-white/70 hover:backdrop-blur-sm"
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
              {!item.icon && <span className="flex h-7 w-7 items-center justify-center text-xl text-[#b8860b]">⚙</span>}
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
