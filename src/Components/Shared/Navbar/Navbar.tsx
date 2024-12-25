
import { BiLogOut } from 'react-icons/bi';
import Ripples from 'react-ripples';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="text-white py-5 border-b border-[#282D45] pb-4 flex items-center justify-between">
      <div>
        <h1 className="text-white text-xl font-Sora font-medium">
          Welcome back, <span className="bg-gradient-to-br from-blue-600 to-indigo-300 bg-clip-text text-transparent font-bold">Rahul Sutradhar{" "}</span>
        </h1>
        <p className="text-[#939393] font-Poppins text-[12px] font-normal">
          Manage everything from here
        </p>
      </div>

      <Ripples placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Link to={"/"} className="border border-blue-700 bg-gradient-to-br from-blue-500 to-indigo-800 transition duration-300 py-3 px-5 font-Poppins text-white rounded-lg flex items-center gap-2">
          <BiLogOut className="text-white text-xl" />
          Logout
        </Link>
      </Ripples>
    </div>
  );
};

export default Navbar;