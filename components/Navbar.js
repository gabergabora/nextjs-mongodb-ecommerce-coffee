import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

//? icons
import { FaUserCheck } from "react-icons/fa";

//? store
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "store/slices/userSlice";
import { clearCart } from "store/slices/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? local state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //? store
  const {
    cart: { cartItems },
    user: { userInfo },
  } = useSelector((state) => state);

  //? handlers
  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutHander = () => {
    dispatch(userLogout());
    dispatch(clearCart());
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <header className='h-[8vh] border-b border-gray-400 flex items-center justify-center bg-black px-4 py-7 sticky top-0 z-50 shadow-lg'>
      <nav className='flex justify-between flex-1 mx-auto max-w-7xl '>
        <ul className='inline-flex items-center space-x-2'>
          <li>
            <Link href='/'>
              <a className='nav-link'>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/shop'>
              <a className='nav-link'>Shop</a>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <a className='nav-link'>Blog</a>
            </Link>
          </li>
        </ul>
        <ul className='inline-flex items-center space-x-5'>
          <li className='relative '>
            <div>
              <Link href='/cart' passHref>
                <a className='nav-link'>
                  Cart
                  {cartItems.length > 0 && (
                    <span className='absolute text-amber-400 -top-3 -right-3'>
                      {cartItems.length}
                    </span>
                  )}
                </a>
              </Link>
            </div>
          </li>
          <li className='relative'>
            {userInfo ? (
              <button
                className='nav-link text-amber-700'
                type='button'
                onClick={menuHandler}
              >
                <FaUserCheck className='w-6 h-6' />
              </button>
            ) : (
              <Link href='/login'>
                <a className='nav-link'>Login</a>
              </Link>
            )}
            <div
              className={`absolute top-full w-32  rounded right-0 bg-amber-700 text-white ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <ul className='divide-y-2'>
                <li>
                  <button type='button' className='user-item'>
                    Profile
                  </button>
                </li>
                <li>
                  <button type='button' className='user-item'>
                    My Account
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='user-item'
                    onClick={logoutHander}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
