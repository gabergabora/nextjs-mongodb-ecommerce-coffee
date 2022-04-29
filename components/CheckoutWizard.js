//? icons
import {
  FaUserCheck,
  FaAddressCard,
  FaPaypal,
  FaJediOrder,
} from "react-icons/fa";

export default function CheckoutWizard({ step }) {
  const checkout = [
    { id: 1, text: "login", icon: <FaUserCheck className='w-6 h-6 ' /> },
    {
      id: 2,
      text: "address",
      icon: <FaAddressCard className='w-6 h-6' />,
    },
    {
      id: 3,
      text: "payment ",
      icon: <FaPaypal className='w-6 h-6 ' />,
    },
    {
      id: 4,
      text: "place order",
      icon: <FaJediOrder className='w-6 h-6 ' />,
    },
  ];

  return (
    <section>
      <div className='p-4 section-container'>
        <div className='flex items-center mx-4'>
          {checkout.map((item) => (
            <>
              <div className='relative flex items-center text-gray-500'>
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 p-2.5 border-2  ${
                    item.id < step
                      ? " border-amber-300 text-amber-300"
                      : item.id > step
                      ? "border-gray-300 text-gray-300"
                      : "bg-amber-300 border-amber-300 text-gray-800"
                  }`}
                >
                  {item.icon}
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                    item.id > step ? "text-gray-500" : "text-amber-300"
                  }`}
                >
                  {item.text}
                </div>
              </div>
              {item.id !== checkout.length && (
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
                    item.id >= step ? "border-gray-500" : "border-amber-300"
                  } `}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
