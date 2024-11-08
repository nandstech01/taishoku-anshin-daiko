// src/components/common/Footer.tsx
'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FooterItemProps {
  label: string
  href?: string
  children?: React.ReactNode
  isExternal?: boolean
}

const FooterItem: React.FC<FooterItemProps> = ({ label, href, children, isExternal }) => {
  const [isOpen, setIsOpen] = useState(false)

  const content = (
    <div className="py-2">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => children && setIsOpen(!isOpen)}
      >
        <span className="flex items-center text-white">
          <ChevronRight size={16} className="mr-2" />
          {label}
        </span>
        {children && (
          <ChevronDown
            size={16}
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </div>
      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-6 mt-2 space-y-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (href) {
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <Link href={href} className="block" {...linkProps}>
        {content}
      </Link>
    )
  }

  return content
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 relative z-[60]">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="text-lg font-bold mb-4">株式会社エヌアンドエス</h3>
            <p className="text-gray-400 text-sm">
              退職あんしん代行サービス
            </p>
          </div>

          {/* サービス */}
          <div>
            <FooterItem label="サービス">
              <FooterItem label="退職代行" href="/" />
              <FooterItem label="会社概要" href="/about" />
              <FooterItem label="よくある質問" href="/faq" />
            </FooterItem>
          </div>

          {/* キャリア支援 */}
          <div>
            <FooterItem label="キャリア支援">
              <FooterItem label="生成AIリスキリング研修" href="#contact-form" />
              <FooterItem label="転職エージェントセレクト" href="#contact-form" />
              <FooterItem label="退職あんしんサポートプロ" href="#contact-form" />
            </FooterItem>
          </div>

          {/* 法的情報とその他 */}
          <div>
            <FooterItem label="法的情報">
              <FooterItem label="利用規約" href="/terms" />
              <FooterItem label="プライバシーポリシー" href="/privacy" />
              <FooterItem label="特定商取引法に基づく表記" href="/legal" />
              <FooterItem label="サイトマップ" href="/sitemap.xml" />
            </FooterItem>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NANDS All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
