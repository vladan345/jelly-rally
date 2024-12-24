import ProductList from "components/ProductList";
import { getProducts } from "@/utils/fetch";
import ProductCollection from "@/components/ProductCollection";
import Newsletter from "@/components/Newsletter";

export default async function Page() {
   const products = await getProducts(8);

   return (
      <div>
         <div className="wrapper">
            <main className="py-40">
               <h1 className="mb-16">Home</h1>
               <ProductList products={products} />
               <ProductCollection />
               <Newsletter />
            </main>
         </div>
      </div>
   );
}
