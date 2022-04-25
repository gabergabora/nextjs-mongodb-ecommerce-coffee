import Link from "next/link";

export default function Banner() {
  return (
    <div className='h-[92vh] bg-banner bg-cover '>
      <div className='flex items-center justify-center h-full bg-gradient-to-bl from-black/60 to-black/30 '>
        <div className='px-2 space-y-5 text-center'>
          <h1>FRESH COFFEE IN THE MORNING</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            quaerat temporibus, eligendi at repellendus nobis.
          </p>
          <Link href='/'>
            <a className='link-btn'>Products</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
