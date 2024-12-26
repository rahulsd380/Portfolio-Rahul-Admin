import Ripples from "react-ripples";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddNewSkillMutation, useDeleteSkillMutation, useGetAllSkillsQuery } from "../../Redux/Features/Skills/skillApi";
import { ICONS } from "../../assets";

// Define types for skill data
interface Skill {
  _id: string;
  skillName: string;
  icon: string; // Assuming the icon is a URL string
}

// Define types for the form data
interface FormData {
  skillName: string;
  image?: FileList;
}

const ProfessionalSkills = () => {
  const { data } = useGetAllSkillsQuery({});
  const [addNewSkill] = useAddNewSkillMutation({});
  const [deleteSkill] = useDeleteSkillMutation({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    const skillName = {
      skillName: data.skillName,
    };
    formData.append("data", JSON.stringify(skillName));
    if (uploadedImage) {
      formData.append("file", uploadedImage);
    }

    toast.promise(
      addNewSkill(formData).unwrap(),
      {
        loading: 'Adding skill...',
        success: (response) => {
          return response?.message || 'Skill added successfully!';
        },
        error: (err) => {
          console.error('Error:', err);
          return 'Failed to add skill...';
        },
      }
    );
  };

  const handleDeleteSkill = (id: string) => {
    toast.promise(
      deleteSkill(id).unwrap(),
      {
        loading: 'Deleting skill...',
        success: (response) => {
          return response?.message || 'Skill deleted successfully!';
        },
        error: (err) => {
          console.error('Error:', err);
          return 'Failed to delete skill...';
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  return (
    <div className="font-Poppins">
      {/* Header */}
      <div className="flex items-center justify-between font-Poppins">
        <h1 className="text-[#aeb9e1] text-2xl font-semibold">
          Professional Skills
        </h1>
        <Ripples placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <button
            onClick={toggleFormVisibility}
            className="bg-[#1C2242] border border-[#282D45] p-3 rounded-lg text-[#aeb9e1]"
          >
            Add New Skill
          </button>
        </Ripples>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full flex flex-col gap-7 bg-[#0E1330] p-4 rounded-xl border-b border-[#282D45] pb-5 overflow-hidden 
          ${isFormVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} 
          transition-all duration-700 ease-in-out ${isFormVisible && "mt-7"}`}
      >
        <input
          {...register("skillName", { required: "Skill name is required" })}
          placeholder="Enter skill name*"
          type="text"
          className={`outline-none bg-[#0E1330] border ${
            errors.skillName ? "border-red-500" : "border-[#282D45]"
          } rounded-[10px] py-3 px-5 w-full text-white focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
        />

        <div className="flex items-center justify-between">
          {/* Image upload and preview */}
          {uploadedImage ? (
            <div className="relative size-20">
              <img
                src={imagePreview as string}
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
                  Upload Service Icon
                </div>
                <p className="text-xs text-[#ACACAC]">
                  Please upload service Icon
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

          <Ripples during={1500} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <button
              type="submit"
              className="w-full md:w-[190px] bg-gradient-to-br from-blue-500 to-indigo-800 font-Poppins py-3 px-5 text-xs sm:text-base text-white rounded sm:rounded-[7px] flex justify-center items-center"
            >
              Submit
            </button>
          </Ripples>
        </div>
      </form>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
          isFormVisible && "mt-8"
        }`}
      >
        {data?.data?.map((skill: Skill, index: number) => (
          <div
            key={index}
            className="w-full md:size-[230px] bg-[#0E1330] border border-[#282D45] rounded-[20px] flex flex-col justify-center items-center gap-7 relative group overflow-hidden"
          >
            <img className="absolute right-0 top-0" src={ICONS.ellipse1} alt="" />
            <img className="absolute left-0 bottom-0" src={ICONS.ellipse2} alt="" />
            <img src={skill?.icon} alt="" className="size-28" />
            <h1 className="text-white font-Poppins text-2xl font-semibold text-center">
              {skill.skillName}
            </h1>

            <div onClick={() => handleDeleteSkill(skill?._id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <MdDelete className="text-[#aeb9e1] cursor-pointer" size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSkills;
