import React, { useEffect, useState } from "react";
import { getCart, placeOrder } from "../api";

function CartPage({ auth }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    const res = await getCart(auth.token);
    setCart(res.data);
  }

  async function handleCheckout() {
    await placeOrder(auth.token);
    alert("Checkout successful!");
    fetchCart();
  }

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="center">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.product._id} className="card">
              <h4>{item.product.name}</h4>
              <p>₹{item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
