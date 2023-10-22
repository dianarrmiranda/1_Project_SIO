import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchData, getUrlParams } from '../../utils';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ProductCard from '../layout/ProductCard';
import Filter from '../layout/Filter';

const StorePage = () => {
  const navigate = useNavigate();
  const search_query = getUrlParams().get('search');
  const minPrice = getUrlParams().get('min');
  const maxPrice = getUrlParams().get('max');
  const catFilter = getUrlParams().getAll('category');
  console.log('search params -> ', search_query);
  console.log('minPrice -> ', minPrice);
  console.log('maxPrice -> ', maxPrice);
  console.log('catFilter -> ', catFilter);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  useEffect(() => {
    if (search_query) {
      document.getElementById('show_query_results').innerHTML = search_query;
      products.forEach((product) => {
        if (product.name.toLowerCase().includes(search_query.toLowerCase())) {
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      });
    }
  }, []);

  console.log('Products -> ', products);
  console.log('Categories -> ', categories);

  return (
    <div>
      <Navbar />
      {search_query && (
        <div className=" bg-accent mx-[5%] m-2 p-4 rounded-xl  ">
          {notFound ? (
            <h1>
              Your search <b className="font-extrabold">{search_query}</b> did
              not generated any results{' '}
            </h1>
          ) : (
            <h3>
              You searched for:{' '}
              <b>
                <span id='show_query_results' />
              </b>
            </h3>
          )}
        </div>
      )}
      <div className="flex justify-between mx-[5%]">
        <div className="w-[20vw] flex-none">
          <Filter
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryFilter={catFilter}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : notFound ? (
          <div className="justify-center w-full h-full m-48">
            <h1 className="text-center text-xl font-bold">No products found</h1>
          </div>
        ) : (
          <div className="flex flex-wrap justify-start">
            {products
              .filter((product) => {
                let found = false;
                if (search_query) {
                  return product.name
                    .toLowerCase()
                    .includes(search_query.toLowerCase());
                }
                return true;
              })
              .filter((product) => {
                if (minPrice && maxPrice) {
                  return (
                    parseFloat(product.price) >= minPrice &&
                    parseFloat(product.price) <= maxPrice
                  );
                }
                if (minPrice) {
                  return parseFloat(product.price) >= minPrice;
                }
                if (maxPrice) {
                  return parseFloat(product.price) <= maxPrice;
                }
                return true;
              })
              .filter((product) => {
                if (catFilter.length > 0) {
                  return catFilter.includes(product.categoryID);
                }
                return true;
              })
              .map((product) => (
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
