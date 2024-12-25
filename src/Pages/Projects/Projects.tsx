
import { useState } from 'react';
import Ripples from 'react-ripples';
import { Link } from 'react-router-dom';
import { PiBuildingApartment } from "react-icons/pi";
import { FaUser } from 'react-icons/fa';
import { useGetAllProjectsQuery } from '../../Redux/Features/Projects/projectApi';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const { data } = useGetAllProjectsQuery({});
    const [activeTab, setActiveTab] = useState("Personal Projects");
    const buttons = [
        {
            label: "Company Projects",
            icon: <PiBuildingApartment />
        },
        {
            label: "Personal Projects",
            icon: <FaUser className='text-base' />
        },
    ];

    const personalProjects = data?.data?.filter(
        (project) => project.projectType === "Personal"
    );
    const companyProjects = data?.data?.filter(
        (project) => project.projectType === "Company"
    );
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between font-Poppins">
                <h1 className="text-[#aeb9e1] text-2xl font-semibold">
                    All Projects
                </h1>
                <div className='flex items-center gap-5'>
                    {
                        buttons.map((item, index) =>
                            <Ripples key={index} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <button
                                    onClick={() => setActiveTab(item.label)}
                                    className={`${activeTab === item.label ? "bg-gradient-to-br from-blue-500 to-indigo-800" : "bg-[#1C2242]"} border border-[#282D45] p-3 rounded-lg text-[#aeb9e1] text-[22px]`}
                                >
                                    {item.icon}
                                </button>
                            </Ripples>
                        )
                    }
                    <Ripples placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <Link to={"/rahul-sutradhar/admin/dashboard/add-new-project"}
                            className="bg-[#1C2242] border border-[#282D45] p-3 rounded-lg text-[#aeb9e1]">
                            Add New Project
                        </Link>
                    </Ripples>
                </div>
            </div>

            {activeTab === "Personal Projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
                    {personalProjects?.map((project) => (
                        <ProjectCard key={project?._id} project={project} />
                    ))}
                </div>
            )}

            {activeTab === "Company Projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
                    {companyProjects?.map((project) => (
                        <ProjectCard key={project?._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;