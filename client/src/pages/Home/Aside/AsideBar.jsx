import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleCreateSpaceWindow } from "../../../slices/userProfileSlice";
const AsideBar = () => {
  const dispatch = useDispatch();
  const openCreateSpaceWindow = () => {
    dispatch(toggleCreateSpaceWindow(true));
  };
  return (
    <aside className="sm:flex hidden w-1/4 h-screen flex-col fixed shadow-md">
      <div
        className="p-2 flex items-center justify-center border gap-3 bg-gray-100 cursor-pointer hover:bg-gray-200"
        onClick={openCreateSpaceWindow}
      >
        <FaPlus className="text-base text-gray-800" />
        <span className="text-base text-gray-800">Create Space</span>
      </div>
      <div className="flex items-center justify-center h-full">
        <span className="animate-bounce">No Space found</span>
      </div>
    </aside>
  );
};

export default AsideBar;
