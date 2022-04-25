import dynamic from "next/dynamic";
import Image from "next/image";
import {useRouter} from "next/router";
//? components
import { Layout } from "components";

//? store
import { useSelector, useDispatch } from "react-redux";

//? icons
import { BsFillTrashFill } from "react-icons/bs";
import { removeFromCart } from "store/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? store
  const { cartItems } = useSelector((state) => state.cart);

  //? handlers
  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <Layout title='shopping cart'>
      <section>
        <div className='section-container text-white'>
          <h1 className='text-2xl mb-8'>Shopping Cart</h1>
          <div className=' grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <div className=' lg:col-span-2 col'>
              <table className='grid'>
                <thead className=''>
                  <tr className='text-amber-400 grid grid-cols-5 capitalize'>
                    <th>image</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody className='  space-y-5 py-3 '>
                  {cartItems.map((item) => (
                    <tr
                      key={item._id}
                      className='grid grid-cols-5 items-center text-center bg-zinc-900 p-2'
                    >
                      <td className='relative h-16 w-14 mx-auto '>
                        <Image src={item.image} layout='fill' />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        <button
                          type='button'
                          className='p-1 text-gray-300 hover:text-red-600 transition-colors'
                          onClick={() => dispatch(removeFromCart(item._id))}
                        >
                          <BsFillTrashFill className='mx-auto h-7 w-7   ' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='lg:col-span-1 h-60 bg-zinc-900  mt-9 lg:sticky lg:top-12 p-6 text-center'>
              <p>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </p>
              <br />
              <button
                type='button'
                className='link-btn w-full'
                onClick={checkoutHandler}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
