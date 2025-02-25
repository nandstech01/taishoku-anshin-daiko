import { createServerClient } from '@/lib/supabase/server';
import { google } from 'googleapis';

interface PerformanceMetrics {
  url: string;
  lcp: number;
  timestamp: string;
  device: 'mobile' | 'desktop';
  status: 'good' | 'needs-improvement' | 'poor';
}

interface PerformanceIssue {
  url: string;
  metric: string;
  value: number;
  threshold: number;
  device: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

interface APIError {
  response?: {
    status: number;
  };
}

export class PerformanceMonitor {
  public pagespeed = google.pagespeedonline('v5');
  public supabase = createServerClient();

  // LCPのしきい値（ミリ秒）
  private readonly LCP_THRESHOLDS = {
    GOOD: 2500,
    NEEDS_IMPROVEMENT: 4000
  };

  // リトライ設定
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // ミリ秒

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    retries: number = this.MAX_RETRIES
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries === 0) throw error;
      
      await this.sleep(this.RETRY_DELAY * (this.MAX_RETRIES - retries + 1));
      return this.retryWithBackoff(operation, retries - 1);
    }
  }

  async monitorUrl(path: string, device: 'mobile' | 'desktop' = 'mobile'): Promise<PerformanceMetrics> {
    try {
      // 完全なURLを構築
      const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;

      const response = await this.retryWithBackoff(async () => {
        try {
          const result = await this.pagespeed.pagespeedapi.runpagespeed({
            url: fullUrl,
            strategy: device,
            category: ['PERFORMANCE'],
          });
          return result;
        } catch (error) {
          const apiError = error as APIError;
          if (apiError.response?.status === 429) {
            // レート制限エラーの場合は長めに待機
            await this.sleep(5000);
          }
          throw error;
        }
      });

      const metrics = response.data.lighthouseResult?.audits || {};
      const lcp = metrics['largest-contentful-paint']?.numericValue || 0;

      const result: PerformanceMetrics = {
        url: path,
        lcp,
        device,
        timestamp: new Date().toISOString(),
        status: this.getLCPStatus(lcp)
      };

      // 結果をデータベースに保存
      await this.saveMetrics(result).catch(error => {
        console.error('Error saving metrics:', error);
      });

      // 問題がある場合は即座に通知
      if (result.status === 'poor') {
        await this.reportIssue({
          url: path,
          metric: 'LCP',
          value: lcp,
          threshold: this.LCP_THRESHOLDS.NEEDS_IMPROVEMENT,
          device,
          timestamp: result.timestamp,
          priority: 'high'
        }).catch(error => {
          console.error('Error reporting issue:', error);
        });
      }

      return result;
    } catch (error) {
      console.error(`Error monitoring URL ${path}:`, error);
      const errorResult: PerformanceMetrics & { error: string } = {
        url: path,
        lcp: 0,
        device,
        timestamp: new Date().toISOString(),
        status: 'poor',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
      return errorResult;
    }
  }

  private getLCPStatus(lcp: number): PerformanceMetrics['status'] {
    if (lcp <= this.LCP_THRESHOLDS.GOOD) return 'good';
    if (lcp <= this.LCP_THRESHOLDS.NEEDS_IMPROVEMENT) return 'needs-improvement';
    return 'poor';
  }

  private async saveMetrics(metrics: PerformanceMetrics): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('performance_metrics')
        .insert([{
          url: metrics.url,
          lcp: metrics.lcp,
          device: metrics.device,
          status: metrics.status,
          timestamp: metrics.timestamp
        }]);

      if (error) {
        console.error('Database error while saving metrics:', error);
        return;
      }
    } catch (error) {
      console.error('Error saving metrics:', error);
    }
  }

  private async reportIssue(issue: PerformanceIssue): Promise<void> {
    try {
      const { error: dbError } = await this.supabase
        .from('performance_issues')
        .insert([{
          url: issue.url,
          metric: issue.metric,
          value: issue.value,
          threshold: issue.threshold,
          device: issue.device,
          timestamp: issue.timestamp,
          priority: issue.priority
        }]);

      if (dbError) {
        console.error('Database error while reporting issue:', dbError);
        return;
      }

      await this.notifyIssue(issue);
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
  }

  private async notifyIssue(issue: PerformanceIssue): Promise<void> {
    try {
      const response = await fetch('/api/notify/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.ADMIN_EMAIL || 'contact@nands.tech',
          subject: `🚨 Performance Issue: ${issue.metric} on ${issue.url}`,
          text: `
Performance Issue Detected:
URL: ${issue.url}
Metric: ${issue.metric}
Value: ${issue.value}ms
Threshold: ${issue.threshold}ms
Device: ${issue.device}
Time: ${new Date(issue.timestamp).toLocaleString('ja-JP')}

このメールは自動送信されています。
          `.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send notification email');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
} 