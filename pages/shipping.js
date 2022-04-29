import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

//? components
import { Layout, CheckoutWizard } from "components";

//? store
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "store/slices/cartSlice";

export default function Shipping() {
  const router = useRouter();

  //? form hook
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  //? store
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  //? hanlde routing
  if (!userInfo) router.push("/login?redirect=/shipping");

  //? hanlers
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    if (fullName && address && city && postalCode && country) {
      console.log("clici");
      dispatch(
        saveShippingAddress({ fullName, address, city, postalCode, country })
      );
      router.push("/payment");
    }
  };

  return (
    <Layout title='shipping'>
      <CheckoutWizard step={2} />
      <section>
        <div className='section-container'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='max-w-xl px-4 py-6 mx-auto space-y-8 text-center rounded bg-zinc-900 '
          >
            <div className='text-left'>
              <input
                type='text'
                placeholder='full name'
                className='input'
                {...register("fullName", {
                  required: true,
                  minLength: 2,
                })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.fullName?.type === "required"
                  ? "Full Name is required"
                  : errors.fullName?.type === "minLength"
                  ? "Full Name length is more than 1"
                  : ""}
              </span>
            </div>
            <div className='text-left'>
              <input
                type='text'
                placeholder='address'
                className='input'
                {...register("address", { required: true, minLength: 2 })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.address?.type === "required"
                  ? "Address is required"
                  : errors.address?.type === "minLength"
                  ? "Address length is more than 1"
                  : ""}
              </span>
            </div>
            <div className='text-left'>
              <input
                type='text'
                placeholder='city'
                className='input'
                {...register("city", { required: true, minLength: 2 })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.city?.type === "required"
                  ? "City is required"
                  : errors.city?.type === "minLength"
                  ? "City length is more than 1"
                  : ""}
              </span>
            </div>
            <div className='text-left'>
              <input
                type='text'
                placeholder='postalCode'
                className='input'
                {...register("postalCode", { required: true, minLength: 2 })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.postalCode?.type === "required"
                  ? "City is required"
                  : errors.postalCode?.type === "minLength"
                  ? "City length is more than 1"
                  : ""}
              </span>
            </div>
            <div className='text-left'>
              <input
                type='text'
                placeholder='country'
                className='input'
                {...register("country", { required: true, minLength: 2 })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.country?.type === "required"
                  ? "Country is required"
                  : errors.country?.type === "minLength"
                  ? "Country length is more than 1"
                  : ""}
              </span>
            </div>
            <button type='submit' className='link-btn w-80'>
              continue
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
