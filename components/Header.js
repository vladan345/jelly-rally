"use client";
import Image from "next/image";
import Link from "next/link";
import MiniCart from "./MiniCart";

import { useContext } from "react";
import { CartContext } from "context/shopContext";

function Header() {
   const { cartItems, cartOpen, setCartOpen } = useContext(CartContext);
   let cartQuantity = 0;
   cartItems.map(({ node }) => {
      return (cartQuantity += node?.quantity);
   });

   return (
      <header className=" py-3 border-b-2 border-[--text] fixed top-0 w-full bg-[--background] z-[10000]">
         <div className="wrapper h-full relative">
            <MiniCart type="sidecart" />
            <div className="flex w-full h-full items-center justify-between">
               <Link href="/" className="logo">
                  <Image
                     className="h-[55px]"
                     src="/images/logo.svg"
                     alt="Shop logo"
                     width={100}
                     height={44}
                     priority
                  />
               </Link>
               <nav className="flex gap-6 items-end">
                  <Link href="/products" className="pb-1 underline-link">
                     Shop
                  </Link>
                  <div
                     onClick={() => setCartOpen(true)}
                     className="pb-1 underline-link cursor-pointer"
                     data-cursor="pointer"
                  >
                     <Image
                        src="/images/bag-icon.svg"
                        alt="bag icon"
                        width={20}
                        height={25}
                        className="w-5 h-auto"
                     />
                     <span
                        className={`absolute right-[-10px] top-[-5px] rounded-full text-[10px] text-white bg-black h-4 w-4 transition duration-700 flex justify-center items-center ${
                           cartQuantity == 0 ? "opacity-0" : "opacity-1"
                        }`}
                     >
                        {cartQuantity}
                     </span>
                  </div>
               </nav>
            </div>
         </div>
      </header>
   );
}

export default Header;
