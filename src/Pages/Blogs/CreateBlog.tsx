/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Ripples from 'react-ripples';
import { useCreateBlogMutation } from "../../Redux/Features/Blogs/blogApi";
import { toast } from "sonner";
import JoditEditor from 'jodit-react';

const CreateBlog = () => {
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState("");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null | undefined>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const editor = useRef(null);

    useEffect(() => {
        setContentError("");
        if (content?.length === 0) {
            setContentError("");
        } else if (content?.length < 1) {
            setContentError("Content is required");
        } else {
            setContentError("");
        }
    }, [content]);

    const handleCreateBlog = async (data: Record<string, any>): Promise<void> => {
        const formData = new FormData();
console.log(content);
        const blogData = {
            title: data.title,
            content: content,
            author: data.author,
        };

        formData.append("data", JSON.stringify(blogData));

        if (imageFile) formData.append("file", imageFile);

        try {
            const response = await createBlog(formData).unwrap();
            console.log(response)
            if (response.success) {
                toast.success("Blog added successfully.");
                reset();
                setImageFile(null);
                setImagePreview(null);
            }
        } catch (err) {
            console.error(err);
            return;
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(() => reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(handleCreateBlog)}
                className="w-full flex flex-col gap-7 bg-[#0E1330] p-4 rounded-xl border-b border-[#282D45] pb-5 overflow-hidden transition-all duration-700 ease-in-out mt-7"
            >
                {/* Blog Title */}
                <div className="flex-1">
                    <label className="text-white mb-2 block">Blog Title*</label>
                    <input
                        {...register("title", { required: "Blog Title is required" })}
                        placeholder="Enter blog title"
                        type="text"
                        className={`outline-none bg-[#0E1330] border ${errors.name ? "border-red-500" : "border-[#282D45]"} rounded-[10px] py-3 px-5 w-full text-white focus:border-[#0696E7]/50 transition duration-300`}
                    />
                </div>
                {/* Author */}
                <div className="flex-1">
                    <label className="text-white mb-2 block">Author Name*</label>
                    <input
                        {...register("title", { required: "Blog Title is required" })}
                        placeholder="Enter author name"
                        type="text"
                        className={`outline-none bg-[#0E1330] border ${errors.name ? "border-red-500" : "border-[#282D45]"} rounded-[10px] py-3 px-5 w-full text-white focus:border-[#0696E7]/50 transition duration-300`}
                    />
                </div>
                {/* Content */}
                <div className="flex-1">
                    <label className="text-white mb-2 block">Blog Content*</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                    {contentError && (
                        <span className="text-warning-10 text-start">{contentError}</span>
                    )}
                </div>

                {/* Blog Image */}
                <div className="flex-1">
                    <label htmlFor="file" className="text-white mb-2 block">Upload Technology Logos</label>
                    <input
                        id="file"
                        type="file"
                        multiple
                        onChange={(e) => handleImageChange(e)}
                        className="block w-full text-white"
                    />
                </div>

                <div className="size-[100px] rounded-md mt-3">
                    {
                        imageFile &&
                        <img src={imagePreview || ""} alt="blog image preview" className="w-16 h-16 rounded object-cover" />
                    }
                </div>

                <div className="flex justify-end">
                    <Ripples during={1500} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <button
                            type="submit"
                            className="w-full md:w-[190px] bg-gradient-to-br from-blue-500 to-indigo-800 font-Poppins py-3 px-5 text-xs sm:text-base text-white rounded sm:rounded-[7px] flex justify-center items-center"
                        >
                            {
                                isLoading ? "Loading..." : "Submit"
                            }
                        </button>
                    </Ripples>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;