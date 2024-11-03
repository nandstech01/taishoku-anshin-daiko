import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function FixedButtons() {
  const { ref: footerRef, inView: isFooterVisible } = useInView(); // フッターの表示状態を監視
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(!isFooterVisible); // フッターが見えるときにボタンを非表示
  }, [isFooterVisible]);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-50">
          <div className="flex flex-row gap-4 p-4 bg-black bg-opacity-80 rounded-lg">
          <button 
  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-6 rounded-md w-40 shadow-md"
  style={{
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '0.05em',
    transition: 'background-color 0.3s ease-in-out',
  }}
>
  無料相談で<br />10大特典GET
</button>
            <button 
              className="bg-[#ff3131] hover:bg-[#e62c2c] text-white font-bold py-3 px-6 rounded-md w-40 shadow-md"
              style={{
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '0.05em',
                transition: 'background-color 0.3s ease-in-out',
              }}
            >
              コースに<br />申し込む
            </button>
          </div>
        </div>
      )}
      {/* フッターの監視用ダミー要素 */}
      <div ref={footerRef} className="h-1"></div> 
    </>
  );
}
