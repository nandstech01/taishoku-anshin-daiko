import React from 'react';

export default function DiagnosisHeader() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#00B900] text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">給付金診断</h1>
          <p className="text-sm">ハローワークでは教えてくれない<br />失業保険の申請方法を丁寧に解説</p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-white text-black py-4 overflow-hidden">
        <div className="alert-scroll-container">
          <div className="alert-scroll-content flex items-center space-x-8">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-red-500 text-xl">⚠️</span>
              <span className="font-bold">12月はご相談が急増します</span>
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center mt-1">
          <p>年内退職をご検討の方は今なら申請可能です</p>
        </div>
      </div>
    </>
  );
} 