// frontend/src/components/PizzaList.tsx
import { useEffect, useState } from "react";
import { getPizzas } from "../api/pizzaApi";
import { type Pizza } from "../types";

interface Props {
  addToCart: (pizza: Pizza) => void;
}

const PizzaList = ({ addToCart }: Props) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    getPizzas().then(setPizzas);
  }, []);

  return (
    <div>
      <h2>Меню піц</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <p>{pizza.price} грн</p>
            <button onClick={() => addToCart(pizza)}>Додати в кошик</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
