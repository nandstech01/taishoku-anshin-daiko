"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export interface StarRatingProps {
  rating: number
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
        >
          <Star
            className={`w-8 h-8 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 fill-gray-300"}`}
          />
        </motion.div>
      ))}
    </div>
  )
} 