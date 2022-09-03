import Image from "next/image";
import jwt from "jsonwebtoken";

//? database
import db from "lib/db";
import Product from "models/Product";
import User from "models/User";

//? components
import { Layout } from "components";
import { MdFavorite } from "react-icons/md";

//? store
import { useDispatch } from "react-redux";
import { addToCart } from "store/slices/cartSlice";
import { wrapper } from "store/store";


export default function ProductPage({ productData: product }) {
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
            {product.isFavourite && (
              <div className='flex items-center gap-3'>
                <MdFavorite className='h-12 w-12 text-amber-500' />
                <span className='text-amber-300 text-base'>
                  you have this product in faviourite list
                </span>
              </div>
            )}
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params: { id } }) => {

    // access to store
    const { userInfo } = store.getState().user;

    const decoded = await jwt.verify(userInfo.token, process.env.JWT_SECRET);

    await db.connect();
    const user = await User.findOne({ _id: decoded._id });
    const product = await Product.findById({ _id: id }).lean();
    await db.disconnect();

    let inFavouriteList = user.favouriteList.find((item) => item === id);

    const productData = {
      ...db.convertDocToObj(product),
      isFavourite: inFavouriteList ? true : false,
    };

    return {
      props: {
        productData,
      },
    };
  }
);
