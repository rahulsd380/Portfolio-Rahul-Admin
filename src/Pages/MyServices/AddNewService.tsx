import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Ripples from "react-ripples";
import { toast } from "sonner";
import { useAddNewServiceMutation } from "../../Redux/Features/MyServices/myServicesApi";
import { ICONS } from "../../assets";

// Define the types for the form data
interface ServiceFormData {
  name: string;
  description: string;
  image?: FileList;
}

interface AddNewServiceProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const AddNewService = ({ isModalOpen, setIsModalOpen }: AddNewServiceProps) => {
  const [addNewService] = useAddNewServiceMutation();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>(); // Use the form data type here

  // Define the function to handle form submission
  const handleAddNewService: SubmitHandler<ServiceFormData> = (data) => {
    const formData = new FormData();
    const serviceData = {
      name: data.name,
      description: data.description,
    };
    formData.append("data", JSON.stringify(serviceData));
    if (uploadedImage) formData.append("file", uploadedImage);

    toast.promise(
      addNewService(formData).unwrap(),
      {
        loading: 'Loading...',
        success: (response) => {
          reset();
          setIsModalOpen(false);
          setUploadedImage(null);
          return response?.message || 'Service added successfully!';
        },
        error: (err) => {
          console.error('Error:', err);
          return 'Failed to add Service...';
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    setImagePreview(null);
  };

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className={`fixed z-[100] flex items-center justify-center ${isModalOpen ? "opacity-1 visible" : "invisible opacity-0"} inset-0 h-full w-full mx-auto backdrop-blur-sm duration-100 `}
    >
      <div
        onClick={(e_) => e_.stopPropagation()}
        style={{ overflowY: "auto", scrollbarWidth: "thin" }}
        className={`absolute w-[600px] h-[460px] bg-[#0E1330] p-5 border border-[#282D45] rounded-xl text-white drop-shadow-2xl ${isModalOpen ? "opacity-1 translate-y-0 duration-300" : "-translate-y-20 opacity-0 duration-150"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#282D45] pb-3">
          <h1 className="text-white font-Poppins text-xl leading-[30px] capitalize">
            Add New <span className="text-blue-500">Service</span>
          </h1>
          <img
            onClick={() => setIsModalOpen(false)}
            src={ICONS.cross}
            alt="cross-icon"
            className="size-8 cursor-pointer"
          />
        </div>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-7 mt-7"
          onSubmit={handleSubmit(handleAddNewService)} // Handle form submission
        >
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter Service Name*"
            type="text"
            className={`outline-none bg-[#0E1330] border ${errors.name ? "border-red-500" : "border-[#282D45]"} rounded-[10px] py-3 px-5 w-full text-white focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
          />

          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter Description*"
            className={`outline-none bg-[#0E1330] border ${errors.description ? "border-red-500" : "border-[#282D45]"} rounded-[10px] py-3 px-5 w-full text-white h-[150px] focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
          ></textarea>

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
                  <p className="text-xs text-[#ACACAC]">Please upload Service Icon</p>
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
      </div>
    </div>
  );
};

export default AddNewService;
