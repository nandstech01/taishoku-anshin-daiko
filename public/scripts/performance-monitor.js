// Webパフォーマンスを監視するスクリプト - 最適化版
(function() {
  // デバッグモードではスキップ
  if (window.location.hostname === 'localhost' && !window.location.search.includes('perf=1')) {
    return;
  }

  // ブラウザがPerformance APIをサポートしているか確認
  if (!window.performance || !window.PerformanceObserver) {
    console.warn('Performance APIs not supported in this browser');
    return;
  }

  // メトリクス値を保存する変数
  let lcpValue = 0;
  let fidValue = 0;
  let clsValue = 0;
  let ttfbValue = 0;
  let fcpValue = 0;
  let clsEntries = [];
  let metricsCollected = false;
  let observers = [];

  // データを送信する関数 - バックグラウンドで実行
  function sendPerformanceMetrics() {
    // すでに送信済みなら何もしない
    if (metricsCollected) return;
    metricsCollected = true;

    // 優先度の低いタスクとして実行
    setTimeout(() => {
      try {
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry) {
          ttfbValue = navEntry.responseStart;
        }
    
        // メトリクスを収集
        const metrics = {
          url: window.location.pathname,
          metrics: {
            fcp: fcpValue,
            lcp: lcpValue,
            fid: fidValue,
            cls: clsValue,
            ttfb: ttfbValue
          },
          timestamp: new Date().toISOString(),
          isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        };
    
        // データを送信（失敗しても静かに処理）
        // sendBeaconを使用（ブラウザがサポートしている場合）
        // これにより、ページを離れる際にもデータ送信が完了する
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(metrics)], { 
            type: 'application/json' 
          });
          
          navigator.sendBeacon('/api/monitor/performance', blob);
        } else {
          // フォールバック
          fetch('/api/monitor/performance', {
            method: 'POST',
            keepalive: true, // ページを離れても処理を継続
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(metrics)
          }).catch(() => {});
        }
        
        // 全てのオブザーバーを切断してメモリリークを防止
        disconnectAllObservers();
      } catch (err) {
        // 静かに失敗 - ユーザー体験を妨げない
      }
    }, 0);
  }
  
  // 全てのオブザーバーを切断する関数
  function disconnectAllObservers() {
    observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (e) {}
    });
    observers = [];
  }

  // パフォーマンスの測定は優先度を下げて実行
  // 各メトリクスのオブザーバーは一度だけ作成
  function initObservers() {
    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcpValue = lastEntry.startTime;
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      observers.push(lcpObserver);
    } catch (e) {}

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
          // 最初の入力遅延のみを測定
          if (!fidValue) {
            fidValue = entry.processingStart - entry.startTime;
          }
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      observers.push(fidObserver);
    } catch (e) {}

    // CLS (Cumulative Layout Shift)
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          // ユーザー入力から500ms以内のレイアウトシフトは無視
          if (!entry.hadRecentInput) {
            clsEntries.push(entry);
            // CLS値を計算
            clsValue = clsEntries.reduce((sum, entry) => sum + entry.value, 0);
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      observers.push(clsObserver);
    } catch (e) {}

    // FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            fcpValue = entry.startTime;
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      observers.push(fcpObserver);
    } catch (e) {}
  }

  // メインスレッドをブロックしないようにするための関数
  function scheduleTask(callback) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout: 2000 });
    } else {
      setTimeout(callback, 1);
    }
  }

  // ページが完全に読み込まれた後にデータを収集
  // ただし、メインコンテンツの表示に干渉しないよう遅延
  if (document.readyState === 'complete') {
    // すでにロード済み - 遅延実行
    scheduleTask(() => {
      initObservers();
      // メトリクス収集のための十分な遅延
      setTimeout(sendPerformanceMetrics, 3000);
    });
  } else {
    // ページロード後に実行
    window.addEventListener('load', function() {
      scheduleTask(() => {
        initObservers();
        // メトリクス収集のための十分な遅延
        setTimeout(sendPerformanceMetrics, 3000);
      });
    });
  }

  // ページがアンロードされる前に最終的なメトリクスを送信
  // visibilitychangeイベントはbeforeunloadより信頼性が高い
  window.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && !metricsCollected) {
      sendPerformanceMetrics();
    }
  });
  
  // 10秒後に強制的にデータを送信（フォールバック）
  setTimeout(sendPerformanceMetrics, 10000);
})(); 