import Image from "next/image";
import Link from "next/link";
export default function AboutUs() {
  return (
    <section>
      <div className='section-container'>
        <h2 className='mb-8 text-center'>
          <span className='text-amber-700'>About</span> Us
        </h2>
        <article className='grid gap-4 rounded lg:gap-1 lg:grid-cols-2 bg-zinc-900 '>
          <div className='relative h-80 lg:h-full'>
            <Image
              src={"/images/about-img.jpeg"}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='px-4 pb-4 space-y-4 lg:py-4'>
            <h3>What Makes Our Coffee Special?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
              dolore accusantium aliquam doloremque nesciunt assumenda eum optio
              adipisci vero dolor maiores iste ratione possimus maxime,
              provident, laudantium magnam{" "}
            </p>
            <p>
              rerum. Et tempore architecto consequuntur, id vero at animi rem!
              Veniam laudantium dolor corrupti reiciendis iste? Dolorem quas ad
              facere reiciendis, aut voluptatum consequatur blanditiis alias
              praesentium?
            </p>
            <Link href='/'>
              <a className='link-btn'>Learn More</a>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
