import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import fetchData from '../../utils';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchData(`/product/view?id=${id}`);
      setProduct(data);
    };
    initialize();
  }, []);
  
  console.log('====================================');
  console.log('Product ->', product);
  console.log('====================================');

  return (
    <div>
      <Navbar />
      <button
        className="btn btn-accent"
        onClick={() => navigate(-1)}
      >
        GO BACK
      </button>
      <h1>Product {id}</h1>
      <h1>{product.name}</h1>
      <img src={product.imgSource} />
    </div>
  );
};

export default ProductPage;
