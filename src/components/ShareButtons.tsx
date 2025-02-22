"use client";

import React from "react";
import { ShareButtonsProps } from "@/types/diagnosis";

const shareUrls = {
  twitter: (url: string, text: string) =>
    `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  line: (url: string, text: string) =>
    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
};

export default function ShareButtons({ shareLink, text }: ShareButtonsProps) {
  const handleShare = (platform: keyof typeof shareUrls) => {
    const url = platform === "facebook"
      ? shareUrls[platform](shareLink)
      : shareUrls[platform](shareLink, text);
    window.open(url, "_blank");
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handleShare("twitter")}
        className="px-4 py-2 bg-blue-400 text-white rounded"
      >
        Twitter
      </button>
      <button
        onClick={() => handleShare("facebook")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Facebook
      </button>
      <button
        onClick={() => handleShare("line")}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        LINE
      </button>
    </div>
  );
} 