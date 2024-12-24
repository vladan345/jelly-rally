import Link from "next/link";
import Image from "next/image";
import { tags } from "@/utils/constants";

function ProductCard({ product }) {
   return (
      <Link
         href={`/products/${product.handle}`}
         className={`bg-transparent rounded-[--radius] border-2 border-[--text] transition duration-500 hover:border-[--accent] hover:text-[--accent] flex flex-col justify-between w-full bg-white`}
      >
         <div className="flex gap-2 mt-4 ml-4 flex-wrap">
            {product.tags.map((tag, index) => (
               <span
                  className={`py-1 px-2 rounded-full capitalize text-white text-sm`}
                  key={index}
                  style={{ backgroundColor: tags[tag] }}
               >
                  {tag}
               </span>
            ))}
         </div>
         <div className={`h-[300px] relative min-h-[300px]`}>
            {product.images.edges[0] ? (
               <Image
                  fill
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              25vw"
                  alt={
                     product.images.edges[0].node.altText
                        ? product.images.edges[0].node.altText
                        : "Product image"
                  }
                  src={product.images.edges[0].node.url}
                  priority
                  className="object-contain"
               />
            ) : (
               <Image
                  fill
                  sizes="(max-width: 768px) 100vw,
           (max-width: 1200px) 50vw,
           25vw"
                  alt="Placeholder image"
                  src="/images/placeholder.svg"
                  priority
                  className="object-contain"
               />
            )}
         </div>
         <div className="flex flex-col px-5 py-7">
            <h2 className="text-base">{product.title}</h2>
            <p className="text-base">
               {product.priceRange.minVariantPrice.amount}{" "}
               {product.priceRange.minVariantPrice.currencyCode}
            </p>
         </div>
      </Link>
   );
}

export default ProductCard;
