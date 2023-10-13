import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import fetchData from '../../utils';

import Navbar from '../layout/Navbar';
import Carousel from '../layout/Carousel';
import ProductCard from '../layout/ProductCard';

const imgs = [
  'https://i.imgur.com/bRJ9Eki.jpeg',
  'https://i.imgur.com/ffDXQcD.jpeg',
  'https://i.imgur.com/ULExX9s.jpeg',
];

const HomePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchData('/product/list')
      setProducts(data);
    };

    initialize();
  }, []);

  console.log('products -> ', products);

  return (
    <div>
      <Navbar />
      <Carousel images={imgs} />
      <div className="flex flex-wrap m-[5%]">
        {products.map((product) => (
          <ProductCard key={product.id} className={"m-2"} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
