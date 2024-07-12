import siteLogo from "@/assets/images/site-logo.png";
import { Link } from "@tanstack/react-router";

const SiteLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-1">
      <img className="size-10" src={siteLogo} alt="site logo" />
      <span className="text-lg font-bold">Quiz</span>
    </Link>
  );
};

export default SiteLogo;
