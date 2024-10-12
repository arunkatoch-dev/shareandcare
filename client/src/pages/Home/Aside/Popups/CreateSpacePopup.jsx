import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleCreateSpaceWindow } from "../../../../slices/userProfileSlice";

const CreateSpacePopup = () => {
  const dispatch = useDispatch();
  const closePopUpWindow = () => {
    dispatch(toggleCreateSpaceWindow(false));
  };
  return (
    <div className="flex w-full h-screen items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0">
      <div className="w-[730px] h-[400px] bg-white rounded-lg flex flex-col p-2">
        <MdClose
          className="text-2xl cursor-pointer text-gray-700"
          onClick={closePopUpWindow}
        />
        <div className="flex h-full items-center justify-center">
          <span className="capitalize text-lg animate-bounce text-red-600 tracking-wider">
            This Feature is currently not available.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateSpacePopup;
