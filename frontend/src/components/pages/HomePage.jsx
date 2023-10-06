import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Caroussel from '../layout/Caroussel'

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
      {/* <Caroussel images={["https://via.placeholder.com/700x700","https://via.placeholder.com/1000x1000"]} /> */}
      <h1 className="text-xxl text-red-400">LAND PAGE</h1>
      <button onClick={() => navigate('/store')}>GO TO STORE</button>
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={theme === 'light' ? false: true}
      />
    </div>
  );
};

export default HomePage;
