/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteEndorsementMutation,
  useGetAllEndorsementsQuery,
} from "../../Redux/Features/Endorsements/endorsementsApi";
import ViewEndorsmentModal from "./ViewEndorsmentModal";

// Define the type for an endorsement object
interface Endorsement {
  id: string;
  _id: string;
  authorImg: string;
  name: string;
  rating: number;
  feedback: string;
}

const EndorsmentsTable = () => {
  const { data } = useGetAllEndorsementsQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);

  const [deleteEndorsement] = useDeleteEndorsementMutation();

  // Delete endorsement function
  const handleDeleteEndorsement = (id: string) => {
    toast.promise(
      deleteEndorsement(id).unwrap(),
      {
        loading: "Deleting...",
        success: (response) => response?.message || "Endorsement deleted successfully!",
        error: (err) => {
          console.error("Error:", err);
          return err?.data?.message || "Failed to delete endorsement.";
        },
      }
    );
  };

  // Open modal and set selected endorsement
  const handleViewEndorsement = (endorsement: Endorsement) => {
    setSelectedEndorsement(endorsement);
    setIsModalOpen(true);
  };

  return (
    <div className="border border-[#282D45] p-4 rounded-xl mt-5">
      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-[#1C2242] border border-[#282D45] text-[#aeb9e1]">
            <th className="p-3">No</th>
            <th className="p-3">Image</th>
            <th className="p-3">Author Name</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#0E1330]">
          {data?.data?.map((endorsement:any, index:number) => (
            <tr key={endorsement.id} className="border-b border-[#282D45]">
              <td className="p-3 text-[#aeb9e1]">{index + 1}</td>
              {/* Author Image */}
              <td className="p-3">
                <img
                  src={endorsement.authorImg}
                  alt={`${endorsement.name}'s avatar`}
                  className="w-12 h-12 rounded-md object-cover"
                />
              </td>
              {/* Author Name */}
              <td className="p-3 text-[#aeb9e1]">{endorsement.name}</td>
              {/* Rating */}
              <td className="p-3 text-[#aeb9e1]">{endorsement.rating}</td>
              {/* Feedback */}
              <td className="p-3 text-[#aeb9e1]">
                {endorsement.feedback.length > 50
                  ? endorsement.feedback.slice(0, 50) + "..."
                  : endorsement.feedback}
              </td>
              {/* Actions */}
              <td className="p-3 flex gap-3">
                <FiEye
                  onClick={() => handleViewEndorsement(endorsement)}
                  className="text-[#aeb9e1] cursor-pointer"
                  title="View Endorsement"
                />
                <MdDelete
                  onClick={() => handleDeleteEndorsement(endorsement._id)}
                  className="text-red-500 cursor-pointer"
                  title="Delete Endorsement"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Endorsement Modal */}
      {isModalOpen && selectedEndorsement && (
        <ViewEndorsmentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          {...selectedEndorsement}
        />
      )}
    </div>
  );
};

export default EndorsmentsTable;
