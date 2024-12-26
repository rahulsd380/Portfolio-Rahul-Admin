import { useForm, SubmitHandler } from "react-hook-form";
import Ripples from "react-ripples";
import { IMAGES } from "../../assets";

interface FormValues {
  title: string;
  description: string;
  image?: FileList;
}

const UpdateAboutMe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const postedAt = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formData = { ...data, postedAt };
    console.log(formData);
  };

  return (
    <div>
      <form
        className="w-full flex flex-col gap-7 mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter Title*"
          type="text"
          className={`outline-none bg-[#0E1330] border ${errors.title ? "border-red-500" : "border-[#282D45]"
            } rounded-[10px] py-3 px-5 w-full text-white focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
        />

        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Enter Description*"
          className={`outline-none bg-[#0E1330] border ${errors.description ? "border-red-500" : "border-[#282D45]"
            } rounded-[10px] py-3 px-5 w-full text-white h-[150px] focus:border-[0.2px] focus:border-[#0696E7]/50 transition duration-300`}
        ></textarea>

        <div className="flex items-center justify-between">
          <div className="cursor-pointer">
            <label
              htmlFor="image"
              className="flex flex-col gap-1 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-white">
                <img src={IMAGES.aboutMe} width={25} height={25} alt="photo-icon" />
                Upload Profile Image
              </div>
              <p className="text-xs text-[#ACACAC]">
                Please upload your profile picture
              </p>
            </label>
            <input
              {...register("image")}
              type="file"
              id="image"
              className="hidden"
            />
          </div>

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
  );
};

export default UpdateAboutMe;
