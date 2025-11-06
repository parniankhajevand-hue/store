import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product, qty = 1) =>
    set((state) => {
      const exist = state.cart.find((item) => item.id === product.id);
      if (exist) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + qty }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, qty }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, qty) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, qty } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
