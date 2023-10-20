import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import { fetchData } from '../../utils';
import Footer from '../layout/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchData(`/user/view?id=${id}`);
      setUser(data);
    };
    initialize();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  console.log('User ->', user);

  return (
    <div>
      <Navbar />
      
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <img src={"../../"+user.image} alt="User Image" className="w-full h-full object-cover" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-lg mb-2">{user.email}</p>
          <button className="btn btn-accent mb-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
