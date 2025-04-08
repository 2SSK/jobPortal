import { useContext, useState } from "react";
import { Navbar } from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import { Footer } from "../components/Footer";
import { AppContext } from "../context/AppContenxt";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export function Applications() {
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

  const { backendUrl, userData, userApplications, fetchUserData } =
    useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume as Blob);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Resume updated successfully");
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }

    setIsEdit(false);
    setResume(null);
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResume(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  accept="application/pdf"
                  type="file"
                  hidden
                  onChange={handleResumeChange}
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href=""
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
              >
                Resume
              </a>
              <button
                className="text-gray-500 border border-gray-300 rounded-lg px-4  py-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job, index) => (
              <tr key={index}>
                <td className="py-3 px-4 flex items-center gap-2 border-b border-gray-300">
                  <img src={job.companyId.image} alt="" className="w-8 h-8" />
                  {job.companyId.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {job.jobId.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 max-sm:hidden">
                  {job.jobId.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <span
                    className={`${
                      job.status === "Accepted"
                        ? "bg-green-100"
                        : job.status === "Rejected"
                        ? "bg-red-100"
                        : "bg-blue-100"
                    } px-4 py-1.5 rounded`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
