import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import fetchData from '../../utils';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ProductCard from '../layout/ProductCard';
import Filter from '../layout/Filter';

const StorePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const data_products = await fetchData('/product/list');
      const data_categories = await fetchData('/product/category/list');

      if (data_products && data_categories) {
        setLoading(false);
      }
      setProducts(data_products);
      setCategories(data_categories);
    };

    initialize();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-between mx-[5%]">
        <div className="w-[20vw] flex-none">
          <Filter categories={categories}/>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <div className="flex flex-wrap justify-evenly">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                className={''}
                product={product}
                isStore
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StorePage;
