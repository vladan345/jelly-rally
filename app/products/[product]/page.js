import { getProduct } from "@/utils/shopify";
import ProductDetails from "@/components/ProductDetails";
import DevTools from "@/components/DevTools";

export default async function Page({ params }) {
   const productData = await getProduct(params.product);
   return (
      <div className="ProductPage tablet:py-40 py-28">
         <ProductDetails productData={productData} />
         <DevTools />
      </div>
   );
}
