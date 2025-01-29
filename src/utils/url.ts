/**
 * URL正規化のためのユーティリティ関数
 */

/**
 * タグ文字列を正規化する
 * @param tag 元のタグ文字列
 * @returns 正規化されたタグ文字列
 */
export const normalizeTag = (tag: string): string => {
  try {
    if (!tag) return '';
    
    // デコードして正規化
    const decodedTag = decodeURIComponent(tag);
    return decodedTag
      .trim()
      // 全角スペースを半角に
      .replace(/　/g, ' ')
      // 連続するスペースを単一のハイフンに
      .replace(/\s+/g, '-')
      // 特殊文字をハイフンに
      .replace(/[&,\.]/g, '-')
      // 連続するハイフンを単一に
      .replace(/-+/g, '-')
      // 先頭末尾のハイフンを削除
      .replace(/^-|-$/g, '');
  } catch (e) {
    console.error('Error normalizing tag:', e);
    return '';
  }
};

/**
 * カテゴリースラッグを正規化する
 * @param category カテゴリー文字列
 * @returns 正規化されたカテゴリースラッグ
 */
export const normalizeCategory = (category: string): string => {
  try {
    if (!category) return '';
    
    return encodeURIComponent(
      category
        .trim()
        // 全角スペースを半角に
        .replace(/　/g, ' ')
        // スペースをハイフンに
        .replace(/\s+/g, '-')
        // 特殊文字をハイフンに
        .replace(/[&,\.]/g, '-')
        // 連続するハイフンを単一に
        .replace(/-+/g, '-')
        // 先頭末尾のハイフンを削除
        .replace(/^-|-$/g, '')
    );
  } catch (e) {
    console.error('Error normalizing category:', e);
    return '';
  }
};

/**
 * ブログ記事のスラッグを正規化する
 * @param title 記事タイトル
 * @returns 正規化されたスラッグ
 */
export const normalizeSlug = (title: string): string => {
  try {
    if (!title) return '';
    
    return title
      .trim()
      .toLowerCase()
      // 全角英数字を半角に
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      // 全角スペースを半角に
      .replace(/　/g, ' ')
      // スペースをハイフンに
      .replace(/\s+/g, '-')
      // 特殊文字を削除
      .replace(/[&,\.]/g, '')
      // 連続するハイフンを単一に
      .replace(/-+/g, '-')
      // 先頭末尾のハイフンを削除
      .replace(/^-|-$/g, '')
      // 最大長を制限（SEOのため）
      .slice(0, 100);
  } catch (e) {
    console.error('Error normalizing slug:', e);
    return '';
  }
};

/**
 * URLを正規化する
 * @param path URLパス
 * @returns 正規化されたURLパス
 */
export const normalizePath = (path: string): string => {
  try {
    if (!path) return '';
    
    // 末尾のスラッシュを削除
    return path.replace(/\/+$/, '');
  } catch (e) {
    console.error('Error normalizing path:', e);
    return '';
  }
}; 