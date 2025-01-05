
import Ripples from 'react-ripples';
import { Link } from 'react-router-dom';
import { useGetAllBlogsQuery } from '../../Redux/Features/Blogs/blogApi';
import BlogCard from './BlogCard';

type TBlog = {
    _id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    author: string;
    updatedAt: string;
}
const Blogs = () => {
    const { data } = useGetAllBlogsQuery({});
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between font-Poppins">
                <h1 className="text-[#aeb9e1] text-2xl font-semibold">
                    All Blogs
                </h1>
                <Ripples placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Link to={"/dashboard/create-blog"}
                        className="bg-[#1C2242] border border-[#282D45] p-3 rounded-lg text-[#aeb9e1]">
                        Add New Blog
                    </Link>
                </Ripples>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-9 mt-10'>
                {
                    data?.data?.map((blog: TBlog) =>
                        <BlogCard key={blog?._id} {...blog} />
                    )
                }
            </div>
        </div>
    );
};

export default Blogs;