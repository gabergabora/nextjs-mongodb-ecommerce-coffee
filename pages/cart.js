import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

//? components
import { Layout, CartTable } from "components";

//? store
import { useSelector } from "react-redux";

function Cart() {
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
        <div className='text-white section-container'>
          <h1 className='mb-8 text-2xl'>Shopping Cart</h1>
          {cartItems.length > 0 ? (
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              <div className=' lg:col-span-2 col'>
                <CartTable cart cartItems={cartItems} />
              </div>
              <div className='p-6 lg:col-span-1 h-52 bg-zinc-900 mt-9 lg:sticky lg:top-20 '>
                <p>
                  <span className='pr-4 text-xl text-amber-400'>
                    Total Items:{" "}
                  </span>
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </p>
                <p>
                  <span className='pr-4 text-xl text-amber-400'>
                    Total Price:{" "}
                  </span>
                  ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>

                <br />
                <button
                  type='button'
                  className='w-full link-btn'
                  onClick={checkoutHandler}
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className='p-4 space-y-16 text-center bg-zinc-900 '>
              <p className='text-4xl font-pacifico text-amber-500'>
                your Cart is empty
              </p>
              <Link href='/'>
                <a className='link-btn'>Go To Shop</a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
