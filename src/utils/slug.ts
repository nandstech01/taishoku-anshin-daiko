function toRomaji(text: string): string {
  // 簡易的なローマ字変換（必要に応じて拡張可能）
  const conversion: { [key: string]: string } = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
  };

  // カタカナをひらがなに変換
  const hiragana = text.replace(/[\u30A1-\u30F6]/g, match => {
    const code = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(code);
  });

  let result = '';
  let i = 0;
  while (i < hiragana.length) {
    // 2文字のローマ字変換をまず試す
    if (i + 1 < hiragana.length) {
      const two = hiragana.slice(i, i + 2);
      if (conversion[two]) {
        result += conversion[two];
        i += 2;
        continue;
      }
    }
    // 1文字のローマ字変換
    const one = hiragana[i];
    if (conversion[one]) {
      result += conversion[one];
    } else {
      // 変換できない文字はそのまま
      result += one;
    }
    i++;
  }

  return result;
}

export function generateSlug(title: string): string {
  // 日本語の場合はローマ字に変換
  const romaji = toRomaji(title);
  
  return romaji
    .toLowerCase() // 小文字に変換
    .trim() // 前後の空白を削除
    .replace(/[^\w\s-]/g, '') // 英数字、スペース、ハイフン以外を削除
    .replace(/[\s_-]+/g, '-') // スペース、アンダースコア、ハイフンを単一のハイフンに変換
    .replace(/^-+|-+$/g, '') // 先頭と末尾のハイフンを削除
    || 'untitled'; // 空文字列の場合はuntitledを返す
}

export async function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  // 既存のslugと重複しないようにする
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
} 