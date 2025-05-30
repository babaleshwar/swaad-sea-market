
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Fish, ShoppingCart, User, LogOut } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const Navbar = () => {
  const { user, signOut } = useAuthStore()
  const { items } = useCartStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed out successfully",
        description: "Come back soon for fresh seafood!"
      })
      navigate('/')
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive"
      })
    }
  }

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md border-b border-blue-700/50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <Fish className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
          >
            Samudra Swaad
          </motion.h1>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-blue-800">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" className="text-white hover:bg-blue-800">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="text-white hover:bg-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-blue-800">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
