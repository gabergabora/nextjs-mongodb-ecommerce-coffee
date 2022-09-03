import { useEffect, useState } from "react";

//? toast
import { Toaster } from "react-hot-toast";

//? store
import { wrapper } from "store/store";

//? styles
import "/styles/global.css";

const MyApp = function ({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position='bottom-right'
        toastOptions={{ style: { fontSize: "1.2rem" } }}
      />
    </>
  );
};

export default wrapper.withRedux(MyApp);
