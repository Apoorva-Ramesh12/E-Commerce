import React, { useEffect, useState } from "react";
import axios from "axios";

function UserPage({ auth }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewCart, setViewCart] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add to Cart
const addToCart = async (product) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/add-to-cart",
      { productId: product._id },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  } catch (err) {
    alert(err.response?.data?.msg || "Something went wrong adding to cart!");
  }
};

// Checkout
const checkout = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/orders",
      { items: cart }, // send cart items to backend
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    alert("🎉 Thank you for buying!");
    setCart([]);
    setViewCart(false);
  } catch (err) {
    console.error(err);
    alert("Something went wrong while placing your order!");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>Logout</button>
      <h2>{viewCart ? "🛒 Your Cart" : "🛍️ Available Products"}</h2>

      {!viewCart ? (
        <>
          {products.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ccc", borderRadius: 10, margin: 10, padding: 10, width: "60%", marginLeft: "auto", marginRight: "auto" }}>
              <h4>{p.name}</h4>
              <p>Price: ₹{p.price}</p>
              <p>Stock: {p.stock}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
          <button onClick={() => setViewCart(true)}>Go to Cart</button>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} style={{ border: "1px solid #ccc", borderRadius: 10, margin: 10, padding: 10, width: "60%", marginLeft: "auto", marginRight: "auto" }}>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <button onClick={checkout}>Buy Now</button>
          <button onClick={() => setViewCart(false)}>Back to Products</button>
        </>
      )}
    </div>
  );
}

export default UserPage;
