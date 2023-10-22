import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine, RiShoppingCartLine } from 'react-icons/ri';

const ProductCard = ({ product, className, isStore }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`card compact ${
        isStore ? 'w-48 ' : 'w-96'
      } -bg-card-color my-2 ${className}`}
    >
      <figure>
        <img
          className={`${
            isStore ? 'max-w-48 h-48' : 'max-w-96 h-96'
          } object-cover`}
          src={product.img}
          alt={`${product.name}-from-deti-store`}
        />
      </figure>
      <div className="card-body">
        <h3 className={`card-title ${isStore? 'text-sm' : 'text-md'} line-clamp-1 hover:line-clamp-none`}>{product.name}</h3>
        <p>{product.description}</p>
        <p className="text-accent font-bold">{product.price}€</p>
        <div className="card-actions justify-start">
          <button className=' badge badge-outline'>{product.category}</button>
          
          <button className=' bottom-0 right-5 m-5 absolute '>
            <RiShoppingCartLine />
          </button>
          <button
            className=" bottom-0 right-0 m-5 absolute "
            onClick={() => navigate(`/store/product/${product.id}`)}
          >
            <RiEyeLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
