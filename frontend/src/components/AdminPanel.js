import React, { useState } from "react";

function AdminPanel({ onAdd }) {
  const [form, setForm] = useState({ name: "", price: "", description: "", stock: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", price: "", description: "", stock: "" });
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Add Product (Admin)</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 6 }} />
        <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required style={{ width: "100%", marginBottom: 6 }} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} style={{ width: "100%", marginBottom: 6 }} />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} style={{ width: "100%", marginBottom: 6 }} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminPanel;
