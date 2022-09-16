import React from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63090636722029d9dddd59fe.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ой, что-то пошло не так, попробуйте позже');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to={'/'}>
        <button className="button button--outline -button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
