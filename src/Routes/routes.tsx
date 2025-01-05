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
import AuthLayout from "../Layout/AuthLayout";
import Verify from "../Pages/Verify/Verify";
import Blogs from "../Pages/Blogs/Blogs";
import CreateBlog from "../Pages/Blogs/CreateBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Verify />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Layout />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "my-dashboard",
        element: <Dashboard />,
      },
      {
        path: "about-me",
        element: <AboutMe />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "add-new-project",
        element: <AddNewProject />,
      },
      {
        path: "my-services",
        element: <MyServices />,
      },
      {
        path: "endorsements",
        element: <Endorsments />,
      },
      {
        path: "professional-skills",
        element: <ProfessionalSkills />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
    ],
  },
]);
