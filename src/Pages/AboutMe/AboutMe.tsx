import AboutMePreview from "./AboutMePreview";
import UpdateAboutMe from "./UpdateAboutMe";


const AboutMe = () => {
  return (
    <div>
      <h1 className="text-[#aeb9e1] text-2xl font-semibold font-Poppins">
        About Me
      </h1>
      <UpdateAboutMe />
      <AboutMePreview />
    </div>
  );
};

export default AboutMe;
