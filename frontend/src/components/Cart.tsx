// frontend/src/components/Cart.tsx
import { type Pizza, type Order } from "../types";
import { sendOrder } from "../api/pizzaApi";
import { useState } from "react";

interface Props {
  cart: Pizza[];
  clearCart: () => void;
}

const Cart = ({ cart, clearCart }: Props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const handleOrder = async () => {
    if (!name || !address || cart.length === 0) return;

    const order: Order = { name, address, cart };
    const res = await sendOrder(order);
    setMessage(res.message);
    clearCart();
  };

  return (
    <div>
      <h2>Кошик</h2>
      <ul>
        {cart.map((p, i) => (
          <li key={i}>
            {p.name} — {p.price} грн
          </li>
        ))}
      </ul>
      <p>Сума: {total} грн</p>

      <input
        type="text"
        placeholder="Ваше ім’я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Адреса доставки"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleOrder}>Оформити замовлення</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Cart;
