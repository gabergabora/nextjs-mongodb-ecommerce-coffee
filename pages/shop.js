import axios from "axios";

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
  const res = await axios.get(process.env.BASE_URL + "/api/products");
  return {
    props: { products: res.data },
  };
}
