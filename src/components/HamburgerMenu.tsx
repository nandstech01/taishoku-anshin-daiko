import React, { useState } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        aria-label="メニューを開く"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="menu"
        unmountOnExit
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-full bg-black">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-white p-2"
              aria-label="メニューを閉じる"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6">
              <div className="text-white text-2xl font-bold">
                -NANDS-
                <br />
                生成AIリスキング研修
              </div>

              <nav className="mt-8 space-y-8">
                <div className="space-y-4">
                  {[
                    'コースの特徴',
                    '受講生の声',
                    '選ばれる理由',
                    'プラン・料金',
                    '受講までの流れ'
                  ].map((item) => (
                    <Link 
                      key={item} 
                      href={`#${item}`} 
                      className="block text-white text-lg font-semibold"
                      onClick={toggleMenu} // ここでメニューを閉じる
                    >
                      - {item}
                    </Link>
                  ))}
                </div>

                <div className="py-4 border-y border-white/30">
                  <div className="space-y-4">
                    <div className="text-white text-xl font-bold">Top</div>
                    <div className="text-white text-xl font-bold">コース紹介</div>
                    <div className="pl-4 space-y-2">
                      {[
                        '基礎コース',
                        '応用コース',
                        'エキスパートコース'
                      ].map((course) => (
                        <div key={course} className="text-white">
                          {course}
                        </div>
                      ))}
                    </div>
                    {[
                      '無料相談',
                      'コース申し込み',
                      'よくある質問・お問い合わせ',
                      '法人パートナー ログイン ＞'
                    ].map((link) => (
                      <Link
                        key={link}
                        href="#"
                        className="block text-white text-lg hover:opacity-80"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href="#"
                    className="text-white text-xl font-bold hover:opacity-80"
                  >
                    NAND.TECH ▢
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default HamburgerMenu;