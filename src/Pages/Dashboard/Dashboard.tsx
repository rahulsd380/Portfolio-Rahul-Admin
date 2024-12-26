/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAward, FaClipboardList, FaRegFileAlt, FaUser } from "react-icons/fa";
import { ICONS } from "../../assets";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaBuildingColumns } from "react-icons/fa6";
import { useGetAllAchievementQuery } from "../../Redux/Features/Achievements/achievementsApi";
import { useGetAllEndorsementsQuery } from "../../Redux/Features/Endorsements/endorsementsApi";
import { useGetAllProjectsQuery } from "../../Redux/Features/Projects/projectApi";
import { useGetAllSkillsQuery } from "../../Redux/Features/Skills/skillApi";


const Dashboard = () => {
    const { data: achievements } = useGetAllAchievementQuery({});
    const { data: endorsements } = useGetAllEndorsementsQuery({});
    const { data: projects } = useGetAllProjectsQuery({});
    const { data: skills } = useGetAllSkillsQuery({});

    const personalProjects = projects?.data?.filter(
        (project: any) => project.projectType === "Personal"
    );
    const companyProjects = projects?.data?.filter(
        (project: any) => project.projectType === "Company"
    );
    const statusCardsInfo = [
        {
            title: "Total Projects",
            value: projects?.data?.length || 0,
            icon: <FaRegFileAlt className="text-[#AEB9E1] text-xl" />,
            path: "/projects"
        },
        {
            title: "Personal Projects",
            value: personalProjects?.length || 0,
            icon: <FaUser className="text-[#AEB9E1] text-xl" />,
            path: "/projects"
        },
        {
            title: "Company Projects",
            value: companyProjects?.length || 0,
            icon: <FaBuildingColumns className="text-[#AEB9E1] text-xl" />,
            path: "/projects"
        },
        // {
        //     title : "Total Services",
        //     value : 6,
        //     icon : <RiServiceLine className="text-[#AEB9E1] text-xl" />,
        // },
        {
            title: "Professional Skills",
            value: skills?.data?.length || 0,
            icon: <FaClipboardList className="text-[#AEB9E1] text-xl" />,
            path: "/professional-skills"
        },
        {
            title: "Achievements",
            value: achievements?.data?.length || 0,
            icon: <FaAward className="text-[#AEB9E1] text-xl" />,
            path: "/achievements"
        },
        {
            title: "Total Endorsements",
            value: endorsements?.data?.length || 0,
            icon: <FaAward className="text-[#AEB9E1] text-xl" />,
            path: "/endorsements"
        },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {
                statusCardsInfo.map((info, index) => (
                    <div
                        key={index}
                        className="w-full bg-[#0E1330] border border-[#282D45] rounded-[20px] p-5 relative group overflow-hidden flex flex-col gap-6"
                    >
                        <img className="absolute right-0 top-0" src={ICONS.ellipse1} alt="" />

                        <img className="absolute left-0 bottom-0" src={ICONS.ellipse2} alt="" />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {info?.icon}
                                <p className="text-[#AEB9E1] font-medium">{info?.title}</p>
                            </div>
                            <Link to={info?.path} className="z-20">
                                <LuArrowUpRight className="text-blue-500 text-2xl" />
                            </Link>
                        </div>
                        <h1 className="text-white font-Poppins text-3xl font-semibold">
                            {info?.value}
                        </h1>
                    </div>
                ))
            }
        </div>
    );
};

export default Dashboard;