
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, Product } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import OceanBackground from '@/components/OceanBackground'
import { Search, Filter } from 'lucide-react'

const categories = ['All', 'Fish', 'Crabs', 'Prawns', 'Lobsters', 'Combos']

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()
  const { fetchCart } = useCartStore()

  useEffect(() => {
    fetchProducts()
    if (user) {
      fetchCart(user.id)
    }
  }, [user])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen relative">
      <OceanBackground />
      
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {user ? `Welcome back!` : 'Fresh Seafood'}
            </h1>
            <p className="text-xl text-blue-100">
              Dive into our ocean of fresh catches
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search seafood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 backdrop-blur-sm border-blue-200"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.div key={category} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                        : 'bg-white/80 hover:bg-white text-gray-700 border-blue-200'
                    }`}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white/80 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-white/80 text-lg">
                No seafood found matching your criteria.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
