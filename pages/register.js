import Link from "next/link";
import axios from "axios";
import { Layout } from "components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userLogin } from "store/slices/userSlice";

export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch=useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) router.push("/");
  }, []);

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
        dispatch(userLogin(data))
        toast.success('Your Register Successfully');

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
            className='bg-zinc-900 space-y-6 px-4 py-8 max-w-xl text-center mx-auto rounded '
          >
            <div className='text-left'>
              <input
                type='text'
                placeholder='Name'
                className='input'
                {...register("name", { required: true, minLength: 3 })}
              />

              <span className=' mt-1 inline-block text-red-500'>
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
              <span className=' mt-1 inline-block text-red-500'>
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
              <span className=' mt-1 inline-block text-red-500'>
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
              <span className=' mt-1 inline-block text-red-500'>
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
                <a className='font-pacifico text-amber-300 tracking-widest hover:text-amber-400 transition-colors'>
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
