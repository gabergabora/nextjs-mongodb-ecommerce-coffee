import Image from "next/image";
import Link from "next/link";

export default function BlogCard() {
  return (
    <article className='border border-gray-500'>
      <div className='relative w-full h-64'>
        <Image
          className='transition hover:scale-125'
          src={"/images/blog-1.jpeg"}
          objectFit='cover'
          layout='fill'
        />
      </div>
      <div className='p-4 space-y-3'>
        <h3 className='text-2xl'>Tasty And Refreshing Coffee</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          suscipit.
        </p>
        <Link href='/'>
          <a className='link-btn'>Read More</a>
        </Link>
      </div>
    </article>
  );
}
