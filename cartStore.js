import { create } from "zustand"; // ✅ درست


const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const useCartStore = create((set, get) => ({
  cart: getInitialCart(),

  //addToCart: (product) => {
    //const cart = get().cart;
    //const existing = cart.find((item) => item.id === product.id);
    //let newCart;
    //if (existing) {
      //newCart = cart.map((item) =>
        //item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      //);
    //} else {
      //newCart = [...cart, { ...product, qty: 1 }];
    //}
    //set({ cart: newCart });
    //localStorage.setItem("cart", JSON.stringify(newCart));
  //},

  //addToCart: (product, quantity = 1) => {
  //const cart = get().cart;
  //const existing = cart.find((item) => item.id === product.id);
  //let newCart;
  //if (existing) {
    //newCart = cart.map((item) =>
      //item.id === product.id ? { ...item, qty: item.qty + quantity } : item
    //);
  //} else {
  //  newCart = [...cart, { ...product, qty: quantity }];
  //}
  //set({ cart: newCart });
  //localStorage.setItem("cart", JSON.stringify(newCart));
//},

addToCart: (product, quantity = 1) => {
  if (!product || !product.id) return;  // اگر product یا product.id تعریف نشده بود، خروج
  
  const cart = get().cart || [];
  const existing = cart.find((item) => item.id === product.id);
  let newCart;

  if (existing) {
    newCart = cart.map((item) =>
      item.id === product.id ? { ...item, qty: (item.qty || 0) + quantity } : item
    );
  } else {
    newCart = [...cart, { ...product, qty: quantity }];
  }
  
  set({ cart: newCart });
  localStorage.setItem("cart", JSON.stringify(newCart));
},


  
  

  removeFromCart: (productId) => {
    const cart = get().cart;
    const newCart = cart.filter((item) => item.id !== productId);
    set({ cart: newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
  },

  updateQuantity: (productId, qty) => {
    if (qty < 1) return;
    const cart = get().cart;
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, qty } : item
    );
    set({ cart: newCart });
    localStorage.setItem("cart", JSON.stringify(newCart));
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart");
  },
}));

export default useCartStore;
