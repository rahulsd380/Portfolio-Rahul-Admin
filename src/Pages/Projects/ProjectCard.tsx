
import { Link } from "react-router-dom";
import Ripples from "react-ripples";
import { useEffect, useRef, useState } from "react";
import { ICONS } from "../../assets";

const ProjectCard = ({ project }) => {
  const { _id, name, tagline, images, sourceCode, liveLink, technologyNames, projectType } = project;
  console.log(technologyNames);


  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropDownRef = useRef(null);

  const items = [
    { label: "View Details", path: `/project-details/${_id}`, icon: details },
    { label: "See Live Link", path: liveLink, icon: link },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpenDropdowns({});
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="flex flex-col gap-6"
      >
        <h1>
          <span className="text-white font-Montserrat text-xl font-semibold">
            {name} -{" "}
          </span>
          <span className="text-gray-300 font-Poppins text-base font-normal">
            {tagline}
          </span>
        </h1>

        <img src={images[0]} alt="" className="rounded-xl" />

        <h1>
          <span className="text-white font-Montserrat text-base font-semibold">
            Technology Used :{" "}
          </span>
          <span className="text-gray-300 font-Poppins text-base font-normal capitalize">
            {technologyNames.length > 0 ? technologyNames.join(", ") : "No technologies listed"}
          </span>

        </h1>

        <div className="w-full h-[1px] bg-gradient-to-br from-blue-500 to-indigo-800"></div>

        <div className="flex items-center justify-between">
          {
            projectType === "Personal" &&
            <Link
              to={`/${sourceCode}`}
              className="flex items-center gap-2 transition duration-300 transform hover:-translate-y-0.5"
            >
              <img className="w-10" src={ICONS.github} alt="" />
              <p className="text-white font-Montserrat text-base font-semibold">
                Source Code
              </p>
            </Link>
          }

          <div ref={dropDownRef} className="relative">
            <Ripples during={1500} onClick={() => toggleDropdown(_id)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <button className="bg-gradient-to-br from-blue-500 to-indigo-800 font-Poppins py-3 px-5 text-xs sm:text-base text-white rounded sm:rounded-[7px] flex items-center gap-2">
                View Project
                <img src={ICONS.view} alt="" />
              </button>
            </Ripples>

            <ul
              className={`${openDropdowns[_id] ? "visible" : "invisible"
                } absolute z-50 w-full space-y-1 flex flex-col mt-1`}
            >
              {items.map((item, idx) => (
                <Link
                  to={item.path}
                  key={idx}
                  className={`bg-[#0E1330] border border-[#282D45] rounded-md text-white p-2 flex items-center gap-3 ${openDropdowns[_id]
                    ? "opacity-100 duration-500"
                    : "opacity-0 duration-150"
                    } hover:bg-gradient-to-br from-blue-500 to-indigo-800 w-full`}
                  style={{
                    transform: `translateY(${openDropdowns[_id] ? 0 : (idx + 1) * 10
                      }px)`,
                  }}
                >
                  <img src={item.icon} alt="" className="size-5" />
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
