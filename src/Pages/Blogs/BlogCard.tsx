import { Link } from "react-router-dom";

type TBlogCard = {
    _id: string;
    title: string;
    content: string;
    image: string;
}
const BlogCard: React.FC<TBlogCard> = ({ _id, title, content, image }) => {
    return (
        <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="flex flex-col gap-5 bg-[#0E1330] border border-[#282D45] rounded-3xl"
        >
            <img className="rounded-t-3xl" src={image} alt="" />
            <h1 className="font-Poppins text-[18px] font-semibold text-white px-5">
                {title}
            </h1>
            <p className="font-Poppins text-base font-normal text-[#939393] px-5">
                {content}
            </p>
            <Link to={`/dashboard/blog/${_id}`} className="font-Poppins text-base font-semibold text-[#0696E7] underline px-5 pb-3 transition duration-300 transform hover:-translate-y-0.5 w-[157px]">
                Read more
            </Link>
        </div>
    );
};

export default BlogCard;