import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, className }) => {
    const navigate = useNavigate()

  return (
    <div className={`card w-96 glass ${className}`}>
      <figure>
        <img
          src={product.img}
          alt={`${product.name}-from-deti-store`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>navigate(`/store/product/${product.id}`)}>View more!</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
