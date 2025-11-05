import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

export const getProducts = () => API.get("/products");

export const addProduct = (token, data) =>
  API.post("/products", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (token, id, updatedData) =>
  API.put(`/products/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (token, id) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (token, productId) =>
  API.post(
    "/cart",
    { productId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getCart = (token) =>
  API.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const placeOrder = (token) =>
  API.post(
    "/cart/checkout",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
export const checkout = (token) =>
  API.post("/cart/checkout", {}, { headers: { Authorization: `Bearer ${token}` } });