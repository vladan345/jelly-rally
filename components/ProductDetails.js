"use client";
import { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import { CartContext } from "context/shopContext";
import { tags } from "@/utils/constants";
import Link from "next/link";

function ProductDetails({ productData }) {
   console.log(productData);
   const { addToCart } = useContext(CartContext);
   const [quantity, setQuantity] = useState(1);
   const allVariantOptions = productData.variants.edges?.map((variant) => {
      const allOptions = {};

      //Custom objekat sa opcijama koje moraju da budu selektovane za odredjenu varijantu
      variant.node.selectedOptions.map((option) => {
         allOptions[option.name] = option.value;
      });

      return {
         id: variant.node.id,
         title: productData.title,
         handle: productData.handle,
         image: variant.node.image?.url,
         altText: variant.node.image?.altText,
         options: allOptions,
         price: variant.node.price,
         quantity: quantity,
         currencyCode: variant.node.price.currencyCode,
         weight: variant.node.weight,
         weightUnit: variant.node.weightUnit,
      };
   });

   const defaultValues = {};
   productData.options.map((item) => {
      defaultValues[item.name] = item.values[0];
   });
   const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
   const [selectedOptions, setSelectedOptions] = useState(defaultValues);

   function setOptions(name, value) {
      setSelectedOptions((prevState) => {
         return {
            ...prevState,
            [name]: value,
         };
      });

      const selection = {
         ...selectedOptions,
         [name]: value,
      };

      allVariantOptions.map((item) => {
         if (JSON.stringify(item.options) === JSON.stringify(selection)) {
            setSelectedVariant(item);
         }
      });
   }

   const addToCartBtn = useRef(null);

   const handleQuantityChange = (isInc) => {
      if (quantity >= 1) {
         if (isInc) {
            setQuantity(quantity + 1);
         } else {
            setQuantity(quantity - 1);
         }

         setSelectedVariant({
            ...selectedVariant,
            quantity: isInc ? quantity + 1 : quantity - 1,
         });
      }
   };

   return (
      <div className="ProductDetails">
         <div className="wrapper flex tablet:flex-row flex-col gap-10">
            {productData.featuredImage ? (
               <Image
                  src={productData.featuredImage.url}
                  alt={
                     productData.featuredImage.altText
                        ? productData.featuredImage.altText
                        : "Product image"
                  }
                  width={600}
                  height={600}
                  className="tablet:w-1/2 w-full mb-8 h-auto object-contain rounded-xl border-2 border-black"
                  priority
               />
            ) : (
               <Image
                  alt="Placeholder image"
                  src="/images/placeholder.svg"
                  width={600}
                  height={600}
                  className="tablet:w-1/2 w-full mb-8 h-auto object-contain rounded-xl border-2 border-black"
                  priority
               />
            )}

            <div className="details tablet:w-1/2 w-full">
               <h1>{productData.title}</h1>
               <p className="text-2xl my-4">
                  <span>{selectedVariant.weight}</span>{" "}
                  {selectedVariant.weightUnit == "OUNCES" ? "oz" : "g"}
               </p>
               <p className="text-lg">{productData.description}</p>

               <div className="my-10 flex gap-10 flex-col">
                  {productData.options &&
                     productData.options.map((option) => {
                        if (option.name != "Title") {
                           return (
                              <div key={`key-${option.name}`}>
                                 <h3 className="mb-2">{option.name}</h3>
                                 <div className="flex gap-4 flex-wrap">
                                    {option.values.map((value, index) => {
                                       const checked =
                                          selectedOptions[option.name] ===
                                          value;
                                       return (
                                          <button
                                             key={index}
                                             className={`link border-2 border-[--black] rounded-[--radius] hover:border-[--accent] hover:text-[--accent] transition duration-500 min-w-[55px] h-[55px] px-2 ${
                                                checked
                                                   ? "border-[--accent] text-[--accent]"
                                                   : ""
                                             }`}
                                             onClick={() => {
                                                setOptions(option.name, value);
                                             }}
                                          >
                                             {value}
                                          </button>
                                       );
                                    })}
                                 </div>
                              </div>
                           );
                        }
                     })}
                  <div className="flex flex-col gap-2 items-start">
                     {productData.tags.map((tag, index) => (
                        <Link
                           href={`/products?tag=${tag
                              .toLowerCase()
                              .replace(" ", "-")}`}
                           key={index}
                           className="capitalize text-white px-2 rounded-full hover:opacity-70 transition-all duration-500"
                           style={{
                              backgroundColor:
                                 tag === tag.toLowerCase() ? tags[tag] : "",
                           }}
                        >
                           {tag}
                        </Link>
                     ))}
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="inline-flex items-center border-2 border-[--black] rounded-[--radius] hover:border-[--accent] hover:text-[--accent] transition duration-500 min-w-[55px] h-[55px] px-4">
                        <Image
                           src="/images/minus.svg"
                           alt="decrease quantity"
                           width={20}
                           height={20}
                           onClick={() => handleQuantityChange(false)}
                           data-cursor="pointer"
                        />
                        <input
                           className="bg-transparent inline-block text-center w-20 mb-0"
                           type="number"
                           name="quantity"
                           id="quantity"
                           min={1}
                           readOnly
                           value={quantity}
                        />
                        <Image
                           src="/images/plus.svg"
                           alt="increase quantity"
                           width={20}
                           height={20}
                           onClick={() => handleQuantityChange(true)}
                           data-cursor="pointer"
                        />
                     </div>
                     <h3>
                        {selectedVariant.price.amount}{" "}
                        {selectedVariant.price.currencyCode}
                     </h3>
                  </div>
                  <button
                     ref={addToCartBtn}
                     data-cursor="pointer"
                     className="py-3 link flex-grow border-2 border-[--black] rounded-[--radius] hover:border-[--accent] hover:text-[--accent] transition duration-500 tablet:w-1/2 w-full"
                     onClick={() => {
                        addToCart(selectedVariant, quantity);
                        addToCartBtn.current.disabled = true;
                        setTimeout(() => {
                           addToCartBtn.current.disabled = false;
                        }, 1000);
                     }}
                  >
                     Add to cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;
