import axios from "axios";
import { AboutUs, Banner, BlogList, Layout, ProductList } from "components";

export default function Home({ products }) {
  return (
    <Layout title='Coffee' description='fresh coffee in the morning'>
      <Banner />
      <AboutUs />
      <ProductList products={products} />
      <BlogList />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(process.env.BASE_URL + "/api/products");
  return {
    props: { products: res.data },
  };
}
