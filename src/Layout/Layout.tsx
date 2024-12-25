import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Sidebar from "../Components/Shared/Sidebar/Sidebar";


const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex flex-col gap-8 px-12">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;