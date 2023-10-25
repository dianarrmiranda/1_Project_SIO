import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../utils';
import {
  RiAccountCircleLine,
  RiSunFill,
  RiMoonClearFill,
  RiShoppingBag2Line,
  RiSearch2Line,
} from 'react-icons/ri';

import logo from '../../assets/deti_store_logo.svg';

const Navbar = ({ categories }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );
  const navigate = useNavigate();

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
    <div className="navbar bg-secondary w-full flex flex-wrap justify-between items-center p-2 top-0">
      <Link
        to="/"
        className="max-w-[5%] justify-sel"
      >
        <img src={logo}></img>
      </Link>
      <form className="join w-[40vw] justify-self-center">
        <input
          type="textbox"
          className="input input-sm input-bordered rounded-full input-primary join-item w-[40vw]"
          placeholder={'Search for products...'}
          name="search"
        />
        <button
          className="btn btn-primary btn-sm join-item rounded-full font-bold"
          type="submit  "
          onClick={() => {
            navigate(
              `/store?search=${document.getElementsByName('search')[0].value}`
            );
          }}
        >
          <RiSearch2Line />
          Search
        </button>
      </form>
      <p className="mr-2">{user ? `Hello ${user[0]?.name}!  ` : ''} </p>

      <div className="flex flex-wrap justify-end">
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

        {user && (
          <button className="flex items-center m-2 p-2" onClick={() => navigate('user/cart')}>
            <RiShoppingBag2Line className="text-xl" />
          </button>
        )}

        {true && (
          <button
            className="flex items-center m-2 p-2"
            onClick={
              user
                ? () => navigate(`/user/${user[0]?.id}`)
                : () => navigate('/login')
            }
          >
            <RiAccountCircleLine className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
