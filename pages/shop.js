//? database
import db from "lib/db";
import Product from "models/Product";

//? components
import { Layout, ProductCard } from "components";

export default function Shop({ products }) {
  return (
    <Layout>
      <section>
        <div className='section-container'>
          <div className='grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: { products: products.map(db.convertDocToObj) },
  };
}
