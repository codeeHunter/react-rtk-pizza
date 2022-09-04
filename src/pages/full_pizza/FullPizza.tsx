import React, { FC, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Loader } from "../../components/loader/Loader";
import styles from "./FullPizza.module.scss";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6311c2a019eb631f9d7869a2.mockapi.io/items-pizza/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className={styles.pizzaItem}>
        <img src={pizza.imageUrl} alt="" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price}Р</h4>
        <Link to="/" className="button button--outline button--add go-back-btn">
          Вернуться назад
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
