import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RiEyeLine } from 'react-icons/ri';

const ProductCard = ({ product, className }) => {
    const navigate = useNavigate()

  return (
    <div className={`card compact w-96 glass ${className}`}>
      <figure>
        <img
          className='max-w-96 h-96 object-cover '
          src={product.img}
          alt={`${product.name}-from-deti-store`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary" onClick={()=>navigate(`/store/product/${product.id}`)}><RiEyeLine /></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
