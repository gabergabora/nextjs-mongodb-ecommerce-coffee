import { ProductCard } from "components";

export default function ProductList({ products }) {
  return (
    <section>
      <div className='section-container'>
        <h2 className='mb-8 text-center'>
          Our
          <span className='text-amber-700'> Products</span>
        </h2>
        <div className='grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
