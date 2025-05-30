
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import OceanBackground from '@/components/OceanBackground'
import { ArrowRight, Fish, Waves } from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title with Wave Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(56, 189, 248, 0.5)",
                  "0 0 30px rgba(56, 189, 248, 0.8)",
                  "0 0 20px rgba(56, 189, 248, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Samudra
            </motion.h1>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-cyan-300"
              animate={{ 
                scale: [1, 1.05, 1],
                color: ["#67e8f9", "#22d3ee", "#67e8f9"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Swaad
            </motion.h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Dive into the freshest seafood delivered straight from the ocean to your doorstep
          </motion.p>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center space-x-8 mb-12"
          >
            {[Fish, Waves, Fish].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity
                }}
                className="text-cyan-400"
              >
                <Icon size={48} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg"
                >
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-blue-900 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  Explore Menu
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Floating Animation Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Landing
