import Image from "next/image";
import { removeFromCart } from "store/slices/cartSlice";

//? icons
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function CartTable({ cartItems, cart }) {
  const dispatch = useDispatch();

  return (
    <table className='grid'>
      <thead className=''>
        <tr
          className={`text-amber-400 grid capitalize ${
            cart ? "grid-cols-5" : "grid-cols-4"
          }`}
        >
          <th>image</th>
          <th>name</th>
          <th>quantity</th>
          <th>price</th>
          {cart && <th>action</th>}
        </tr>
      </thead>
      <tbody className='py-3 space-y-5 text-white '>
        {cartItems.map((item) => (
          <tr
            key={item._id}
            className={`grid  ${
              cart ? "grid-cols-5" : "grid-cols-4"
            } items-center text-center bg-zinc-900 p-2`}
          >
            <td className='relative h-16 mx-auto w-14 '>
              <Image src={item.image} layout='fill' />
            </td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            {cart && (
              <td>
                <button
                  type='button'
                  className='p-1 text-gray-300 transition-colors hover:text-red-600'
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  <BsFillTrashFill className='mx-auto h-7 w-7 ' />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
