import ProductList from "@/components/ProductList";
import { getAllProducts } from "@/utils/shopify";

export default async function Page() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="wrapper">
        <main className="py-20">
          <h1 className="mt-20 mb-16">Shop</h1>
          <ProductList products={products} />
        </main>
      </div>
    </div>
  );
}
