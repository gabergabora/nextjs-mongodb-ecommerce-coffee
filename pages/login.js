import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "components";
import { useEffect, useId, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "store/slices/userSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  //? store
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
            className='bg-zinc-900 space-y-8 px-4 py-6 max-w-xl text-center mx-auto rounded '
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
              <span className=' mt-1 inline-block text-red-500'>
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
              <span className=' mt-1 inline-block text-red-500'>
                {errors.password?.type === "required"
                  ? "Password is required"
                  : errors.password?.type === "minLength"
                  ? "Password length is more than 5"
                  : ""}
              </span>
            </div>
            <button
              type='submit'
              className='link-btn w-80'
              onClick={submitHandler}
            >
              Login
            </button>
            <div className='text-gray-600 '>
              <span>Don't have an accont? </span>
              <Link href={`/register?redirect=${redirect || "/"}`}>
                <a className='font-pacifico text-amber-300 tracking-widest'>
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
