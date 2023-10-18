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
      
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <img src={product.imgSource} alt="Product Image" className="w-full h-full object-cover" />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg mb-2">{product.description}</p>
          <p className="font-bold text-lg mb-2">{product.price}€</p>
          <button
            className="btn btn-accent mb-2"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
