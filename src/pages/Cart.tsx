
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import OceanBackground from '@/components/OceanBackground'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotal, fetchCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetchCart(user.id)
    }
  }, [user])

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      await updateQuantity(itemId, newQuantity)
    } catch (error) {
      toast({
        title: "Failed to update quantity",
        variant: "destructive"
      })
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      toast({
        title: "Item removed from cart"
      })
    } catch (error) {
      toast({
        title: "Failed to remove item",
        variant: "destructive"
      })
    }
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some items before checking out",
        variant: "destructive"
      })
      return
    }
    navigate('/order')
  }

  const total = getTotal()

  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <OceanBackground />
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please login to view your cart</h2>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <OceanBackground />
      
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Your Cart</h1>
            <p className="text-blue-100">Review your fresh seafood selection</p>
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <ShoppingBag className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-blue-100 mb-8">Add some fresh seafood to get started!</p>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                Browse Seafood
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`https://images.unsplash.com/${item.product?.image_url}?w=120&h=120&fit=crop`}
                            alt={item.product?.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              {item.product?.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {item.product?.description}
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              ₹{item.product?.price}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center text-2xl font-bold mb-6">
                      <span>Total:</span>
                      <span className="text-blue-600">₹{total.toFixed(2)}</span>
                    </div>
                    
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 text-lg"
                      >
                        Proceed to Checkout
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
