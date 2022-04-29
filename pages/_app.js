import { useEffect, useState } from "react";

//? toast
import { Toaster } from "react-hot-toast";

//? store
import { Provider } from "react-redux";
import { store } from "store/store";

//? styles
import "/styles/global.css";

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <Provider store={store}>
      <>
        <Component {...pageProps} />
        <Toaster
          position='bottom-right'
          toastOptions={{ style: { fontSize: "1.2rem" } }}
        />
      </>
    </Provider>
  );
}
