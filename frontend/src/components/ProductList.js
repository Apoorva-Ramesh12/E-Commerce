import React from 'react';

export default function ProductList({ products, onAdd }) {
  if (!products) return null;
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 12 }}>
      {products.map(p => (
        <div key={p._id} style={{ border:'1px solid #ddd', padding:12, borderRadius:6 }}>
          <h3 style={{ marginTop:0 }}>{p.name}</h3>
          <p style={{ marginBottom:4 }}>{p.description}</p>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <strong>₹{p.price}</strong>
            <div>
              <small>Stock: {p.stock}</small>
            </div>
          </div>
          <div style={{ marginTop:8 }}>
            <button onClick={() => onAdd(p._id)} disabled={p.stock<=0}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
