import { Link } from "react-router-dom";
import Ripples from "react-ripples";
import { useEffect, useRef, useState } from "react";
import { ICONS } from "../../assets";

// Define the Project type
type Project = {
  _id: string;
  name: string;
  tagline: string;
  images: string[]; // Array of image URLs
  sourceCode?: string; // Optional field
  liveLink: string;
  technologyNames: string[];
  projectType: "Personal" | "Professional"; // Enum-like type for projectType
};

// Define the Props type
type ProjectCardProps = {
  project: Project;
};

// Dropdown items type
type DropdownItem = {
  label: string;
  path: string;
  icon: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { _id, name, tagline, images, sourceCode, liveLink, technologyNames, projectType } = project;

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const dropDownRef = useRef<HTMLDivElement>(null);

  const items: DropdownItem[] = [
    { label: "View Details", path: `/project-details/${_id}`, icon: ICONS.details },
    { label: "See Live Link", path: liveLink, icon: ICONS.link },
  ];

  const toggleDropdown = (index: string) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setOpenDropdowns({});
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div>
      <div data-aos="fade-up" data-aos-duration="2000" className="flex flex-col gap-6">
        <h1>
          <span className="text-white font-Montserrat text-xl font-semibold">
            {name} -{" "}
          </span>
          <span className="text-gray-300 font-Poppins text-base font-normal">
            {tagline}
          </span>
        </h1>

        <img src={images[0]} alt="" className="rounded-xl h-[350px] object-cover" />

        <h1>
          <span className="text-white font-Montserrat text-base font-semibold">
            Technology Used:{" "}
          </span>
          <span className="text-gray-300 font-Poppins text-base font-normal capitalize">
            {technologyNames.length > 0 ? technologyNames.join(", ") : "No technologies listed"}
          </span>
        </h1>

        <div className="w-full h-[1px] bg-gradient-to-br from-blue-500 to-indigo-800"></div>

        <div className="flex items-center justify-between">
          {projectType === "Personal" && sourceCode && (
            <Link
              to={`/${sourceCode}`}
              className="flex items-center gap-2 transition duration-300 transform hover:-translate-y-0.5"
            >
              <img className="w-10" src={ICONS.github} alt="GitHub Icon" />
              <p className="text-white font-Montserrat text-base font-semibold">
                Source Code
              </p>
            </Link>
          )}

          <div ref={dropDownRef} className="relative">
            <Ripples
              during={1500}
              onClick={() => toggleDropdown(_id)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <button className="bg-gradient-to-br from-blue-500 to-indigo-800 font-Poppins py-3 px-5 text-xs sm:text-base text-white rounded sm:rounded-[7px] flex items-center gap-2">
                View Project
                <img src={ICONS.view} alt="View Icon" />
              </button>
            </Ripples>

            <ul
              className={`${openDropdowns[_id] ? "visible" : "invisible"} absolute z-50 w-full space-y-1 flex flex-col mt-1`}
            >
              {items.map((item, idx) => (
                <Link
                  to={item.path}
                  key={idx}
                  className={`bg-[#0E1330] border border-[#282D45] rounded-md text-white p-2 flex items-center gap-3 ${
                    openDropdowns[_id] ? "opacity-100 duration-500" : "opacity-0 duration-150"
                  } hover:bg-gradient-to-br from-blue-500 to-indigo-800 w-full`}
                  style={{
                    transform: `translateY(${openDropdowns[_id] ? 0 : (idx + 1) * 10}px)`,
                  }}
                >
                  <img src={item.icon} alt={`${item.label} Icon`} className="size-5" />
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
