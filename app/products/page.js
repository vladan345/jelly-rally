import React, { Suspense } from "react";
import ProductList from "@/components/ProductList";
import { getAllProductTags, getFilteredProducts } from "@/utils/fetch";
import TagFilter from "@/components/TagFilter";

export default async function Page({ searchParams }) {
   const query = await searchParams;
   const allProductTags = await getAllProductTags();
   const filteredProducts = await getFilteredProducts(query.tag);

   return (
      <div>
         <div className="wrapper">
            <main className="py-20">
               <h1 className="mt-20 mb-16">Shop</h1>
               {allProductTags && <TagFilter products={allProductTags} />}
               <Suspense fallback={<div>Loading...</div>}>
                  <ProductList products={filteredProducts} />
               </Suspense>
            </main>
         </div>
      </div>
   );
}
