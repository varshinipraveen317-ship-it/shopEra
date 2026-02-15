// src/data/productsData.js

// image imports
import prod1 from "../assets/exclusive1.jpg";
import prod2 from "../assets/exclusive2.jpg";
import prod3 from "../assets/exclusive3.jpg";
import prod4 from "../assets/exclusive4.jpg";

const productsData = [
  {
    id: 1,
    name: "Luxury Sofa Set",
    price: 29999,
    category: "furniture",
    room: "living",
    image: prod1,
    description: "A premium luxury sofa designed for comfort and elegance.",
  },
  {
    id: 2,
    name: "Modern Table Lamp",
    price: 6499,
    category: "lighting",
    room: "bedroom",
    image: prod2,
    description: "Minimalist lamp that adds warmth to your bedroom.",
  },
  {
    id: 3,
    name: "Designer Wall Mirror",
    price: 8299,
    category: "mirrors",
    room: "living",
    image: prod3,
    description: "Stylish mirror that enhances modern interiors.",
  },
  {
    id: 4,
    name: "Premium Rug Collection",
    price: 12999,
    category: "rugs",
    room: "dining",
    image: prod4,
    description: "Soft premium rugs for a luxurious dining experience.",
  },
];

export default productsData;
