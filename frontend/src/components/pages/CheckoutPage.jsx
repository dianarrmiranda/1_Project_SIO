import { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { RiBankCardLine } from 'react-icons/ri';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { fetchData } from '../../utils';
import { maskCreditCard } from '../../utils';
import { API_BASE_URL } from '../../constants';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [newCard, setNewCard] = useState({
    card_name: '',
    card_number: '',
    expiration_date: '',
    cvv: '',
  });
  const [selectedCard, setSelectedCard] = useState(0);

  useEffect(() => {
    const initialize = async () => {
      const username = JSON.parse(localStorage.getItem('user'));
      const saved_cards = JSON.parse(localStorage.getItem('cards'));
      console.log('Saved cards -> ', saved_cards);

      const data_user = await fetchData(`/user/view?id=${username[0].id}`);

      if (data_user && saved_cards) {
        setUser(data_user);
        setCart(data_user.shopping_Cart);
        setCards(saved_cards);
      }

      const defaultCard = {
        card_name: 'Default',
        card_number: username[0].credit_Card,
        expiration_date: '01/2025',
        cvv: '123',
      };

      setCards(savedCards.length > 0 ? savedCards : [defaultCard]);
    };
    initialize();
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleCheckout = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/user/requestCurrentCart?userID=${user.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log('Order placed successfully');
          console.log(res.data);
        }
      });
    navigate('/user/' + user.id);
  };

  console.log('User ->', user);
  console.log('Cart -> ', cart);
  console.log('Cards -> ', cards);

  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="mx-[5%] flex justify-between">
        <form
          id="delivery-info"
          className="w-[65%] flex flex-col justify-evenly mx-4"
        >
          <div className="flex flex-col bg-base-100 rounded-lg shadow-xl p-4 my-6">
            <span className="flex align-text-bottom">
              <h1 className=" rounded-full h-10 w-10 bg-primary p-2 text-center">
                1
              </h1>
              <h1 className="font-bold text-xl ml-4 align-text-bottom">
                Delivery Information
              </h1>
            </span>
            <div className="m-4 flex justify-evenly">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Delivery Day"
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Delivery Time"
                  ampm={false}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="flex flex-col bg-base-100 rounded-lg shadow-xl p-4">
            <span className="flex align-text-bottom">
              <h1 className=" rounded-full h-10 w-10 bg-primary p-2 text-center">
                2
              </h1>
              <h1 className="font-bold text-xl ml-4 align-text-bottom">
                Delivery Address
              </h1>
            </span>
            <div>
              <div className="flex flex-wrap m-2">
                <span className="flex flex-col w-full">
                  <label
                    className="font-bold"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    className="input input-bordered w-full"
                    type="text"
                    placeholder="Street address or P.O. box"
                  />
                </span>
                <span className="flex flex-col w-full my-1">
                  <input
                    id="address2"
                    className="input input-bordered"
                    type="text"
                    placeholder="Apt, suite, unit, building, floor, etc."
                  />
                </span>
                <div className="flex flex-row justify-between w-full mt-2">
                  <span className="flex flex-col">
                    <input
                      id="city"
                      className="input input-bordered"
                      type="text"
                      placeholder="City"
                    />
                  </span>
                  <span className="flex flex-col">
                    <input
                      id="country"
                      className="input input-bordered"
                      type="text"
                      placeholder="Country"
                    />
                  </span>
                  <span className="flex flex-col">
                    <input
                      id="zip_code"
                      className="input input-bordered"
                      type="text"
                      placeholder="Zip Code"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-base-100 rounded-lg shadow-xl p-4 my-6">
            <span className="flex align-text-bottom">
              <h1 className=" rounded-full h-10 w-10 bg-primary p-2 text-center">
                3
              </h1>
              <h1 className="font-bold text-xl ml-4 align-text-bottom">
                Payment Details
              </h1>
            </span>
            <div className="flex flex-wrap justify-evenly m-2">
              <span className="flex flex-col my-2 w-[48%]">
                <input
                  id="card"
                  className="input input-bordered"
                  type="text"
                  placeholder="Card Name"
                  onChange={(e) => {
                    setNewCard({
                      ...newCard,
                      card_name: e.target.value,
                    });
                  }}
                />
              </span>
              <span className="flex flex-col my-2 w-[48%]">
                <input
                  id="card_number"
                  className="input input-bordered"
                  type="text"
                  placeholder="Card Number"
                  onChange={(e) => {
                    setNewCard({
                      ...newCard,
                      card_number: e.target.value,
                    });
                  }}
                />
              </span>
              <span className="flex flex-col my-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="expiration_date"
                    label="Expiration Date"
                    format="MM/YYYY"
                    views={['month', 'year']}
                    onChange={(date) => {
                      setNewCard({
                        ...newCard,
                        expiration_date: date.format('MM/YYYY'),
                      });
                    }}
                  />
                </LocalizationProvider>
              </span>
              <span className="flex flex-col my-2">
                <input
                  id="cvv"
                  className="input input-bordered"
                  type="text"
                  placeholder="CVC/CVV"
                  onChange={(e) => {
                    setNewCard({
                      ...newCard,
                      cvv: e.target.value,
                    });
                  }}
                />
              </span>
              <button
                className="btn btn-primary my-2 w-1/4"
                type="button"
                onClick={() => {
                  setCards([...cards, newCard]);
                  setNewCard({
                    card_name: '',
                    card_number: '',
                    expiration_date: '',
                    cvv: '',
                  });
                }}
              >
                Add Card
              </button>
            </div>
            <div className="flex flex-wrap justify-start my-2">
              {cards?.map((card, idx) => (
                <div
                  key={card.card_number}
                  className={`card w-[30%]  flex flex-row m-2 ${
                    selectedCard === idx
                      ? 'border-2 border-accent bg-secondary'
                      : 'bg-base-200'
                  }`}
                  onClick={() => {
                    setSelectedCard(idx);
                    console.log('Selected -> ', idx);
                  }}
                >
                  <div className="card-body flex justify-between w-full ">
                    <h1 className="flex flex-row">
                      <RiBankCardLine className="text-2xl" />
                      <span className="font-bold card-title mx-2">
                        {card.card_name}
                      </span>
                    </h1>
                    <span>{maskCreditCard(card.card_number)}</span>
                    <span>{card.expiration_date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary my-2 w-full"
              type="submit"
              onClick={handleCheckout}
            >
              Place Order
            </button>
          </div>
        </form>

        <div className="w-[35%] m-4">
          <h1 className="font-bold text-lg">Your order </h1>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between m-4"
            >
              <div className="flex justify-between w-full ">
                <h1>
                  <span className="font-bold ">{item.quantity}x</span>{' '}
                  {item.prod.name}
                </h1>
                <span>{item.prod.price * item.quantity}€</span>
              </div>
            </div>
          ))}
          <div className="divider" />
          <div className="flex flex-col m-4 text-accent">
            <span className="flex justify-between my-2 mt-0">
              <h1 className="font-bold">Subtotal</h1>
              {cart
                .reduce((acc, item) => acc + item.prod.price * item.quantity, 0)
                .toFixed(2)}
              €
            </span>
            <span className="flex justify-between my-2">
              <h1 className="font-bold">Shipping</h1>
              <span>-</span>
            </span>
            <span className="flex justify-between my-2">
              <h1 className="font-bold">Discoount</h1>
              <span>-</span>
            </span>
          </div>
          <div className="divider" />
          <div className="flex justify-between m-4">
            <h1 className="font-bold">Total</h1>
            <span>
              {cart
                .reduce((acc, item) => acc + item.prod.price * item.quantity, 0)
                .toFixed(2)}
              €
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
