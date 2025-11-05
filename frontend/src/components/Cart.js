import React from "react";

function Cart({ cart, onCheckout }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10 }}>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i}>
              {item.product?.name} x {item.quantity}
            </div>
          ))}
          <button onClick={onCheckout} style={{ marginTop: 10 }}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
