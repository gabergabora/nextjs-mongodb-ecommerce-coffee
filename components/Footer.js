import Image from "next/image";

export default function Footer() {
  return (
    <footer className='h-[30vh] bg-zinc-900'>
      <div className='section-container'>
        <div className='grid items-center grid-cols-2'>
          <div className='p-2 col'>
            <div className='relative w-56 h-64 col'>
              <Image src={"/images/footer.jpg"} layout='fill' />
            </div>
          </div>
          <div className='px-2 space-y-5 text-center col-2'>
            <h3>FRESH COFFEE IN THE MORNING</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            </p>
            <a
              href='http://heydari-dev.ir'
              target='_balnk'
              className='text-amber-400 '
            >
              Developed By Kamal Heydari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
