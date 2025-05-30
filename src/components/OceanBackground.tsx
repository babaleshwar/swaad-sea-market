
import { motion } from 'framer-motion'

const OceanBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Ocean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900" />
      
      {/* Animated waves */}
      <svg
        className="absolute bottom-0 w-full h-64"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z"
          fill="rgba(59, 130, 246, 0.3)"
          animate={{
            d: [
              "M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z",
              "M0,40 C200,60 400,80 600,40 C800,60 1000,80 1200,40 L1200,120 L0,120 Z",
              "M0,60 C200,80 400,40 600,60 C800,80 1000,40 1200,60 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
        <motion.path
          d="M0,80 C200,60 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z"
          fill="rgba(59, 130, 246, 0.5)"
          animate={{
            d: [
              "M0,80 C200,60 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z",
              "M0,100 C200,80 400,60 600,100 C800,80 1000,60 1200,100 L1200,120 L0,120 Z",
              "M0,80 C200,60 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </svg>

      {/* Floating bubbles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0.3, 0.7, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  )
}

export default OceanBackground
