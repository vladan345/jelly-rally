import ProductList from "components/ProductList";
import { getAllProducts } from "@/utils/shopify";

export default async function Page() {
   const products = await getAllProducts();
   return (
      <div>
         <div className="wrapper">
            <main className="py-40">
               <h1 className="mb-16">Home</h1>
               <ProductList products={products} />
            </main>
         </div>
      </div>
   );
}
