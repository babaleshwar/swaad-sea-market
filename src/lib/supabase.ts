
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okdttfsrfzkvpnkfqcoo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZHR0ZnNyZnprdnBua2ZxY29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MjY2NzAsImV4cCI6MjA2NDIwMjY3MH0.St2bjw14NTtXoNLpt2MXNMrdnJeUIlhOZb-Gc9WS7vI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  description: string
  image_url: string
  price: number
  category: string
  freshness: number
  available: boolean
}

export type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  product?: Product
}

export type Order = {
  id: string
  user_id: string
  items: any[]
  total_price: number
  status: string
  created_at: string
}
