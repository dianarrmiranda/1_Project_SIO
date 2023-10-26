import { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';

import axios from 'axios';
import { fetchData } from '../../utils';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const username = JSON.parse(localStorage.getItem('user'));
      const data_user = await fetchData(`/user/view?id=${username[0].id}`);

      if (data_user) {
        setUser(data_user);
        setCart(data_user.shopping_Cart);
      }
    };
    initialize();
  }, []);
  console.log('User ->', user);
  console.log('Cart -> ', cart);

  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="mx-[5%] bg-base-100">
        <div id="delivery-info w-[60%]"></div>
        <div className="w-[40%]">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between"
            >
              <h1>
                {`${item.quantity}x ${item.prod.name} \t\t ${item.prod.price}€`}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
