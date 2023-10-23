import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import { fetchData } from '../../utils';
import Footer from '../layout/Footer';
import ProductComments from '../layout/ProductComments';

import axios from 'axios';
import { API_BASE_URL } from '../../constants';

import {
  RiFlashlightLine,
  RiShoppingCartFill,
  RiRocketLine,
} from 'react-icons/ri';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [user_id, setUser_id] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchData(`/product/view?id=${id}`);
      setProduct(data);
      setComments(data.reviews);
      const username = JSON.parse(localStorage.getItem('user'));
      setUser_id(username[0].id);
    };
    initialize();
  }, []);

  const handleAddToCart = () => {
    axios
      .post(
        `${API_BASE_URL}/user/addToCart?prod=${product.id}&userID=${
          user_id
        }&quantity=${document.getElementById('qty').value}}`
      )
      .then((res) => {
        console.log(res);
      });
  };

  console.log('Product ->', product);
  return (
    <div className="bg-base-200">
      <Navbar />
      <div
        id="content-body"
        className="mx-[10%] bg-base-100 p-4"
      >
        <div className="flex flex-row">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
            <img
              src={'../../' + product.imgSource}
              alt={`${product.name}-from-deti-store`}
              className="w-[30vw]  object-cover mx-[10%] rounded-xl"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 left-2 my-4 flex flex-col justify-between">
            <h1 className="text-4xl font-extrabold ">{product.name}</h1>
            <span className="divider my-0" />
            <button
              className="text-xl font-bold my-2 badge badge-outline p-4"
              onClick={() => {
                navigate(`/store?category=${product.category?.id}`);
              }}
            >
              {product.category?.name}
            </button>

            <h2 className="text-lg">
              From:{' '}
              <span className="font-bold text-accent">{product.origin}</span>
            </h2>

            <div className="flex flex-wrap justify-start align-items-bottom">
              <p className="font-extrabold text-primary text-2xl mb-2">
                {product.price}€
              </p>
              <span className="text-lg text-accent mx-10 flex-row ">
                qty:{' '}
                <input
                  type="number"
                  id="qty"
                  min={1}
                  className="input input-sm input-accent input-bordered border-2 w-[5vw] "
                />
              </span>
            </div>
            <div className="text-accent flex flex-row">
              <RiFlashlightLine className="mx-2" />
              Free shipping for national orders
              <RiFlashlightLine className="mx-2" />
            </div>
            <button className="btn btn-primary relative top-8 mb-2" onClick={handleAddToCart}>
              Add to cart <RiShoppingCartFill className="ml-2" />
            </button>
          </div>
        </div>
        <div>
          <ProductComments
            comments={comments}
            user_id={user_id}
            product={product}
            setComments={setComments}
          />
          <button
            className="btn btn-accent  top-8 mb-2"
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
