import React, { useEffect, useState } from "react";
import useCartStore from "./store/cartStore";
import { Link } from "react-router-dom";


const API = "https://fakestoreapi.com/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoading(true);
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت محصولات");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>فروشگاه</h1>

      <input
        type="text"
        placeholder="جستجو"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: 250, marginBottom: 20 }}
      />

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: 20 }}>
        {/* محصولات */}
        <div style={{ flex: 1 }}>
          <h2>محصولات</h2>
          {filteredProducts.length === 0 && <p>محصولی یافت نشد</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredProducts.map((p) => (
              <li
                key={p.id}
                style={{
                  display: "flex",
                  gap: 10,
                  borderBottom: "1px solid #ccc",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: 60, height: 60, objectFit: "contain" }}
                />
                <div style={{ flex: 1 }}>
                  {/*<h4 style={{ margin: 0 }}>{p.title}</h4>*/}
                  <h4 style={{ margin: 0 }}>
  <Link to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
    {p.title}
  </Link>
</h4>

                  <p style={{ margin: 0, color: "#555" }}>{p.category}</p>
                </div>
                <div style={{ width: 70, textAlign: "right" }}>{p.price} $</div>
                <button onClick={() => addToCart(p)}>افزودن</button>
              </li>
            ))}
          </ul>
        </div>

        {/* سبد خرید */}
        <div style={{ width: 350, border: "1px solid #ddd", padding: 15 }}>
          <h2>سبد خرید({cart.length})</h2>
          {cart.length === 0 ? (
            <p>سبد خرید خالی است</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                    borderBottom: "1px dashed #ccc",
                    paddingBottom: 8,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong>{item.title}</strong> <br />
                    <small>
                      قیمت: {item.price} $ — تعداد:{" "}
                      <input
                        type="number"
                        value={item.qty}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        style={{ width: 50 }}
                      />
                    </small>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>حذف</button>
                </div>
              ))}
              <div style={{ marginTop: 15, fontWeight: "bold" }}>
                 مجموع قیمت: {totalPrice.toFixed(2)} 
              </div>
              <button
                style={{ marginTop: 10 }}
                onClick={() => {
                  if (window.confirm("آیا میخوای سبد خرید خالی شود؟")) {
                    clearCart();
                  }
                }}
              >
               خالی کردن سبد خرید
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


