import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

//? components
import { Layout } from "components";

//? store
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "store/slices/userSlice";

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  
  //? hook form
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  
  //? store
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  //? handlers
  const submitHandler = async ({ email, password }) => {
    if (email && password) {
      try {
        const { data } = await axios.post("/api/users/login", {
          email,
          password,
        });
        dispatch(userLogin(data));
        router.push(redirect || "/");
      } catch (error) {
        toast.error(error.response.data?.message);
      }
    }
  };

  //? hanlde routing
  useEffect(() => {
    if (userInfo) router.push("/");
  }, []);

  return (
    <Layout>
      <section>
        <div className='section-container '>
          <h1 className='mb-8'>Login</h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='max-w-xl px-4 py-6 mx-auto space-y-8 text-center rounded bg-zinc-900 '
          >
            <div className='text-left'>
              <input
                type='email'
                placeholder='Email'
                className='input'
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.email?.type === "required"
                  ? "Email is required"
                  : errors.email?.type === "pattern"
                  ? "Email is not valid"
                  : ""}
              </span>
            </div>
            <div className='text-left'>
              <input
                type='password'
                placeholder='Password'
                className='input'
                {...register("password", { required: true, minLength: 6 })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.password?.type === "required"
                  ? "Password is required"
                  : errors.password?.type === "minLength"
                  ? "Password length is more than 5"
                  : ""}
              </span>
            </div>
            <button type='submit' className='link-btn w-80'>
              Login
            </button>
            <div className='text-gray-600 '>
              <span>Don't have an accont? </span>
              <Link href={`/register?redirect=${redirect || "/"}`}>
                <a className='tracking-widest font-pacifico text-amber-300'>
                  Register
                </a>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
