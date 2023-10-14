import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import fetchData from '../../utils';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ProductCard from '../layout/ProductCard';

const StorePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const data_products = await fetchData('/product/list');
      setProducts(data_products);
      if (data_products) {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <div classname="flex justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              className={'m-2 w-[20vw] h-[50vh]'}
              product={product}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default StorePage;
