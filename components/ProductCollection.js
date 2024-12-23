import { getCollection } from "@/utils/fetch";
import ProductCard from "./ProductCard";

export default async function ProductCollection() {
   const collectionProducts = await getCollection("frontpage");

   return (
      <div>
         <h1 className="mt-16 mb-8">Collection</h1>
         <div className="grid grid-cols-3 gap-8 md:grid-cols-1 lg:grid-cols-2">
            {collectionProducts.map(({ node }) => (
               <ProductCard key={node.id} product={node} />
            ))}
         </div>
      </div>
   );
}
