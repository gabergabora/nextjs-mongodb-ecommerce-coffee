import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

//? components
import { Layout } from "components";

//? store
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "store/slices/userSlice";

export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;


  //? store
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  //? form hook
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //? hanle routin
  useEffect(() => {
    if (userInfo) router.push("/");
  }, []);

  //? handlers
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (name && email && password && confirmPassword) {
      try {
        const { data } = await axios.post("api/users/register", {
          name,
          email,
          password,
        });
        dispatch(userLogin(data));
        toast.success("Your Register Successfully");

        router.push(redirect || "/");
      } catch (error) {
        toast.error(error.response.data?.message);
      }
    }
  };

  return (
    <Layout>
      <section>
        <div className='section-container'>
          <h1 className='mb-8 '>Register</h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='max-w-xl px-4 py-8 mx-auto space-y-6 text-center rounded bg-zinc-900 '
          >
            <div className='text-left'>
              <input
                type='text'
                placeholder='Name'
                className='input'
                {...register("name", { required: true, minLength: 3 })}
              />

              <span className='inline-block mt-1 text-red-500 '>
                {errors.name?.type === "required"
                  ? "Name is required"
                  : errors.name?.type === "minLength"
                  ? "Name length is more than 2"
                  : ""}
              </span>
            </div>
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
                {errors.name?.type === "required"
                  ? "Email is required"
                  : errors.name?.type === "pattern"
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
            <div className='text-left'>
              <input
                type='password'
                placeholder='ConfirmPassword'
                className='input'
                {...register("confirmPassword", {
                  required: true,
                  minLength: 6,
                })}
              />
              <span className='inline-block mt-1 text-red-500 '>
                {errors.confirmPassword?.type === "required"
                  ? "ConfirmPassword is required"
                  : errors.password?.type === "minLength"
                  ? "ConfirmPassword length is more than 5"
                  : ""}
              </span>
            </div>
            <button type='submit' className='link-btn w-80'>
              Register
            </button>
            <div className='text-gray-600 '>
              <span>Already have an accont? </span>
              <Link href={`/login?/redirect=${redirect || "/"}`}>
                <a className='tracking-widest transition-colors font-pacifico text-amber-300 hover:text-amber-400'>
                  login
                </a>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
