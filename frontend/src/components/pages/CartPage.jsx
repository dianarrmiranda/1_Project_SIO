import React, { useEffect, useState } from 'react';

import { fetchData } from '../../utils';
import Navbar from '../layout/Navbar';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem('user'));
    const initialize = async () => {
      console.log('Username ->', username[0].id);

      const user = await fetchData(`/user/view?id=${username[0].id}`);
      console.log('User ->', user);

      if (user) {
        setCart(user.shopping_Cart);
        console.log('Cart ->', user.shopping_Cart);
      }
    };

    initialize();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-[10%]">
        {cart.length > 0 &&
          cart.map((item) => (
            <div key={item?.id} className='flex just'>
              <h1>{item?.prod?.name}</h1>
              <h1>{item?.quantity}</h1>
              <h2>{item?.prod?.price * item.quantity}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CartPage;
