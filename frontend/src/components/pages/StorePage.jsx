import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchData, getSearchParams } from '../../utils';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ProductCard from '../layout/ProductCard';
import Filter from '../layout/Filter';

const StorePage = () => {
  const navigate = useNavigate();
  const search_query = getSearchParams();
  console.log('search params -> ', search_query);

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

  console.log('Products -> ', products);

  return (
    <div>
      <Navbar />
      {search_query && (
        <div className=" bg-accent mx-[5%] m-2 p-4 rounded-xl  ">
          <h3>
            You searched for:{' '}
            <b>
              <span dangerouslySetInnerHTML={{ __html: search_query }} />
            </b>
          </h3>
        </div>
      )}
      <div className="flex justify-between mx-[5%]">
        <div className="w-[20vw] flex-none">
          <Filter categories={categories} />
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
