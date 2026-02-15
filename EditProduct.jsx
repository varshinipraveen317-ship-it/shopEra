import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "./EditProduct.css";

const CATEGORY_OPTIONS = [
  { label: "Furniture", value: "furniture" },
  { label: "Lighting", value: "lighting" },
  { label: "Wall Decor", value: "walldeco" },
  { label: "Accessories", value: "accessories" },
  { label: "Mirrors", value: "mirrors" },
  { label: "Rugs", value: "rugs" },
];

const normalizeCategory = (category = "") =>
  category.toLowerCase().replace(/\s+/g, "").trim();

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    rooms: [],
    description: "",
    stock: "",
    image: null,
  });

  const [originalProduct, setOriginalProduct] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/admin/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        const loadedProduct = {
          name: data.name || "",
          price: data.price || "",
          category: normalizeCategory(data.category),
          rooms: data.rooms || [],
          description: data.description || "",
          stock: data.stock || "",
          image: null,
        };

        setProduct(loadedProduct);
        setOriginalProduct(loadedProduct);

        if (data.image) {
          setPreview(`http://localhost:5000/${data.image}`);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load product");
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleRoomChange = (e) => {
    const { value, checked } = e.target;

    setProduct((prev) =>
      checked
        ? { ...prev, rooms: [...prev.rooms, value] }
        : { ...prev, rooms: prev.rooms.filter((r) => r !== value) }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct({ ...product, image: file });
    setPreview(URL.createObjectURL(file));
  };

  /* ================= VALIDATION ================= */
  const hasEmptyFields = useMemo(() => {
    return (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.description ||
      !product.stock ||
      product.rooms.length === 0
    );
  }, [product]);

  const isUnchanged = useMemo(() => {
    if (!originalProduct) return true;

    return (
      product.name === originalProduct.name &&
      product.price === originalProduct.price &&
      product.category === originalProduct.category &&
      JSON.stringify(product.rooms) ===
        JSON.stringify(originalProduct.rooms) &&
      product.description === originalProduct.description &&
      product.stock === originalProduct.stock &&
      product.image === null
    );
  }, [product, originalProduct]);

  const isSaveDisabled = hasEmptyFields || isUnchanged || loading;

  /* ================= UPDATE PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaveDisabled) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("rooms", JSON.stringify(product.rooms));
      formData.append("description", product.description);
      formData.append("stock", product.stock);

      if (product.image) {
        formData.append("image", product.image);
      }

      const res = await fetch(
        `http://localhost:5000/api/admin/products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Update failed");

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <AdminLayout>
      <div className="edit-product-container">
        <h1>Edit Product</h1>

        {error && <p className="error-text">{error}</p>}

        <form className="edit-product-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* ===== ROOMS ===== */}
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

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="submit" disabled={isSaveDisabled}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
