import React, { useState } from 'react';
import { motion } from 'framer-motion';


interface BotSelectModalProps {
 onClose: () => void;
 onSelectQuickForm: () => void;  // すぐに退職依頼する
 onSelectConsultation: () => void;  // 相談しながら依頼する
}


export default function BotSelectModal({
 onClose,
 onSelectQuickForm,
 onSelectConsultation
}: BotSelectModalProps) {
 const [showConsultOverlay, setShowConsultOverlay] = useState(false);
 
 const handleConsultClick = () => {
   setShowConsultOverlay(true);
   // ボタンがタップされた時の視覚的なフィードバック
   setTimeout(() => {
     setShowConsultOverlay(false);
   }, 2000); // 2秒後にオーバーレイを消す
 };
 
 return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
     <motion.div
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.9 }}
       transition={{ duration: 0.2 }}
       className="relative w-full max-w-md p-8 mx-4 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.5)_inset] overflow-hidden border border-white/40 ring-2 ring-white/10"
       style={{
         boxShadow: '0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
       }}
     >
       {/* 背景の光沢エフェクト */}
       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>

       {/* 閉じるボタン - 右上に絶対配置 */}
       <button
         onClick={onClose}
         className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:bg-gray-200/50 hover:text-gray-700 transition-all z-10"
         aria-label="閉じる"
       >
         <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-6 w-6"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M6 18L18 6M6 6l12 12"
           />
         </svg>
       </button>

       {/* ヘッダー */}
       <div className="flex justify-start items-center mb-8 relative pt-4 md:pt-0">
         <a 
           href="https://lin.ee/h1kk42r" 
           target="_blank" 
           rel="noopener noreferrer"
           className="text-2xl font-semibold text-gray-800 tracking-tight hover:text-[#06c755] transition-colors flex items-center gap-2"
         >
           <div className="md:whitespace-nowrap">
             <span className="inline md:inline">無料の個別相談は</span>
             <span className="inline md:inline">こちら</span>
           </div>
           <span className="flex items-center justify-center bg-[#06c755] text-white rounded-full w-6 h-6">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
               <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
             </svg>
           </span>
         </a>
       </div>


       {/* メインコンテンツ */}
       <div className="mb-8 relative">
         <p className="mb-6 text-gray-700">
           最短1分でかんたん手続き
         </p>
        
         <div className="space-y-5">
           {/* すぐに退職依頼するボタン - ブルー系グラデーション */}
           <motion.button
             onClick={onSelectQuickForm}
             className="w-full py-5 px-5 flex items-center justify-between bg-gradient-to-br from-indigo-800 via-indigo-700 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10 ring-2 ring-indigo-900/5 hover:ring-white/20 group"
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             <div className="flex items-center">
               <div className="mr-4 p-2.5 bg-white/20 rounded-full group-hover:bg-white/30 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                 </svg>
               </div>
               <div className="text-left">
                 <div className="font-medium text-lg">すぐにかんたん依頼</div>
                 <div className="text-sm text-white/80">簡単な質問に答えるだけで手続き開始</div>
               </div>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
             </svg>
           </motion.button>
          
           {/* 相談しながら依頼するボタン - 緑系グラデーション表示 */}
           <motion.button
             onClick={handleConsultClick}
             className="w-full py-5 px-5 flex items-center justify-between bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10 ring-2 ring-emerald-900/5 hover:ring-white/20 group relative"
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
           >
             <div className="flex items-center">
               <div className="mr-4 p-2.5 bg-white/20 rounded-full group-hover:bg-white/30 transition-all">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <div className="text-left">
                 <div className="font-medium text-lg">相談しながら依頼</div>
                 <div className="text-sm text-white/80">チャットでサポートを受けながら進める</div>
               </div>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
             </svg>
             
             {/* オーバーレイ - クリック後に表示 */}
             {showConsultOverlay && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-[1px]"
               >
                 <div className="px-4 py-2 bg-gray-800/90 text-white font-medium rounded-md shadow-md border border-gray-600">
                   音声相談依頼準備中
                 </div>
               </motion.div>
             )}
           </motion.button>
         </div>
       </div>
      
       {/* フッター - 改行で表示 */}
       <div className="text-sm text-gray-500 text-center font-light">
         お選びいただいた方法は<br />
         いつでも変更いただけます
       </div>
     </motion.div>
   </div>
 );
} 