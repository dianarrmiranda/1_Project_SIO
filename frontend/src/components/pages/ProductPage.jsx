import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import { fetchData } from '../../utils';
import Footer from '../layout/Footer';

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

  console.log('Product ->', product);

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
      <p>{product.imgSource}</p>
      <Footer />
    </div>
  );
};

export default ProductPage;
