// frontend/src/App.tsx
import { useState } from "react";
import PizzaList from "./components/PizzaList";
import Cart from "./components/Cart";
import type { Pizza } from "./types";

function App() {
  const [cart, setCart] = useState<Pizza[]>([]);

  const addToCart = (pizza: Pizza) => {
    setCart((prev) => [...prev, pizza]);
  };

  const clearCart = () => setCart([]);

  return (
    <div>
      <h1>Pizza Shop</h1>
      <PizzaList addToCart={addToCart} />
      <Cart cart={cart} clearCart={clearCart} />
    </div>
  );
}

export default App;
