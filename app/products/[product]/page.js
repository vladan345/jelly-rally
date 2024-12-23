import { getProduct } from "@/utils/fetch";
import ProductDetails from "@/components/ProductDetails";

export default async function Page({ params }) {
   const productParams = await params;
   const productData = await getProduct(productParams.product);
   return (
      <div className="ProductPage tablet:py-40 py-28">
         <ProductDetails productData={productData} />
      </div>
   );
}
