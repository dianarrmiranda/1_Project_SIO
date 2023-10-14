import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiEyeLine } from 'react-icons/ri';

const ProductCard = ({ product, className, isStore }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`card compact ${
        isStore ? 'w-48 ' : 'w-96'
      } bg-white my-2 ${className}`}
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
        <h2 className="card-title text-[1rem]">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-secondary"
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
