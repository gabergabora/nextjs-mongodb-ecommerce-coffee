import Image from "next/image";
import axios from "axios";

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
    <Layout title={product.name} description={product.description}>
      <section>
        <div className='section-container'>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-center'>
            <div className='relative w-60  h-80 mx-auto'>
              <Image src={product.image} layout='fill' />
            </div>
            <div>
              <h1 className='text-3xl text-amber-500 mb-2'>{product.name}</h1>
              <div className='space-y-1'>
                <p>
                  <span className='text-amber-400 font-bold'>Category: </span>
                  {product.category}
                </p>
                <p>
                  <span className='text-amber-400 font-bold'>Brand: </span>
                  {product.brand}
                </p>
                <p>
                  <span className='text-amber-400 font-bold'>Rating: </span>
                  {product.rating}
                </p>
                <p>
                  <span className='text-amber-400 font-bold'>
                    Description:{" "}
                  </span>
                  {product.description}
                </p>
              </div>
            </div>
            <div className='space-y-1'>
              <p>
                <span className='text-amber-400 font-bold'>price: </span> $
                {product.price}
              </p>
              <p>
                <span className='text-amber-400 font-bold'>status: </span>
                {product.countInStock > 0 ? "In stock" : "Unavailable"}
              </p>
              <button
                type='button'
                className='link-btn max-w-md w-1/2'
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
  const res = await axios.get(process.env.BASE_URL + `/api/products/${id}`);
  return {
    props: { product: res.data },
  };
}
