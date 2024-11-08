import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    highlight?: string;
    size?: 'normal' | 'large';
}

export default function FeatureCard({ icon, title, description, highlight, size = 'normal' }: FeatureCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
            className={`bg-white rounded-xl ${size === 'large' ? 'p-8' : 'p-6'} shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden`}
        >
            {highlight && (
                <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        {highlight}
                    </span>
                </div>
            )}
            <div className={`mb-5 bg-orange-50 ${size === 'large' ? 'p-4' : 'p-3'} rounded-full`}>
                {icon}
            </div>
            <h4 className={`${size === 'large' ? 'text-xl' : 'text-lg'} font-bold mb-3 text-gray-800`}>{title}</h4>
            {description && (
                <p className="text-gray-700 text-base leading-relaxed">{description}</p>
            )}
        </motion.div>
    );
} 