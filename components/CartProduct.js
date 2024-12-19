import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "context/shopContext";

function CartProduct({ item }) {
   const options = item.merchandise.selectedOptions;
   const images = item.merchandise.product.images.edges;
   console.log(images);
   const { removeCartItem } = useContext(CartContext);

   return (
      <div className="CartProduct my-8">
         <div className="relative flex flex-col laptop:flex-row py-8 border-2 border-black rounded-[--radius]">
            <Image
               className="cursor-pointer hover:opacity-20 transition duration-500 absolute right-4 top-4"
               src="/images/close.svg"
               alt="remove icon"
               width={20}
               height={20}
               onClick={() => removeCartItem(item.id)}
            />
            <div className="relative h-auto laptop:w-72 min-h-[200px] ">
               {images.length != 0 ? (
                  <Image
                     src={images[0].node.url}
                     alt={images[0].node.altText}
                     fill
                     className="object-contain"
                     priority
                     sizes="33vw"
                  />
               ) : (
                  <Image
                     alt="Placeholder image"
                     src="/images/placeholder.svg"
                     fill
                     className="object-contain"
                     priority
                     sizes="33vw"
                  />
               )}
            </div>
            <div className="px-8 mt-4">
               <h3 className="mb-4">{item.merchandise.product.title}</h3>
               <div className="grid grid-cols-2 grid-rows-2 laptop:gap-8 gap-4">
                  {options &&
                     options.map(({ name, value }) => {
                        if (name != "Title") {
                           return (
                              <div key={name}>
                                 <h6>{name}</h6>
                                 <p>{value}</p>
                              </div>
                           );
                        }
                     })}
                  <div>
                     <h6>Quantity</h6>
                     <p>
                        {item.quantity} x {item.merchandise.price.amount}{" "}
                        {item.merchandise.price.currencyCode}
                     </p>
                  </div>
                  <div>
                     <h6>Price</h6>
                     <p>
                        {item.quantity * item.merchandise.price.amount}.0{" "}
                        {item.merchandise.price.currencyCode}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CartProduct;
