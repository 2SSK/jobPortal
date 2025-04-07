import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContenxt";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData } = useContext(AppContext);

  return (
    <div className="min-h-screen">
      {/* navbar for Recruiter Panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <img
            src={assets.indeed_logo}
            alt=""
            className="max-sm:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome, {companyData.name}</p>
              <div className="relative group">
                <img
                  src={companyData.image}
                  alt=""
                  className="w-8 border border-gray-100 rounded-full"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border border-gray-300 text-sm">
                    <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard */}
      <div className="flex items-start">
        {/* Left Sidebar with options to add job, manage jobs, view applications  */}
        <div className="inline-block min-h-screen border-r-2 border-gray-200">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <Link
              to="/dashboard/add-job"
              img={assets.add_icon}
              title="Add Job"
            />
            <Link
              to="/dashboard/manage-job"
              img={assets.home_icon}
              title="Manage Jobs"
            />
            <Link
              to="/dashboard/view-applications"
              img={assets.person_tick_icon}
              title="View Applications"
            />
          </ul>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Link = ({
  to,
  img,
  title,
}: {
  to: string;
  img: string;
  title: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
          isActive && "bg-blue-100 border-r-4 border-blue-500"
        }`
      }
    >
      <img src={img} alt="" className="min-w-4" />
      <p className="max-sm:hidden">{title}</p>
    </NavLink>
  );
};
