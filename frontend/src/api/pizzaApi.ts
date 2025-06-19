export const getPizzas = async () => {
  const res = await fetch('http://localhost:4000/api/pizzas');
  return res.json();
};

export const sendOrder = async (order: any) => {
  const res = await fetch('http://localhost:4000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  return res.json();
};
