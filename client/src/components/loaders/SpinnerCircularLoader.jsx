import { ImSpinner3 } from "react-icons/im";

const SpinnerCircularLoader = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <ImSpinner3 className="animate-spin text-3xl" />
    </div>
  );
};

export default SpinnerCircularLoader;
