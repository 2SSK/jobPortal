import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Job } from "../context/AppContenxt";

export const JobCard = ({ job }: { job: Job }) => {
  const naviagate = useNavigate();

  return (
    <div className="border border-gray-100 p-6 shadow rounded">
      <div className="flex justify-between items-center">
        <img src={assets.company_icon} alt="" className="h-8" />
      </div>
      <h4 className="font-medium text-xl mt-2">{job.title}</h4>
      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
        className="text-gray-500 mt-4 text-sm"
      ></p>
      <div className="mt-4 flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            naviagate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Apply Now
        </button>
        <button
          className="text-gray-500 border border-gray-500 px-4 py-2 rounded"
          onClick={() => {
            naviagate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};
