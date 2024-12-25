import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Ripples from 'react-ripples';
import { useAddNewAchievementMutation, useGetAllAchievementQuery } from "../../Redux/Features/Achievements/achievementsApi";
import AchievementCard from "./AchievementCard";
import { ICONS } from "../../assets";


const Achievements = () => {
    const [addNewAchievement] = useAddNewAchievementMutation();
    const {data} = useGetAllAchievementQuery({});
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const toggleFormVisibility = () => {
        setIsFormVisible((prev) => !prev);
    };

    const handleAddNewAchievement = (data) => {
        const formData = new FormData();
        const achievementData = {
            name: data.name,
            organization: data.organization,
            completedAt: data.completedAt
        }
        formData.append("data", JSON.stringify(achievementData));
        formData.append("file", uploadedImage);

        toast.promise(
            addNewAchievement(formData).unwrap(),
            {
                loading: 'Loading...',
                success: (response) => {
                    return response?.message || 'Certificate added successfully!';
                },
                error: (err) => {
                    console.error('Error:', err);
                    return 'Failed to add Certificate...';
                },
            }
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(() => [reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setUploadedImage(null);
    };
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between font-Poppins">
                <h1 className="text-[#aeb9e1] text-2xl font-semibold">
                    Achievements
                </h1>
                <Ripples placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <button
                        onClick={toggleFormVisibility}
                        className="bg-[#1C2242] border border-[#282D45] p-3 rounded-lg text-[#aeb9e1]"
                    >
                        Add New Achievements
                    </button>
                </Ripples>
            </div>


            <form
                onSubmit={handleSubmit(handleAddNewAchievement)}
                className={`w-full flex flex-col gap-7 bg-[#0E1330] p-4 rounded-xl border-b border-[#282D45] pb-5 overflow-hidden 
          ${isFormVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} 
          transition-all duration-700 ease-in-out ${isFormVisible && "mt-7"}`}
            >
                <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter achievement or certificate name*"
                    type="text"
                    className={`outline-none bg-[#0E1330] border ${errors.name ? "border-red-500" : "border-[#282D45]"
                        } rounded-[10px] py-3 px-5 w-full text-white focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
                />

                <div className="flex gap-4 items-center">
                    <input
                        {...register("organization", { required: "Organization name is required" })}
                        placeholder="Enter organization name*"
                        type="text"
                        className={`outline-none bg-[#0E1330] border ${errors.organization ? "border-red-500" : "border-[#282D45]"
                            } rounded-[10px] py-3 px-5 w-full text-white focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
                    />
                    <input
                        {...register("completedAt", { required: "Completed date is required" })}
                        placeholder="Enter completed date*"
                        type="text"
                        className={`outline-none bg-[#0E1330] border ${errors.completedAt ? "border-red-500" : "border-[#282D45]"
                            } rounded-[10px] py-3 px-5 w-full text-white focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
                    />
                </div>

                <div className="flex items-center justify-between">
                    {/* Image upload and preview */}
                    {uploadedImage ? (
                        <div className="relative size-20">
                            <img
                                src={imagePreview}
                                alt="Service Icon"
                                className="w-full h-full rounded-lg object-cover"
                            />
                            <button
                                onClick={handleImageRemove}
                                type="button"
                                className="absolute top-1 right-1 bg-red-600 p-1 rounded-full"
                            >
                                <img src={ICONS.cross} alt="Remove Icon" className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="cursor-pointer">
                            <label
                                htmlFor="image"
                                className="flex flex-col gap-1 cursor-pointer"
                            >
                                <div className="flex items-center gap-3 text-white">
                                    <img src={ICONS.photo} width={25} height={25} alt="photo-icon" />
                                    Upload Certificate Image
                                </div>
                                <p className="text-xs text-[#ACACAC]">
                                    Please upload certificate or course image
                                </p>
                            </label>
                            <input
                                {...register("image")}
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    )}

                    <Ripples during={1500}>
                        <button
                            type="submit"
                            className="w-full md:w-[190px] bg-gradient-to-br from-blue-500 to-indigo-800 font-Poppins py-3 px-5 text-xs sm:text-base text-white rounded sm:rounded-[7px] flex justify-center items-center"
                        >
                            Submit
                        </button>
                    </Ripples>
                </div>
            </form>


            {/* All achievents cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-11 mt-4">
      {data?.data?.map((achievement) => (
        <AchievementCard key={achievement.title} {...achievement} isDeleteBtnNeeded={true} />
      ))}
    </div>
        </div>
    );
};

export default Achievements;