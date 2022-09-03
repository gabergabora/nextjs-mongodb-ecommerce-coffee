import Image from "next/image";
import Link from "next/link";

//? store
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "store/slices/cartSlice";

import { addToFavouriteList } from "store/slices/userSlice";

import axios from "axios";

//? icons
import {
  MdOutlineShoppingCart,
  MdFavorite,
  MdRemoveRedEye,
} from "react-icons/md";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const { userInfo, favouriteList } = useSelector((state) => state.user);

  // ? handlers
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const toggleHandler = async (id) => {
    dispatch(addToFavouriteList(id));
    await axios.post(
      "/api/users/favourite",
      { id },
      {
        headers: { authorization: userInfo.token },
      }
    );
  };

  return (
    <article className='flex flex-col items-center w-full max-w-lg py-6 mx-auto rounded gap-y-6 bg-zinc-900 group'>
      <div className='inline-flex gap-5 '>
        <button onClick={() => addToCartHandler(product)}>
          <MdOutlineShoppingCart className='icon-btn' />
        </button>
        <button onClick={() => toggleHandler(product._id)}>
          {favouriteList.find((item) => item === product._id) ? (
            <MdFavorite className='icon-btn text-amber-500' />
          ) : (
            <MdFavorite className='icon-btn' />
          )}
        </button>
        <Link href={`/product/${product._id}`} passHref>
          <a>
            <MdRemoveRedEye className='icon-btn' />
          </a>
        </Link>
      </div>
      <div className='relative w-1/3 transition h-44 lg:h-64 group-hover:scale-105'>
        <Image src={product.image} layout='fill' />
      </div>
      <div className='space-y-2 text-center'>
        <Link href={`/product/${product._id}`} passHref>
          <h4 className='inline-block w-3/4 transition-colors cursor-pointer hover:text-amber-600'>
            {product.name}
          </h4>
        </Link>
        <p className='text-3xl tracking-wider text-amber-500 font-pacifico'>
          ${product.price}
        </p>
      </div>
    </article>
  );
}
