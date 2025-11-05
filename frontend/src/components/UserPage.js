import React, { useEffect, useState } from "react";
import axios from "axios";

function UserPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add to cart (check stock)
  const addToCart = (product) => {
  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      // Decrease stock locally
      setProducts(
        products.map((p) =>
          p._id === product._id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } else {
      alert("Not enough stock available!");
    }
  } else {
    if (product.stock > 0) {
      setCart([...cart, { ...product, quantity: 1 }]);

      // Decrease stock locally
      setProducts(
        products.map((p) =>
          p._id === product._id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } else {
      alert("Out of stock!");
    }
  }
};

  // Checkout
  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("🎉 Thank you for buying!");
      setCart([]);
      setViewCart(false);
    }
  };

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/"; // redirect to login/signup page
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>
        Logout
      </button>
      <h2>{viewCart ? "🛒 Your Cart" : "🛍️ Available Products"}</h2>

      {!viewCart ? (
        <>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((p) => (
              <div
                key={p._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  margin: "10px auto",
                  padding: "10px",
                  width: "60%",
                }}
              >
                <h4>{p.name}</h4>
                <p>Price: ₹{p.price}</p>
                <p>Stock: {p.stock}</p>
                <button onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))
          )}
          <button onClick={() => setViewCart(true)}>Go to Cart</button>
        </>
      ) : (
        <>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  margin: "10px auto",
                  padding: "10px",
                  width: "60%",
                }}
              >
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))
          )}
          <button onClick={checkout}>Buy Now</button> &nbsp;
          <button onClick={() => setViewCart(false)}>Back to Products</button>
        </>
      )}
    </div>
  );
}

export default UserPage;
