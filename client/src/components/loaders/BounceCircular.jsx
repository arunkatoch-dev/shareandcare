import { FaArrowDownLong } from "react-icons/fa6";

const BounceCircular = () => {
  const scrollWindow = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };
  const scrollScreen = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full h-full flex items-center justify-center py-6">
      <div className="animate-bounce p-4 bg-gray-50 border border-gray-700 rounded-full flex items-center justify-center" onClick={scrollWindow} onTouchStart={scrollScreen}>
        <FaArrowDownLong
          className="text-xl text-gray-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BounceCircular;
