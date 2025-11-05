import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api";

function AdminPage({ auth }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", stock: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await getProducts();
    setProducts(res.data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    await addProduct(auth.token, form);
    setForm({ name: "", price: "", description: "", stock: "" });
    fetchProducts();
  }

  async function handleDelete(id) {
    await deleteProduct(auth.token, id);
    fetchProducts();
  }
  async function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/"; // redirect to login/signup page
  }

  // ✅ use the imported updateProduct function properly here
  async function handleUpdate(id) {
    const updatedData = { price: prompt("Enter new price:") }; // simple example
    if (!updatedData.price) return;
    await updateProduct(auth.token, id, updatedData);
    fetchProducts();
  }

  return (
    <div className="center">
      <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <button type="submit">Add Product</button>
      </form>

      <h3>All Products</h3>
      {products.map((p) => (
        <div key={p._id} className="card">
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <p>{p.description}</p>
          <p>Stock: {p.stock}</p>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
          {/* ✅ Add Update button */}
          <button onClick={() => handleUpdate(p._id)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
