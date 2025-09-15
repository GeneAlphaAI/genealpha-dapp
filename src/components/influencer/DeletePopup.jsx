import React, { useState } from "react";
import CustomButton from "../buttons/CustomButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { DeleteAgent } from "../../services/apiFunctions";
import { useAccount } from "wagmi";
import showToast from "../../utilities/showToast";
import { useDispatch } from "react-redux";
import { setDataUpdated } from "../../store/slices/influencer";
const DeletePopup = ({ onClose, agentName }) => {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await DeleteAgent(address, agentName);
      console.log("HERE", loading);
      if (response?.status === 200) {
        showToast(
          "success",
          "Agent Deleted Successfully!",
          "/assets/Toast/Success.svg"
        );
        setLoading(false);
        dispatch(setDataUpdated(true));
        onClose();
      } else if (response?.status === 400) {
        showToast("error", "Agent Already Deleted!", "/assets/Toast/Error.svg");
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-black/50 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div className="bg-main-background border border-white/10 rounded-[10px] px-6 py-6 sm:px-10 sm:py-8 w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-xl relative flex flex-col">
        <div className={`flex w-full items-center justify-between pb-2`}>
          <div className="flex items-center gap-3">
            <div className="bg-[#f9f9f9] rounded-full p-1.5">
              <img
                src={"/assets/general/Delete.svg"}
                alt="Logo"
                className="size-[20px] md:size-[24px]"
              />
            </div>
            <h3 className="text-md font-medium text-primary-text">
              Delete Agent
            </h3>
          </div>
        </div>
        <div>
          <p className="pb-4 text-xs text-secondary-text">
            Are you sure you want to delete this agent? Once removed, it will no
            longer track the selected influencers or provide insights based on
            their activity.
          </p>
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-auto">
          <SecondaryButton onClick={onClose} className="w-[8rem] h-[2.2rem] ">
            Cancel
          </SecondaryButton>
          <CustomButton
            loading={loading}
            disabled={loading}
            onClick={handleDelete}
            className="w-[8rem] h-[2.2rem]"
            color="bg-red hover:bg-red/90"
          >
            Delete
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
