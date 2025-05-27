'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const orbs = [
    {
      id: 1,
      size: 500,
      color: 'bg-gradient-to-br from-blue-400/25 to-purple-500/20',
      delay: 0,
      speed: 0.02
    },
    {
      id: 2,
      size: 400,
      color: 'bg-gradient-to-tr from-purple-400/20 to-pink-400/18',
      delay: 0.3,
      speed: 0.025
    },
    {
      id: 3,
      size: 600,
      color: 'bg-gradient-to-bl from-blue-300/15 to-indigo-400/12',
      delay: 0.6,
      speed: 0.018
    },
    {
      id: 4,
      size: 350,
      color: 'bg-gradient-to-tl from-orange-300/18 to-yellow-400/15',
      delay: 0.9,
      speed: 0.03
    },
    {
      id: 5,
      size: 450,
      color: 'bg-gradient-to-r from-emerald-300/16 to-teal-400/14',
      delay: 1.2,
      speed: 0.022
    },
    {
      id: 6,
      size: 300,
      color: 'bg-gradient-to-br from-rose-300/17 to-orange-400/15',
      delay: 1.5,
      speed: 0.028
    }
  ]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Animated floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: mousePosition.x * orb.speed - orb.size / 2,
            y: mousePosition.y * orb.speed - orb.size / 2,
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 50,
            delay: orb.delay
          }}
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth - orb.size / 2 : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight - orb.size / 2 : 0,
          }}
        />
      ))}

      
    </div>
  )
} 