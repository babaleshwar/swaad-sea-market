
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { Product, CartItem } from '@/lib/supabase'

interface CartState {
  items: CartItem[]
  loading: boolean
  fetchCart: (userId: string) => Promise<void>
  addToCart: (userId: string, productId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: (userId: string) => Promise<void>
  getTotal: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  fetchCart: async (userId) => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('cart')
      .select(`
        id,
        user_id,
        product_id,
        quantity,
        products(*)
      `)
      .eq('user_id', userId)
    
    if (!error && data) {
      const cartItems = data.map(item => ({
        ...item,
        product: Array.isArray(item.products) ? item.products[0] : item.products
      })) as CartItem[]
      set({ items: cartItems })
    }
    set({ loading: false })
  },
  addToCart: async (userId, productId) => {
    const { data: existingItem } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (existingItem) {
      await get().updateQuantity(existingItem.id, existingItem.quantity + 1)
    } else {
      const { data, error } = await supabase
        .from('cart')
        .insert({ user_id: userId, product_id: productId, quantity: 1 })
        .select(`
          id,
          user_id,
          product_id,
          quantity,
          products(*)
        `)
        .single()

      if (!error && data) {
        const cartItem = {
          ...data,
          product: Array.isArray(data.products) ? data.products[0] : data.products
        } as CartItem
        set((state) => ({ items: [...state.items, cartItem] }))
      }
    }
  },
  updateQuantity: async (itemId, quantity) => {
    if (quantity <= 0) {
      await get().removeFromCart(itemId)
      return
    }

    const { error } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('id', itemId)

    if (!error) {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      }))
    }
  },
  removeFromCart: async (itemId) => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', itemId)

    if (!error) {
      set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
      }))
    }
  },
  clearCart: async (userId) => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId)

    if (!error) {
      set({ items: [] })
    }
  },
  getTotal: () => {
    const { items } = get()
    return items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity
    }, 0)
  },
}))
