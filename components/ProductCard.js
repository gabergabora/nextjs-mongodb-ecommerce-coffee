import Image from "next/image";
import Link from "next/link";

//? store
import { useDispatch } from "react-redux";
import { addToCart } from "store/slices/cartSlice";

//? icons
import {
  MdOutlineShoppingCart,
  MdFavorite,
  MdRemoveRedEye,
} from "react-icons/md";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  // ? handlers
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <article className='flex flex-col items-center w-full max-w-lg py-6 mx-auto gap-y-6 bg-zinc-900 group rounded'>
      <div className='inline-flex gap-5 '>
        <button onClick={() => addToCartHandler(product)}>
          <MdOutlineShoppingCart className='icon-btn' />
        </button>
        <MdFavorite className='icon-btn' />
        <Link href={`/product/${product._id}`} passHref>
          <a>
            <MdRemoveRedEye className='icon-btn' />
          </a>
        </Link>
      </div>
      <div className='relative w-1/3 h-60 group-hover:scale-105 transition'>
        <Image src={product.image} layout='fill' />
      </div>
      <div className='space-y-2 text-center'>
        <Link href={`/product/${product._id}`} passHref>
          <h3 className='transition-colors cursor-pointer hover:text-amber-600'>
            {product.name}
          </h3>
        </Link>
        <p>{product.rating}</p>
        <p>${product.price}</p>
      </div>
    </article>
  );
}
