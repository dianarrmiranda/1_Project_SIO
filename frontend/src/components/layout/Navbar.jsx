import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()

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

  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user -> ', user);
  
  return (
    <div className="navbar bg-secondary w-full flex justify-between items-center p-2 top-0">
      <Link
        to="/"
        className="max-w-[5%]"
      >
        <img src={logo}></img>
      </Link>
      <form className='join'>
        <input
          type="textbox"
          className='input input-bordered input-primary input-sm join-item'
          placeholder="Search"
          name='search'
        />
        <button
          className="btn btn-primary btn-sm join-item"
          type='submit  '
          onClick={() => {}}
        >
          Search
        </button>
      </form>

      <div className="flex">
        <label className="swap swap-rotate m-2 p-2 ">
          <input
            id="search-box"
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'light' ? false : true}
          />
          <RiMoonClearFill className="swap-on" />
          <RiSunFill className="swap-off" />
        </label>

        <button className="flex items-center m-2 p-2" >
          {user ? <RiShoppingBag2Line className="text-xl" /> : ""}
        </button>
        
        {true && <button className="flex items-center m-2 p-2" onClick={user ? () => navigate(`/user/${user[0]?.id}`) : () => navigate('/login')}>
          <p className="mr-2">{user ? `Hello ${user[0]?.name}!  ` : ""}  </p>
          <RiAccountCircleLine className="text-xl" />
        </button>}
      </div>
    </div>
  );
};

export default Navbar;
