import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContenxt";
import axios from "axios";
import { toast } from "react-toastify";

interface JobData {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  level: string;
  salary: number;
  date: number;
  visible: boolean;
  applicants: number;
  companyId: string;
}

export const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<JobData[]>([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Function to fetch company Job Applications data
  const fetchCompanyJobs = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [companyToken, backendUrl]);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken, fetchCompanyJobs]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
                #
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Job Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">
                Applicants
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Visible
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <input type="checkbox" className="scale-125 ml-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="bg-black text-white py-2 px-4 rounded"
          onClick={() => navigate("/dashboard/add-job")}
        >
          Add new job
        </button>
      </div>
    </div>
  );
};
