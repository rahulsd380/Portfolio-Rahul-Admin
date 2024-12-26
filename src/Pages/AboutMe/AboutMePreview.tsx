import { MdOutlinePreview } from "react-icons/md";
import Ripples from "react-ripples";
import { ICONS, IMAGES } from "../../assets";

const AboutMePreview = () => {
  return (
    <div className="border border-[#282D45] p-4 rounded-xl mt-10">
        <p className="text-[#aeb9e1] font-Poppins text-[12px] md:text-[18px] font-normal mb-5 flex items-center gap-3">
        <MdOutlinePreview className="text-[#aeb9e1]" />
          Preview
        </p>
      <div className="relative flex flex-col lg:flex-row items-center gap-10">
        <div className="hidden lg:block w-[400px] h-[400px] rounded-full bg-[#0696E7]/50 bg-opacity-30 blur-[100px] absolute top-[50px] left-0"></div>

        <img
          className="z-10 w-full h-[400px]"
          src={IMAGES.aboutMe}
          alt=""
        />

        <div>
          <p className="text-[#0294E8] font-Poppins text-lg font-semibold">
            About me
          </p>
          <h1 className="text-white font-Montserrat text-3xl font-semibold mt-1">
            I’ am Rahul, unique work provider client{" "}
          </h1>

          <p className="text-[#939393] font-Poppins text-sm font-normal mt-4 mb-8">
            As a MERN full stack developer, I thrive on building dynamic web
            applications, leveraging my expertise in JavaScript, React, Node.js,
            and MongoDB. With a strong foundation in software engineering
            principles, I prioritize crafting clean, scalable code to deliver
            exceptional user experiences. I am committed to staying abreast of
            industry trends and technologies, continuously refining my skills to
            deliver innovative solutions.
          </p>

          <div className="flex items-center relative">
            <Ripples during={1500} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <a
                href="/src/assets/Resume_of_Rahul Sutradhar.pdf"
                download
                className="bg-gradient-to-br from-blue-500 to-indigo-800 font-Poppins py-3 px-[4px] sm:px-3 md:px-8 text-sm text-white rounded sm:rounded-[10px]"
              >
                Download Resume
              </a>
            </Ripples>

            <img
              className="absolute mt-0 lg:mt-3 left-[110px] sm:left-[160px] mobileLg:left-[180px] md:left-[200px] -top-[70px] md:-top-[110px] w-36 md:w-[230px]"
              src={ICONS.leftArrow}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePreview;
