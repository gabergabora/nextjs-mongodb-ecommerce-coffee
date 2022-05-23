import Image from "next/image";

//? database
import db from "lib/db";
import Product from "models/Product";

//? components
import { Layout } from "components";

//? store
import { useDispatch } from "react-redux";
import { addToCart } from "store/slices/cartSlice";

export default function ProductPage({ product }) {
  const dispatch = useDispatch();

  // ? handlers
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };
  return (
    <Layout title={product.name}>
      <section>
        <div className='section-container'>
          <div className='grid items-center justify-center grid-cols-1 gap-5 lg:grid-cols-2'>
            <div className='relative mx-auto w-60 h-80'>
              <Image src={product.image} layout='fill' />
            </div>
            <div className='space-y-8'>
              <h1 className='mb-2 text-3xl text-amber-500'>{product.name}</h1>
              <div className='space-y-2'>
                <p>
                  <span className='font-bold text-amber-400'>Category: </span>
                  {product.category}
                </p>
                <p>
                  <span className='font-bold text-amber-400'>Brand: </span>
                  {product.brand}
                </p>
                <p>
                  <span className='font-bold text-amber-400'>Rating: </span>
                  {product.rating}
                </p>
                <div>
                  <span className='font-bold text-amber-400'>
                    Description:{" "}
                  </span>
                  <p
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></p>
                </div>
              </div>
            </div>
            <div className='space-y-3 '>
              <p>
                <span className='font-bold text-amber-400'>price: </span> $
                {product.price}
              </p>
              <p>
                <span className='font-bold text-amber-400'>status: </span>
                {product.countInStock > 0 ? "In stock" : "Unavailable"}
              </p>
              <button
                type='button'
                className='w-1/2 max-w-md link-btn'
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  await db.connect();
  const product = await Product.findById({ _id: id }).lean();
  await db.disconnect();

  return {
    props: { product: db.convertDocToObj(product) },
  };
}
