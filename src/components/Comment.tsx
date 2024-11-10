'use client';

import React from 'react';
import { motion } from "framer-motion";

interface CommentProps {
    text: string;
    duration: number;
    top: number;
}

const Comment = ({ text, duration, top }: CommentProps) => {
    return (
        <motion.div
            initial={{ 
                x: '100vw', 
                y: top,
                opacity: 0,
                scale: 0,
                rotate: 0,
                filter: 'blur(0px)'
            }}
            animate={{ 
                x: '-100vw',
                y: [top - 20, top + 20, top - 10],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: [0, 0, 0, 0],
                filter: ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
            }}
            transition={{
                duration: duration,
                ease: [0.45, 0, 0.55, 1],
                times: [0, 0.1, 0.9, 1],
                y: {
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            style={{
                position: 'absolute',
                top: `${top}%`,
                left: '50%',
                whiteSpace: 'nowrap',
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 500,
                zIndex: 10,
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                willChange: 'transform',
            }}
        >
            {text}
        </motion.div>
    );
};

export default Comment; 