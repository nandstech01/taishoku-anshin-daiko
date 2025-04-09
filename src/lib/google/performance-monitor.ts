// 一時的なスタブ実装
export class PerformanceMonitor {
  async monitorUrl(url: string, device: 'mobile' | 'desktop') {
    return {
      lcp: 0,
      status: 'good' as const,
      device,
      timestamp: new Date().toISOString()
    };
  }
} 