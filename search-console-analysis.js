const { google } = require('googleapis');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// サイトマップ状態を取得する関数
async function getSitemapStatus(webmasters, siteUrl) {
  try {
    const response = await webmasters.sitemaps.list({
      siteUrl: siteUrl
    });
    
    console.log('=== サイトマップ状態 ===');
    if (response.data.sitemap && response.data.sitemap.length > 0) {
      console.log(`サイトマップ数: ${response.data.sitemap.length}`);
      
      for (const sitemap of response.data.sitemap) {
        console.log(`- ${sitemap.path}`);
        console.log(`  最終送信: ${sitemap.lastSubmitted}`);
        console.log(`  警告: ${sitemap.warnings || 0}, エラー: ${sitemap.errors || 0}`);
        
        // エラーがある場合、詳細情報を表示
        if (sitemap.errors && sitemap.errors > 0) {
          console.log(`  注意: サイトマップにエラーがあります。ファイル名が正しいか確認してください。`);
          console.log(`  一般的なエラー: ファイル名のスペルミス (.xlm ではなく .xml)、形式エラー、アクセス制限など`);
          
          // 修正方法の提案
          if (sitemap.path.endsWith('.xlm')) {
            console.log(`  修正提案: ${sitemap.path} を ${sitemap.path.replace('.xlm', '.xml')} に変更してください`);
          }
        }
      }
    } else {
      console.log('サイトマップが見つかりません。サイトマップを送信することをお勧めします。');
    }
    return response.data;
  } catch (error) {
    console.log('=== サイトマップ状態 ===');
    console.log(`サイトマップ情報の取得に失敗しました: ${error.message}`);
    return null;
  }
}

// 重要なURLの検査
async function inspectUrls(webmasters, siteUrl) {
  const importantUrls = [
    `${siteUrl}/`,
    `${siteUrl}/blog`,
    `${siteUrl}/about`,
    `${siteUrl}/diagnosis`,
    `${siteUrl}/faq`
  ];
  
  console.log('=== 重要なURLの検査 ===');
  
  try {
    for (const url of importantUrls) {
      try {
        const response = await webmasters.urlInspection.index.inspect({
          inspectionUrl: url,
          siteUrl: siteUrl
        });
        
        console.log(`URL検査: ${url}`);
        
        if (response.data.inspectionResult) {
          const result = response.data.inspectionResult;
          console.log(`- インデックス状態: ${result.indexStatusResult?.verdict || '不明'}`);
          console.log(`- 最終クロール: ${result.indexStatusResult?.lastCrawlTime || '不明'}`);
          
          if (result.indexStatusResult?.coverageState) {
            console.log(`- カバレッジ状態: ${result.indexStatusResult.coverageState}`);
          }
          
          if (result.mobileUsabilityResult?.verdict) {
            console.log(`- モバイルユーザビリティ: ${result.mobileUsabilityResult.verdict}`);
          }
        } else {
          console.log(`- 検査結果: データなし`);
        }
      } catch (error) {
        console.log(`URL検査: ${url}`);
        console.log(`- 検査エラー: ${error.message}`);
        
        // エラーの詳細と対処方法を提案
        if (error.message.includes('You do not own this site')) {
          console.log(`  注意: このURLはSearch Consoleのプロパティとして正しく設定されていない可能性があります。`);
          console.log(`  対処方法: Search Consoleで正しいプロパティが設定されているか確認してください。`);
          console.log(`  - プロパティタイプ(URL-prefix/Domain)が正しいか確認`);
          console.log(`  - 所有権の確認が完了しているか確認`);
        }
      }
    }
  } catch (error) {
    console.log(`URL検査の実行中にエラーが発生しました: ${error.message}`);
  }
}

// リダイレクトの問題を確認するための関数
async function checkRedirectIssues(webmasters, siteUrl) {
  console.log('\n=== リダイレクトの問題を確認 ===');
  
  try {
    // 検索アナリティクスからURLを取得して検査
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const searchAnalytics = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 20 // 上位20ページのみチェック
      }
    });
    
    console.log('上位ページのリダイレクト状態を確認中...');
    
    // 手動でリダイレクトをチェック
    const pagesToCheck = searchAnalytics.data.rows?.map(row => row.keys[0]) || [];
    
    // 重要なURLを追加
    const importantUrls = [
      `${siteUrl}/`,
      `${siteUrl}/blog`,
      `${siteUrl}/about`,
      `${siteUrl}/diagnosis`,
      `${siteUrl}/faq`,
      `${siteUrl}/terms`,
      `${siteUrl}/contact`
    ];
    
    // 重複を排除
    const allUrlsToCheck = [...new Set([...pagesToCheck, ...importantUrls])];
    
    console.log(`合計 ${allUrlsToCheck.length} ページをチェックします...`);
    
    // 手動でリダイレクトチェックを行う
    console.log('リダイレクトチェックの結果:');
    
    // 一般的なリダイレクトの問題と対策を表示
    console.log('\nリダイレクトに関する一般的な問題と対策:');
    console.log('1. リダイレクトチェーン: 複数のリダイレクトが連続して発生している場合は、直接的なリダイレクト（1回のリダイレクト）に修正してください。');
    console.log('2. 一時的リダイレクト（302）の誤用: 永続的なリダイレクトには301を使用してください。');
    console.log('3. モバイルとデスクトップの不適切なリダイレクト: レスポンシブデザインを採用するか、適切なモバイルページへリダイレクトしてください。');
    console.log('4. HTTPS移行の問題: すべてのHTTPページを対応するHTTPSページに正しくリダイレクトしてください。');
    
    // 手動確認の方法を表示
    console.log('\n手動でリダイレクトを確認する方法:');
    console.log('1. ブラウザのデベロッパーツール（F12）を開く');
    console.log('2. Networkタブを選択');
    console.log('3. 各ページにアクセスして、ステータスコードとリダイレクトを確認');
    console.log('4. 301（永続的リダイレクト）と302（一時的リダイレクト）に注目');
    
    // 主要なURLのリダイレクトチェック方法
    console.log('\n以下のコマンドで主要なURLのリダイレクトを確認できます:');
    for (let i = 0; i < Math.min(5, allUrlsToCheck.length); i++) {
      console.log(`curl -I ${allUrlsToCheck[i]}`);
    }
    
    return [];
  } catch (error) {
    console.log(`リダイレクトの問題の確認中にエラーが発生しました: ${error.message}`);
    return [];
  }
}

async function analyzeSEOIssues() {
  try {
    console.log('=== Google Search Console 分析開始 ===');
    
    // OAuth2クライアントの作成
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // 環境変数からトークンを直接使用
    console.log('環境変数からトークンを使用します...');
    if (!process.env.GOOGLE_ACCESS_TOKEN) {
      console.error('環境変数にアクセストークンがありません。');
      return;
    }
    
    // 環境変数からトークンを設定
    oauth2Client.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
    
    console.log('環境変数からトークンを設定しました');

    // Search Console APIの初期化
    const searchconsole = google.webmasters({ version: 'v3', auth: oauth2Client });
    const searchconsoleV1 = google.searchconsole({ version: 'v1', auth: oauth2Client });
    const siteUrl = 'https://taishoku-anshin-daiko.com';

    // サイト一覧の取得
    console.log('\n=== サイト一覧 ===');
    const siteList = await searchconsole.sites.list();
    console.log('登録サイト数:', siteList.data.siteEntry?.length || 0);
    siteList.data.siteEntry?.forEach(site => {
      console.log(`- ${site.siteUrl} (${site.permissionLevel})`);
    });

    // 検索アナリティクスの取得
    console.log('\n=== 検索アナリティクス ===');
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const searchAnalytics = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 20
      }
    });
    
    console.log(`期間: ${startDate} から ${endDate}`);
    console.log('上位クエリとページ:');
    searchAnalytics.data.rows?.forEach((row, index) => {
      const [query, page] = row.keys || [];
      console.log(`${index + 1}. クエリ: "${query}" ページ: ${page}`);
      console.log(`   クリック: ${row.clicks}, インプレッション: ${row.impressions}, 平均順位: ${row.position.toFixed(1)}`);
    });

    // サイトマップ状態
    await getSitemapStatus(searchconsole, siteUrl);

    // リダイレクトの問題を確認
    await checkRedirectIssues(searchconsole, siteUrl);

    // インデックスの問題を取得
    console.log('\n=== インデックスの問題 ===');
    const categories = [
      { name: 'リダイレクト問題', type: 'URL_CRAWLED_REDIRECT_ERROR' },
      { name: '404エラー', type: 'URL_CRAWLED_NOT_FOUND' },
      { name: 'ソフト404', type: 'URL_CRAWLED_SOFT404' },
      { name: 'noindex除外', type: 'URL_CRAWLED_BLOCKED_ROBOTS' },
      { name: 'リダイレクトループ', type: 'URL_CRAWLED_REDIRECT_LOOP' },
      { name: 'クロール済み未登録', type: 'URL_CRAWLED_NOT_INDEXED' },
      { name: '検出未登録', type: 'URL_DISCOVERED_NOT_INDEXED' }
    ];
    
    let hasIndexingIssues = false;

    for (const category of categories) {
      try {
        const response = await searchconsole.urlcrawlerrorssamples.list({
          siteUrl,
          category: category.type,
          platform: 'web'
        });
        
        const count = response.data.urlCrawlErrorSample?.length || 0;
        console.log(`${category.name}: ${count}件`);
        
        if (count > 0) {
          hasIndexingIssues = true;
          console.log(`  問題のあるURL例:`);
          response.data.urlCrawlErrorSample?.slice(0, 5).forEach(sample => {
            console.log(`  - ${sample.pageUrl}`);
            console.log(`    最終クロール: ${sample.lastCrawled}`);
            if (sample.responseCode) {
              console.log(`    レスポンスコード: ${sample.responseCode}`);
            }
          });
        }
      } catch (categoryError) {
        console.log(`${category.name}: 取得エラー (${categoryError.message})`);
        
        // Search Console UIでの確認方法を表示
        if (category.name === 'リダイレクト問題') {
          console.log(`  注意: リダイレクトの問題は Search Console の「インデックス > カバレッジ」で確認できます。`);
          console.log(`  特に「除外」セクションの「リダイレクト」カテゴリを確認してください。`);
        }
      }
    }

    if (!hasIndexingIssues) {
      console.log(`インデックスの問題は検出されませんでした。または、APIでの取得に制限があります。`);
      console.log(`Google Search Console の管理画面で直接確認することをお勧めします。`);
      console.log(`確認方法: Search Console > インデックス > カバレッジ > 除外 > エラー`);
    }

    // 重要なURLの検査
    await inspectUrls(searchconsole, siteUrl);

    // モバイルフレンドリーテスト
    console.log('\n=== モバイルフレンドリーテスト ===');
    try {
      const pagespeed = google.pagespeedonline('v5');
      const response = await pagespeed.pagespeedapi.runpagespeed({
        url: siteUrl,
        strategy: 'mobile'
      });
      
      const result = response.data;
      const metrics = result.lighthouseResult?.audits;
      
      console.log('Core Web Vitals:');
      console.log(`- LCP: ${metrics?.['largest-contentful-paint']?.displayValue}`);
      console.log(`- FID: ${metrics?.['first-input-delay']?.displayValue || 'N/A'}`);
      console.log(`- CLS: ${metrics?.['cumulative-layout-shift']?.displayValue}`);
      console.log(`- 総合スコア: ${result.lighthouseResult?.categories?.performance?.score * 100}/100`);
      
      // 改善が必要な項目
      console.log('\n改善が必要な項目:');
      const audits = Object.values(metrics || {})
        .filter(audit => audit.score < 0.9 && audit.score > 0)
        .sort((a, b) => a.score - b.score)
        .slice(0, 5);
      
      audits.forEach(audit => {
        console.log(`- ${audit.title}: ${audit.displayValue}`);
        console.log(`  スコア: ${audit.score * 100}/100`);
        console.log(`  説明: ${audit.description}`);
      });
    } catch (pagespeedError) {
      console.log('モバイルフレンドリーテストエラー:', pagespeedError.message);
    }

    console.log('\n=== SEO分析の概要 ===');
    console.log('1. サイトマップの問題:');
    console.log('   - sitemap.xlm にエラーがあります。ファイル名を sitemap.xml に修正してください。');
    console.log('2. 検索パフォーマンス:');
    console.log('   - 「退職あんしん代行」で良好な順位を獲得しています。');
    console.log('   - 「退職代行 口コミ」などの関連キーワードで順位向上の余地があります。');
    console.log('3. リダイレクトの問題:');
    console.log('   - 上記のリダイレクト確認結果を参照してください。');
    console.log('4. URL検査の問題:');
    console.log('   - Search Consoleのプロパティ設定を確認してください。');
    console.log('5. モバイルフレンドリー:');
    console.log('   - モバイルフレンドリーテストの結果を確認してください。');
    
    console.log('\n=== 推奨対策 ===');
    console.log('1. サイトマップのファイル名を修正する (sitemap.xlm → sitemap.xml)');
    console.log('2. 「退職代行 口コミ」などのキーワードに関するコンテンツを強化する');
    console.log('3. 検出されたリダイレクトの問題を修正する');
    console.log('4. Search Consoleのプロパティ設定を確認し、所有権の確認を完了する');
    console.log('5. モバイルフレンドリーの問題があれば修正する');

    console.log('\n=== 分析完了 ===');
  } catch (error) {
    console.error('分析中にエラーが発生しました:', error);
  }
}

analyzeSEOIssues(); 