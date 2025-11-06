import React from "react";
import useCartStore from "./store/cartStore";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">⬅ بازگشت به فروشگاه</Link>
      <h2>سبد خرید ({cart.length})</h2>

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
            مجموع قیمت: {totalPrice.toFixed(2)} $
          </div>
          <button
            style={{ marginTop: 10 }}
            onClick={() => {
              if (window.confirm("آیا می‌خواهید سبد خرید خالی شود؟")) {
                clearCart();
              }
            }}
          >
            خالی کردن سبد خرید
          </button>
        </>
      )}
    </div>
  );
}

