import React, { useEffect, useState } from 'react';

import { fetchData } from '../../utils';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem('user'));
    const initialize = async () => {
      console.log('Username ->', username[0].id);

      const user = await fetchData(`/user/view?id=${username[0].id}`);
      console.log('User ->', user);

      if (user) {
        setCart(user.shopping_Cart);
      }
    };

    initialize();
  }, []);

    useEffect(() => {
      const updateCart = async () => {
        const updatedCart = await axios.post(
          `${API_BASE_URL}/user/updateCart`,
        )
      }
    }, [cart]);


  console.log('Cart ->', cart);

  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="mx-[10%] bg-base-100 p-8">
        <h1 className="text-3xl font-bold">Cart</h1>
        <table className="table h-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item, idx) => (
                <tr
                  key={item?.id}
                  className="hover:bg-secondary hover:shadow-lg"
                >
                  <td>
                    <div
                      className="flex flex-row align-middle"
                      onClick={() => {
                        navigate(`/store/product/${item?.prod?.id}`);
                      }}
                    >
                      <img
                        src={'../../../' + item?.prod?.imgSource}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg mr-2"
                      />
                      <h1 className="font-bold text-lg">{item?.prod?.name}</h1>
                    </div>
                  </td>
                  <td>
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
                      }}
                    />
                  </td>
                  <td>{(item?.prod?.price * item.quantity).toFixed(2)}€</td>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <h1>Cart is empty</h1>
            )}
          </tbody>
        </table>

        <div>
          <h2>
            Total:{' '}
            {cart.reduce(
              (acc, item) => (acc += item.prod.price * item.quantity),
              0
            ).toFixed(2)}
          </h2>
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
