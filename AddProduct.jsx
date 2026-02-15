import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    rooms: [],
    description: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoomChange = (e) => {
    const { value, checked } = e.target;

    setProduct((prev) =>
      checked
        ? { ...prev, rooms: [...prev.rooms, value] }
        : { ...prev, rooms: prev.rooms.filter((r) => r !== value) }
    );
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.stock ||
      !product.description ||
      product.rooms.length === 0
    ) {
      setError("Please fill all fields and select at least one room");
      return;
    }

    if (!image) {
      setError("Please upload an image");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not authorized. Please login.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category.toLowerCase());
      formData.append("rooms", JSON.stringify(product.rooms));
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);
      formData.append("image", image);

      const res = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add product");
        return;
      }

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="add-product-container">
        <h1>Add New Product</h1>

        <form onSubmit={handleSubmit} className="add-product-form">
          <input
            type="text"
            name="name"
            value={product.name}
            placeholder="Product Name"
            onChange={handleChange}
          />

          <select name="category" value={product.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="furniture">Furniture</option>
            <option value="lighting">Lighting</option>
            <option value="walldeco">Wall Decor</option>
            <option value="accessories">Accessories</option>
            <option value="mirrors">Mirrors</option>
            <option value="rugs">Rugs</option>
          </select>

          <div className="rooms-section">
            <p>Select Rooms</p>
            {["living", "bedroom", "dining", "kitchen"].map((room) => (
              <label key={room}>
                <input
                  type="checkbox"
                  value={room}
                  checked={product.rooms.includes(room)}
                  onChange={handleRoomChange}
                />
                {room.charAt(0).toUpperCase() + room.slice(1)}
              </label>
            ))}
          </div>

          <input
            type="number"
            name="price"
            value={product.price}
            placeholder="Price"
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            placeholder="Stock"
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={product.description}
            placeholder="Description"
            onChange={handleChange}
          />

          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
