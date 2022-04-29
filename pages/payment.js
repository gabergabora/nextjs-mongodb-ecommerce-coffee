import { useRouter } from "next/router";

//? components
import { CheckoutWizard, Layout } from "components";

//? store
import { useDispatch } from "react-redux";
import { paymentMethod } from "store/slices/cartSlice";

export default function Payment() {
  const dispatch = useDispatch();

  const router = useRouter();

  //? handlers
  const paymentHandler = () => {
    dispatch(paymentMethod("cash"));
    router.push("/placeorder");
  };

  return (
    <Layout title='payment'>
      <CheckoutWizard step={3} />
      <section>
        <div className='section-container'>
          <div className='max-w-xl px-4 py-6 mx-auto space-y-8 text-center rounded bg-zinc-900 '>
            <p className='text-5xl font-bold'>Only Ca$h</p>
            <p className='text-3xl text-gray-600 '>At this moment</p>
            <button className='link-btn w-80' onClick={paymentHandler}>
              continue
            </button>
            <button
              className='text-black bg-gray-300 border-gray-300 link-btn w-80 hover:bg-gray-400'
              onClick={() => router.push("/shipping")}
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
