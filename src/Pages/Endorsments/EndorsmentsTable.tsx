import { FiEye } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { toast } from 'sonner';
import { useDeleteEndorsementMutation, useGetAllEndorsementsQuery } from '../../Redux/Features/Endorsements/endorsementsApi';
import ViewEndorsmentModal from './ViewEndorsmentModal';

const EndorsmentsTable = () => {
  const { data } = useGetAllEndorsementsQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const [deleteEndorsement] = useDeleteEndorsementMutation();

  // Delete achievement function
  const handleDeleteEndorsement = (id) => {
    toast.promise(
      deleteEndorsement(id).unwrap(),
      {
        loading: 'Deleting...',
        success: (response) => {
          return response?.message || 'Endorsement deleted successfully!';
        },
        error: (err) => {
          console.error('Error:', err);
        },
      }
    );
  };


    return (
        <div className="border border-[#282D45] p-4 rounded-xl mt-5">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2242] border border-[#282D45] p-3 text-[#aeb9e1]">
              <th className="p-3">No</th>
              <th className="p-3">Image</th>
              <th className="p-3">Author Name</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#0E1330]">
            {data?.data?.map((endorsement, index) => (
              <tr key={endorsement.id} className="border-b border-[#282D45]">
                <td className="p-3 text-[#aeb9e1]">{index + 1}</td>
                {/* Icon */}
                <td className="p-3">
                  <img src={endorsement.authorImg} alt="" className='size-12 rounded-md' />
                </td>
                {/* Name */}
                <td className="p-3 text-[#aeb9e1]">{endorsement.name}</td>
                <td className="p-3 text-[#aeb9e1]">{endorsement.rating}</td>
                {/* Description */}
                <td className="p-3 text-[#aeb9e1]">
                  {endorsement.feedback.length > 50
                    ? endorsement.feedback.slice(0, 50) + "..."
                    : endorsement.feedback}
                </td>
                {/* Action buttons */}
                <td className="p-3 flex gap-3">
                  <FiEye onClick={() => setIsModalOpen(!isModalOpen)} className="text-[#aeb9e1] cursor-pointer" />
                  <MdDelete onClick={() => handleDeleteEndorsement(endorsement._id)} className="text-blue-500 cursor-pointer" />
                </td>
                <ViewEndorsmentModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} {...endorsement} />
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
};

export default EndorsmentsTable;