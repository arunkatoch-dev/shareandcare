import { AiOutlineFork } from "react-icons/ai";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Logo = ({ size }) => {
  return (
    <div className="w-full flex p-5 gap-2">
      <AiOutlineFork className="text-xl text-[#C6553B] font-bold" />
      <Link to="/" className={`text-[#C6553B] ${size} uppercase font-bold`}>
        Share & Care
      </Link>
    </div>
  );
};

export default Logo;
