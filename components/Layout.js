import Head from "next/head";
import { Navbar, Footer } from "components";

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - shop` : "shop"}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <Navbar />
      <main className='bg-black/95 min-h-[62vh]'>{children}</main>
      <Footer />
    </>
  );
}
