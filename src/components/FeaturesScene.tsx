"use client";

import React from "react";

/******************************************************************************
 * Features Scene Placeholder
 * Note: 3D scene temporarily disabled
 ******************************************************************************/
export default function FeaturesSceneWrapper() {
  return (
    <div 
      className="absolute inset-0 -z-10" 
      style={{ 
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,165,0,0.1) 0%, rgba(255,200,0,0.05) 100%)'
      }}
    >
      {/* プレースホルダー：グラデーション背景のみ表示 */}
    </div>
  );
} 