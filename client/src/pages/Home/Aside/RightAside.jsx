import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RightAside = () => {
  return (
    <aside className="sm:flex hidden  w-1/4 h-screen  flex-col items-center justify-center fixed right-0">
      <div className="flex items-center justify-center p-4">
        <span className="text-2xl font-mono">Developer&#39;s Contact</span>
      </div>
      <div className="flex items-center justify-center p-2 gap-4">
        <Link to="https://www.linkedin.com/in/arunkatochdev/">
          <div className="flex items-center justify-center flex-col gap-2  cursor-pointer hover:shadow-lg hover:text-sky-800 text-sky-600">
            <FaLinkedin className="text-2xl" />
            <span>LinkedIn</span>
          </div>
        </Link>
        <Link to="https://github.com/arunkatoch-dev">
          <div className="flex items-center cursor-pointer justify-center flex-col gap-2  hover:shadow-lg hover:text-gray-800">
            <FaGithub className="text-2xl" />
            <span>GitHub</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default RightAside;
