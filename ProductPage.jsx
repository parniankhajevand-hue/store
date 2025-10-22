import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "./store/cartStore";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!product) return <p>محصول پیدا نشد</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">⬅ بازگشت به فروشگاه</Link>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ height: 200 }} />
      <p>{product.description}</p>
      <p>💵 قیمت: {product.price} $</p>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
        <span>{qty}</span>
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      <button
        style={{ marginTop: 10 }}
        onClick={() => addToCart(product, qty)}
      >
        افزودن {qty} عدد به سبد خرید
      </button>
    </div>
  );
}
