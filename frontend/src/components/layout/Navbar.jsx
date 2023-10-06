import { Input } from 'postcss';
import { Link } from 'react-router-dom';

import { RiAccountCircleLine } from 'react-icons/ri';
import logo from '../../assets/deti_store_logo.svg';

const Navbar = () => {
  return (
    <div className=" bg-secondary w-full flex justify-between items-center p-2 ">
      <Link
        to="/"
        className="max-w-[5%]"
      >
        <img src={logo}></img>
      </Link>
      <input
        type="textbox"
        className=" input input-bordered input-primary input-sm"
        placeholder='Search'
      />
      <RiAccountCircleLine className="text-xl m-2" />
    </div>
  );
};

export default Navbar;
