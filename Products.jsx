import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import "./Products.css";

// BASE URL WITHOUT /uploads
const IMAGE_BASE_URL = "http://localhost:5000/";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  /* ================= DELETE PRODUCT ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Remove this item from the collection?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  /* ================= EDIT PRODUCT ================= */
  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <AdminLayout>
      <div className="products-page">
        <div className="header-flex">
          <h1>Products</h1>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/addproducts")}
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="empty-text">No products added yet.</p>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Rooms</th> 
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={
                        product.image
                          ? `${IMAGE_BASE_URL}${product.image}`
                          : "https://via.placeholder.com/60"
                      }
                      alt={product.name}
                      className="product-img"
                    />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.category}</td>

                  {/* ROOMS DISPLAY */}
                  <td>
                    {product.rooms && product.rooms.length > 0 ? (
                      <div className="room-tags">
                        {product.rooms.map((room) => (
                          <span key={room} className="room-tag">
                            {room.charAt(0).toUpperCase() + room.slice(1)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </td>

                  <td>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>
                  <td>{product.stock}</td>

                  <td className="action-btns">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
