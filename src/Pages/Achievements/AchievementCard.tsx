/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useDeleteAchievementMutation } from "../../Redux/Features/Achievements/achievementsApi";

interface AchievementCardProps {
  _id?: string;
  image?: string;
  name?: string;
  organization?: string;
  completedAt?: string;
  isDeleteBtnNeeded: boolean;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  _id,
  image,
  name,
  organization,
  completedAt,
  isDeleteBtnNeeded,
}) => {
  const [deleteAchievement] = useDeleteAchievementMutation();

  // Delete achievement function
  const handleDeleteAchievement = (id: string) => {
    toast.promise(
      deleteAchievement(id).unwrap(),
      {
        loading: "Deleting...",
        success: (response) => response?.message || "Achievement deleted successfully!",
        error: (err: any) => {
          console.error("Error:", err);
          return "Failed to delete the achievement.";
        },
      }
    );
  };

  return (
    <div className="h-fit lg:h-[550px] bg-[#0E1330] border border-[#282D45] rounded-3xl p-4 relative group overflow-hidden">
      <img src={image} alt={name} className="w-full h-[300px] lg:h-[389px] rounded-xl" />
      <h1 className="text-white font-Poppins text-xl font-medium leading-[30px] capitalize mt-5">
        {name}
      </h1>
      <p className="text-white font-Poppins text-sm leading-[30px] capitalize mt-[10px]">
        {organization} - {completedAt}
      </p>
      {isDeleteBtnNeeded && (
        <div
          onClick={() => handleDeleteAchievement(_id!)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-800 border border-[#282D45] p-2 rounded-lg text-[#aeb9e1]"
        >
          <MdDelete className="text-[#aeb9e1] cursor-pointer" size={24} />
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
