import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Carousel from '../layout/Carousel';
import ProductCard from '../layout/ProductCard';

const imgs = [
  'https://i.imgur.com/bRJ9Eki.jpeg',
  'https://i.imgur.com/ffDXQcD.jpeg',
  'https://i.imgur.com/ULExX9s.jpeg',
];

const product = {
  name: 'TestProd1',
  id: 1,
  image: "https://via.placeholder.com/400x400" ,
  date: '2023/10/09 11:40',
  origin: 'pt',
  description: 'produto de testes',
  price: 123.99,
  in_Stock: 3,
  category: {
    name: 'Portateis',
    id: 1,
    description: 'PCs portateis',
  },
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Carousel images={imgs} />
      <ProductCard product={product}  />
    </div>
  );
};

export default HomePage;
