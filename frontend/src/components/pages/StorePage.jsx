import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import fetchData from "../../utils";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ProductCard from "../layout/ProductCard";

const StorePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const data_products = await fetchData('/product/list');
      setProducts(data_products);
    };

    initialize();
  }, []);


  return (
    <div>
    <Navbar />

      <div className="flex flex-wrap justify-evenly">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              className={'m-2'}
              product={product}
            />
          ))}
        </div>

      <Footer />
    </div>
  )
}

export default StorePage
