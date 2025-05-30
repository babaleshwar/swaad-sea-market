import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import OceanBackground from '@/components/OceanBackground'
import { toast } from '@/hooks/use-toast'
import { MapPin, Phone, Clock } from 'lucide-react'

const Order = () => {
  const [loading, setLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  })
  
  const { items, getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleInputChange = (field: string, value: string) => {
    setOrderDetails(prev => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Please login to place an order",
        variant: "destructive"
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      const orderData = {
        user_id: user.id,
        items: items.map(item => ({
          product_id: item.product_id,
          product_name: item.product?.name,
          quantity: item.quantity,
          price: item.product?.price
        })),
        total_price: getTotal(),
        status: 'placed',
        delivery_details: orderDetails
      }

      const { error } = await supabase
        .from('orders')
        .insert(orderData)

      if (error) throw error

      await clearCart(user.id)

      toast({
        title: "Order placed successfully! 🎉",
        description: "Your fresh seafood will be delivered soon!"
      })

      navigate('/dashboard')
    } catch (error) {
      console.error('Error placing order:', error)
      toast({
        title: "Failed to place order",
        description: "Please try again",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const total = getTotal()

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
            <h1 className="text-4xl font-bold text-white mb-2">Complete Your Order</h1>
            <p className="text-blue-100">Just a few more details to get your seafood delivered!</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-500" />
                    Delivery Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={orderDetails.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={orderDetails.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={orderDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Your complete address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={orderDetails.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Your city"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={orderDetails.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Your pincode"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={orderDetails.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any special delivery instructions"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product?.name}</h4>
                          <p className="text-sm text-gray-600">
                            ₹{item.product?.price} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    
                    <hr className="my-4" />
                    
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Estimated Delivery: 45-60 minutes</span>
                  </div>
                </CardContent>
              </Card>

              <motion.div
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading || items.length === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 text-lg"
                >
                  {loading ? "Placing Order..." : `Place Order - ₹${total.toFixed(2)}`}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
