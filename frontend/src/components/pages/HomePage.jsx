import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Carousel from '../layout/Carousel'

const imgs = ["https://i.imgur.com/bRJ9Eki.jpeg", "https://i.imgur.com/ffDXQcD.jpeg", "https://i.imgur.com/ULExX9s.jpeg"]

const HomePage = () => {
  const navigate = useNavigate();

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
    <div>
      <Navbar />
      <Carousel images={imgs} />
      <h1 className="text-xxl text-red-400">LAND PAGE</h1>
      <button onClick={() => navigate('/store')}>GO TO STORE</button>
      <input
        id="search-box"  
        type="checkbox"
        onChange={handleToggle}
        checked={theme === 'light' ? false: true}
      />
      
    </div>
  );
};

export default HomePage;
