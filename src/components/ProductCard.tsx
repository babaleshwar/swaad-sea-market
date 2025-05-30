
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/supabase'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { toast } from '@/hooks/use-toast'
import { Plus, Star } from 'lucide-react'

interface ProductCardProps {
  product: Product
  index: number
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCartStore()
  const { user } = useAuthStore()

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive"
      })
      return
    }

    try {
      await addToCart(user.id, product.id)
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`
      })
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        variant: "destructive"
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <img
            src={`https://images.unsplash.com/${product.image_url}?w=400&h=250&fit=crop`}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-green-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              {product.freshness}/10
            </Badge>
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-blue-600 text-white">
              {product.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ₹{product.price}
            </span>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProductCard
