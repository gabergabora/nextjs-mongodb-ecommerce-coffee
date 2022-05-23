//? database
import db from "../lib/db";
import Product from "models/Product";

//? components
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
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: { products: products.map(db.convertDocToObj) },
  };
}
