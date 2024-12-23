import ProductCard from "./ProductCard";

function ProductList({ products }) {
   return (
      <div className="gap-7 tablet:grid-cols-4 tablet:grid-rows-2 grid grid-cols-1 w-full">
         {products.map((product) => {
            return <ProductCard product={product.node} key={product.node.id} />;
         })}
      </div>
   );
}

export default ProductList;
