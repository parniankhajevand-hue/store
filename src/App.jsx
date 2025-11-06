/*{/*import React, { useState } from "react"; // ← این را اضافه کن
import { Routes, Route } from "react-router-dom"; // ← برای استفاده از <Routes> و <Route>

import HomePage from "./HomePage.jsx"; // ← اگر صفحه اصلی داری، حتماً ایمپورتش کن
import ProductPage from "./ProductPage.jsx";
import CartPage from "./CartPage.jsx";
import CartButton from "./CartButton.jsx";
import useCartStore from "./store/cartStore.js";
import AdminPage from "./Admin/adminPage.jsx";
import AdminLogin from "./Admin/adminLogin.jsx";

import "./index.css";

export default function App() {
  const cart = useCartStore((state) => state.cart);
  const [isAdmin, setIsAdmin] = useState(false); // وضعیت لاگین ادمین

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>🛍 فروشگاه</h1>

      {/* دکمه سبد خرید {*/
     /* <div style={{ marginBottom: 20 }}>
        <CartButton cart={cart} />
      </div>
*/
    /* مسیرهای صفحات {*/
      /*<Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

      {/* مسیر ورود به پنل ادمین }*/
       /* <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminPage />
            ) : (
              <AdminLogin setIsAdmin={setIsAdmin} /> // ← اینجا پراپ اضافه شد
            )
          }
        />
      </Routes>
    </div>
  );
}*/
// App.jsx
/*import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// صفحات اصلی
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage.jsx";

// کامپوننت‌ها و استورها
import CartButton from "./CartButton.jsx";
import CartStore from "./store/CartStore.js";

// صفحات ادمین
import AdminPage from "./Admin/AdminPage.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";

// استایل‌ها
import "./index.css";

export default function App() {
  // وضعیت ورود ادمین
  const [isAdmin, setIsAdmin] = useState(false);

  return (
  <Router>
    <div>
      <CartButton />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />*/

        /* مسیر محصول تکی */
        /*<Route path="/product/:id" element={<ProductPage />} />

        <Route path="/cart" element={<CartPage />} />

        {!isAdmin && (
          <Route
            path="/admin-login"
            element={<AdminLogin setIsAdmin={setIsAdmin} />}
          />
        )}
        {isAdmin && <Route path="/admin" element={<AdminPage />} />}
      </Routes>
    </div>
  </Router>
);*/
/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./HomePage.jsx";
import ProductPage from "./ProductPage.jsx";
//import CartPage from "./CartPage.jsx";
import CartButton from "./CartButton.jsx";
//import AdminLogin from "./Admin/AdminLogin.jsx";
//import AdminPage from "./Admin/AdminPage.jsx";
//import useCartStore from "./store/cartStore.js";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const cart = useCartStore((state) => state.cart);

  return (
    <Router>
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <h1>🛍 فروشگاه</h1>

        <div style={{ marginBottom: 20 }}>
          <CartButton cart={cart} />
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          {!isAdmin && (
            <Route
              path="/admin-login"
              element={<AdminLogin setIsAdmin={setIsAdmin} />}
            />
          )}
          {isAdmin && <Route path="/admin" element={<AdminPage />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;*/

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "./store/CartStore.js";
import "./index.css";
import "./app.css";


export default function App() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setProduct(null);
          setLoading(false);
        });
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => {
          setProducts([]);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="center">در حال بارگذاری...</p>;

  if (id) {
    if (!product) return <p className="center error">محصول پیدا نشد</p>;

    return (
      <div className="main">
        <Link to="/products">⬅ بازگشت به محصولات</Link>

        <h2>{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="card-img"
          style={{ height: 200, objectFit: "contain" }}
        />
        <p>{product.description}</p>
        <p className="card-price">💵 قیمت: {product.price} $</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        <button className="addButton" onClick={() => addToCart(product, qty)}>
          افزودن {qty} عدد به سبد خرید
        </button>
      </div>
    );
  }

  return (
    <div className="main">
      <h2>لیست محصولات</h2>
      <div className="grid">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
            <div className="card">
              <img src={p.image} alt={p.title} className="card-img" />
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-category">{p.category}</p>
                <p className="card-price">{p.price} $</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
