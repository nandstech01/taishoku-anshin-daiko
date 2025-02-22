/**
 * 退職AI適性検査の質問と選択肢を定義
 */

import { Question } from "@/types/diagnosis";

export const questions: Question[] = [
  // TIPI (Big Five) 質問 - 肯定的な項目
  {
    id: "TIPI1",
    text: "活発で、外向的だと思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI2",
    text: "他人に共感し、思いやりがあると思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI3",
    text: "しっかりしていて、自分に厳しいと思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI4",
    text: "冷静で、安定した感情を持っていると思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI5",
    text: "新しいことを体験するのが好きで、アイデアが豊富だと思う",
    scaleType: "TIPI",
    category: "personality"
  },
  // TIPI (Big Five) 質問 - 否定的な項目（逆転項目）
  {
    id: "TIPI6",
    text: "控えめで、物静かだと思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI7",
    text: "批判的で、議論好きだと思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI8",
    text: "いい加減で、だらしない傾向があると思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI9",
    text: "心配性で、動揺しやすいと思う",
    scaleType: "TIPI",
    category: "personality"
  },
  {
    id: "TIPI10",
    text: "変化を好まず、型にはまった考え方をする傾向があると思う",
    scaleType: "TIPI",
    category: "personality"
  },
  // RIASEC 職業興味質問
  {
    id: "RIASEC_REALISTIC",
    text: "物を組み立てたり、機械を操作したりする仕事に興味がある",
    scaleType: "5scale",
    category: "career"
  },
  {
    id: "RIASEC_INVESTIGATIVE",
    text: "研究や調査、問題解決を行う仕事に興味がある",
    scaleType: "5scale",
    category: "career"
  },
  {
    id: "RIASEC_ARTISTIC",
    text: "創造的な表現や芸術的な活動を行う仕事に興味がある",
    scaleType: "5scale",
    category: "career"
  },
  {
    id: "RIASEC_SOCIAL",
    text: "人を助けたり、教えたりする仕事に興味がある",
    scaleType: "5scale",
    category: "career"
  },
  {
    id: "RIASEC_ENTERPRISING",
    text: "リーダーシップを発揮したり、事業を展開したりする仕事に興味がある",
    scaleType: "5scale",
    category: "career"
  },
  {
    id: "RIASEC_CONVENTIONAL",
    text: "データを整理したり、決まった手順で仕事を進めたりすることに興味がある",
    scaleType: "5scale",
    category: "career"
  },
  // ストレス要因質問
  {
    id: "STRESS1",
    text: "現在の仕事量は適切だと感じる",
    scaleType: "5scale",
    category: "stress"
  },
  {
    id: "STRESS2",
    text: "仕事上の意思決定に関与できていると感じる",
    scaleType: "5scale",
    category: "stress"
  },
  {
    id: "STRESS3",
    text: "職場の人間関係は良好だと感じる",
    scaleType: "5scale",
    category: "stress"
  },
  {
    id: "STRESS4",
    text: "仕事と私生活のバランスが取れていると感じる",
    scaleType: "5scale",
    category: "stress"
  },
  // Gallup Q12 エンゲージメント質問
  {
    id: "GALLUP1",
    text: "職場で自分の意見が尊重されていると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP2",
    text: "仕事を通じて成長できる機会があると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP3",
    text: "上司や同僚から、自分の頑張りを認められていると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP4",
    text: "会社の目標や方針に共感できると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP5",
    text: "チーム内で良好な人間関係が築けていると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP6",
    text: "チームメンバーから必要なサポートを得られていると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP7",
    text: "自分の意見や提案が組織に反映されていると感じる",
    scaleType: "5scale",
    category: "engagement"
  },
  {
    id: "GALLUP8",
    text: "組織の一員として成長を実感できていると感じる",
    scaleType: "5scale",
    category: "engagement"
  }
];

/**
 * TIPI用の7段階評価の選択肢
 */
export const tipiScaleChoices = [
  { value: 1, label: "全くそう思わない" },
  { value: 2, label: "そう思わない" },
  { value: 3, label: "どちらかというとそう思わない" },
  { value: 4, label: "どちらとも言えない" },
  { value: 5, label: "どちらかというとそう思う" },
  { value: 6, label: "そう思う" },
  { value: 7, label: "強くそう思う" }
];

/**
 * 5段階評価の選択肢（RIASEC、ストレス、Gallup用）
 */
export const fiveScaleChoices = [
  { value: 1, label: "全く該当しない" },
  { value: 2, label: "あまり該当しない" },
  { value: 3, label: "どちらとも言えない" },
  { value: 4, label: "やや該当する" },
  { value: 5, label: "非常に該当する" }
]; 