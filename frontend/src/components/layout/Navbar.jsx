import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  RiAccountCircleLine,
  RiSunFill,
  RiMoonClearFill,
  RiShoppingBag2Line,
} from 'react-icons/ri';

import logo from '../../assets/deti_store_logo.svg';

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');

    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  return (
    <div className="navbar bg-secondary w-full flex justify-between items-center p-2">
      <Link
        to="/"
        className="max-w-[5%]"
      >
        <img src={logo}></img>
      </Link>
      <div className='join'>
        <input
          type="textbox"
          className='input input-bordered input-primary input-sm join-item'
          placeholder="Search"
        />
        <button
          className="btn btn-primary btn-sm join-item"
          onClick={() => {}}
        >
          Search
        </button>
      </div>

      <div className="flex">
        <label className="swap swap-rotate m-1">
          <input
            id="search-box"
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'light' ? false : true}
          />
          <RiMoonClearFill className="swap-on" />
          <RiSunFill className="swap-off" />
        </label>

        <button className=" btn btn-circle m-1">
          <RiAccountCircleLine className="text-xl" />
        </button>
        <button className="btn btn-circle m-1">
          <RiShoppingBag2Line className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
