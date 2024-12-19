"use client";
import { createContext, useState, useEffect } from "react";
import {
   generateNewCart,
   updateCheckout,
   cartAddItem,
   cartRemoveItem,
} from "@/utils/shopify";

const CartContext = createContext();

export default function ShopProvider({ children }) {
   const [cartItems, setCartItems] = useState([]);
   const [cartOpen, setCartOpen] = useState(false);
   const [checkoutId, setCheckoutId] = useState("");
   const [checkoutUrl, setCheckoutUrl] = useState("");

   useEffect(() => {
      if (localStorage.cart_object) {
         const { lines, id, checkoutUrl } = JSON.parse(
            localStorage.cart_object
         );
         if (lines) {
            setCartItems([...lines.edges]);
         }

         if (id && checkoutUrl) {
            setCheckoutId(id);
            setCheckoutUrl(checkoutUrl);
         }
      }
   }, []);

   async function addToCart(newItem, quantity) {
      setCartOpen(true);

      // if cart is empty
      if (cartItems.length == 0) {
         const cart = await generateNewCart(newItem.id, quantity);
         setCheckoutId(cart.id);
         setCheckoutUrl(cart.checkoutUrl);
         setCartItems(cart.lines.edges);

         localStorage.setItem("cart_object", JSON.stringify(cart));
      } else {
         const newCart = await cartAddItem(checkoutId, newItem);

         setCheckoutId(newCart.id);
         setCheckoutUrl(newCart.checkoutUrl);
         setCartItems(newCart.lines.edges);
         localStorage.setItem("cart_object", JSON.stringify(newCart));
      }
   }

   async function removeCartItem(itemToRemove) {
      const newCart = await cartRemoveItem(checkoutId, itemToRemove);
      setCartItems(newCart.lines.edges);
      localStorage.setItem("cart_object", JSON.stringify(newCart));
   }

   return (
      <CartContext.Provider
         value={{
            cartItems,
            cartOpen,
            setCartOpen,
            addToCart,
            checkoutUrl,
            removeCartItem,
         }}
      >
         {children}
      </CartContext.Provider>
   );
}

const ShopConsumer = CartContext.Consumer;
export { ShopConsumer, CartContext };
