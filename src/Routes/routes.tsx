import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AboutMe from "../Pages/AboutMe/AboutMe";
import MyServices from "../Pages/MyServices/MyServices";
import Endorsments from "../Pages/Endorsments/Endorsments";
import ProfessionalSkills from "../Pages/ProfessionalSkills/ProfessionalSkills";
import Projects from "../Pages/Projects/Projects";
import Achievements from "../Pages/Achievements/Achievements";
import AddNewProject from "../Pages/Projects/AddNewProject";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/about-me",
        element: <AboutMe />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/add-new-project",
        element: <AddNewProject />,
      },
      {
        path: "/my-services",
        element: <MyServices />,
      },
      {
        path: "/endorsements",
        element: <Endorsments />,
      },
      {
        path: "/professional-skills",
        element: <ProfessionalSkills />,
      },
      {
        path: "/achievements",
        element: <Achievements />,
      },
    ],
  }
]);
