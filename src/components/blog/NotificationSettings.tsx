'use client';

import React, { useState, useEffect } from 'react';
import type { BlogPost } from '@/types/blog';

interface NotificationSettingsProps {
  post: BlogPost;
}

interface NotificationPreference {
  postId: string;
  newComments: boolean;
  updates: boolean;
  relatedPosts: boolean;
  timestamp: number;
}

const NOTIFICATIONS_KEY = 'blog_notification_preferences';

function getNotificationPreferences(): Record<string, NotificationPreference> {
  try {
    const prefsJson = localStorage.getItem(NOTIFICATIONS_KEY);
    return prefsJson ? JSON.parse(prefsJson) : {};
  } catch (error) {
    console.error('Failed to load notification preferences:', error);
    return {};
  }
}

function saveNotificationPreferences(prefs: Record<string, NotificationPreference>) {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.error('Failed to save notification preferences:', error);
  }
}

export function NotificationSettings({ post }: NotificationSettingsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreference>({
    postId: post.slug,
    newComments: false,
    updates: false,
    relatedPosts: false,
    timestamp: Date.now(),
  });

  useEffect(() => {
    const prefs = getNotificationPreferences();
    if (prefs[post.slug]) {
      setPreferences(prefs[post.slug]);
    }
  }, [post.slug]);

  const handleToggle = (key: keyof NotificationPreference) => {
    if (key === 'postId' || key === 'timestamp') return;

    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
      timestamp: Date.now(),
    };

    setPreferences(newPreferences);

    const allPrefs = getNotificationPreferences();
    allPrefs[post.slug] = newPreferences;
    saveNotificationPreferences(allPrefs);
  };

  const hasEnabledNotifications = preferences.newComments || preferences.updates || preferences.relatedPosts;

  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h3 className="font-medium text-gray-900">
            {hasEnabledNotifications ? '通知設定済み' : '通知を受け取る'}
          </h3>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {showSettings ? '閉じる' : '設定を変更'}
        </button>
      </div>

      {showSettings && (
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.newComments}
              onChange={() => handleToggle('newComments')}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">新しいコメントの通知</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.updates}
              onChange={() => handleToggle('updates')}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">記事の更新通知</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.relatedPosts}
              onChange={() => handleToggle('relatedPosts')}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">関連記事の通知</span>
          </label>
        </div>
      )}

      {hasEnabledNotifications && !showSettings && (
        <p className="mt-2 text-sm text-gray-600">
          この記事に関する更新情報を受け取ります
        </p>
      )}
    </div>
  );
} 