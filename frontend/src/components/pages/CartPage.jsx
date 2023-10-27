import React, { useEffect, useState } from 'react';

import { fetchData } from '../../utils';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { API_BASE_URL } from '../../constants';

import { BsTrash } from 'react-icons/bs';
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem('user'));
    const initialize = async () => {
      console.log('Username ->', username[0].id);

      const user = await fetchData(`/user/view?id=${username[0].id}`);
      setUser(user);
      console.log('User ->', user);

      if (user) {
        setCart(user.shopping_Cart);
      }
    };

    initialize();
  }, []);

  console.log('Cart ->', cart);

  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="mx-[10%] p-8">
        <h1 className="text-3xl font-bold">Cart</h1>
        <span className="divider" />
        <div className="flex flex-col justify-evenly h-full w-3/4">
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <div
                key={item?.id}
                className="flex flex-wrap hover:bg-secondary shadow-lg m-2 p-2 rounded-xl bg-base-100"
              >
                <div className="w-1/6 h-1/6 p-2">
                  <img
                    src={'../../../' + item?.prod?.imgSource}
                    alt=""
                    className="object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      navigate(`/store/product/${item?.prod?.id}`);
                    }}
                  />
                </div>
                <div className="flex flex-col justify-evenly mx-4 w-1/2">
                  <span className="flex flex-row justify-start items-center w-full">
                    <h1 className="font-bold text-xl p-2">
                      {item?.prod?.name}
                    </h1>
                    <button className="aboslute top-1 right-1 " onClick={() => {
                      axios.post(`${API_BASE_URL}/user/removeFromCart?prod=${item?.prod.id}&userID=${user.id}`);
                      setCart((prev) => {
                        const newCart = [...prev];
                        newCart.splice(idx, 1);
                        return newCart;
                      });
                    }}>
                      <BsTrash className="text-xl" />
                    </button>
                  </span>

                  <span className="mx-2">
                    Quantity:{' '}
                    <input
                      type="number"
                      min={0}
                      className="input input-bordered w-20"
                      defaultValue={item?.quantity}
                      onChange={(e) => {
                        setCart((prev) => {
                          const newCart = [...prev];
                          newCart[idx].quantity = e.target.value;
                          return newCart;
                        });
                        axios.post(
                          `${API_BASE_URL}/user/addToCart?prod=${item?.prod.id}&userID=${user.id}&quantity=${e.target.value}`
                        );
                      }}
                    />
                  </span>
                  <div className="flex justify-between m-2">
                    <span className="font-light">
                      {item?.quantity}x {item?.prod?.price}€
                    </span>
                    <span className="font-extrabold text-accent-focus">
                      {(item?.prod?.price * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Cart is empty</h1>
          )}
        </div>

        <div>
          <h2>
            Total:{' '}
            {cart
              .reduce(
                (acc, item) => (acc += item.prod.price * item.quantity),
                0
              )
              .toFixed(2)}
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate('/user/checkout');
            }}
          >
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
