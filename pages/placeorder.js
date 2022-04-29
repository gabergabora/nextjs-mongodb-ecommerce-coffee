import dynamic from "next/dynamic";

//? components
import { CartTable, Layout } from "components";

//? store
import { useSelector } from "react-redux";

function PlaceOrder() {
  //? store
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );


  //? helpers
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return (
    <Layout title='place order'>
      <section>
        <div className='section-container'>
          <h1 className='mb-8 text-2xl'>Place Order</h1>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <div className='space-y-6 col lg:col-span-2'>
              <div className='h-32 px-3 py-4 space-y-4 rounded bg-zinc-900'>
                <h2 className='text-gray-400 '>Shipping Address</h2>
                <p className='text-lg'>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </p>
              </div>

              <div className='h-32 px-3 py-4 space-y-4 rounded bg-zinc-900'>
                <h2 className='text-gray-400 '>Payment Method</h2>
                <p className='text-lg'>{paymentMethod}</p>
              </div>

              <div className='px-3 py-4 space-y-4 rounded '>
                <h2 className='text-gray-400 '>Order Items</h2>
                <CartTable cartItems={cartItems} />
              </div>
            </div>

            <div className='p-6 lg:col-span-1 h-44 bg-zinc-900 lg:sticky lg:top-24 '>
              <p>
                <span className='pr-4 text-xl text-amber-400'>
                  Total Items:{" "}
                </span>
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </p>
              <p>
                <span className='pr-20 text-xl text-amber-400'>Tax: </span>$
                {taxPrice}
              </p>
              <p>
                <span className='text-xl text-amber-400 pr-7'>Shipping: </span>$
                {shippingPrice}
              </p>
              <p>
                <span className='pr-4 text-xl text-amber-400'>
                  Total Price:{" "}
                </span>
                ${totalPrice}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
