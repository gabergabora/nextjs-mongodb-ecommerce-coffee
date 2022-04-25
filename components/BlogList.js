import {BlogCard} from "components";

export default function BlogList() {
  return <section>
      <div className="section-container">
      <h2 className='mb-8 text-center'>
          Our
          <span className='text-amber-700'> Blogs</span>
        </h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
  </section>;
}
