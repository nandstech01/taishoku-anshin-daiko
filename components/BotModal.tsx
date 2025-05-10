"use client";

import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// ヒアリングシートのステップを定義
interface HearingSheetStep {
 id: string;
 question: string;
 type: 'text' | 'tel' | 'email' | 'radio' | 'textarea' | 'checkbox';
 options?: string[];
 placeholder?: string;
 required?: boolean;
}


// メッセージ型の定義を追加
interface ChatMessage {
 role: 'user' | 'bot';
 text: string;
}


// ヒアリングシートの入力フォームを定義
const HEARING_SHEET_STEPS: HearingSheetStep[] = [
 // 1. 基本情報
 { id: '氏名', question: 'お名前を教えてください', type: 'text', placeholder: '山田 太郎', required: true },
 { id: 'LINE登録者名', question: 'LINE登録者名を教えてください', type: 'text', placeholder: 'LINEの表示名', required: false },
 { id: '電話番号', question: '電話番号を教えてください', type: 'tel', placeholder: '090-1234-5678', required: true },
 { id: 'メールアドレス', question: 'メールアドレスを教えてください', type: 'email', placeholder: 'example@email.com', required: true },
 { id: '年齢', question: 'ご年齢を教えてください', type: 'text', placeholder: '例: 35', required: true },
 { id: '性別', question: '性別を教えてください', type: 'radio', options: ['男性', '女性', 'その他', '回答しない'], required: true },


 // 2. 会社・勤務先情報
 { id: '会社名', question: '会社名を教えてください', type: 'text', placeholder: '例: 株式会社〇〇', required: true },
 { id: '職種', question: '職種を教えてください', type: 'radio', options: ['運送', '金融', '営業', '事務', '製造', 'IT', '医療', '介護', '販売', '飲食', '教育', '建設', '公務員', 'その他'], required: true },
 { id: '勤務先情報', question: '対象連絡する担当者', type: 'radio', options: ['部長', 'センター長', '課長', '係長', '主任', '店長', '支店長', 'マネージャー', 'リーダー', 'オーナー', 'その他'], required: false },
 { id: '在籍年数', question: '勤続年数を教えてください', type: 'text', placeholder: '例: 3年2ヶ月', required: true },
 { id: '会社規模', question: '会社の規模（従業員数）を教えてください', type: 'radio', options: ['10人未満', '10〜50人', '51〜100人', '101〜300人', '301〜1000人', '1000人以上'], required: true },


 // 3. 退職に関する情報
 { id: '退職理由', question: '退職理由を教えてください（複数選択可）', type: 'checkbox', options: ['体調不良', '人間関係', '給与・待遇面', 'キャリアアップ', 'プライベートとの両立', '通勤時間', 'その他'], required: true },
 { id: '希望退職日', question: '希望退職日を教えてください', type: 'text', placeholder: '例: 2023年5月31日', required: true },
 { id: '最終出勤日', question: '最終出勤日を教えてください', type: 'text', placeholder: '例: 2023年5月20日', required: false },
 { id: '次回出勤予定日', question: '次回出勤予定日を教えてください', type: 'text', placeholder: '例: 2023年5月15日', required: false },
 { id: '退職意思を伝える連絡先', question: '退職意思を伝える連絡先を教えてください', type: 'text', placeholder: '携帯電話など', required: false },


 // 4. 労働条件・待遇
 { id: '雇用形態', question: '現在の雇用形態を教えてください', type: 'radio', options: ['正社員', '契約社員', 'パート・アルバイト', '派遣社員', 'その他'], required: true },
 { id: '残業時間', question: '残業は多いですか？', type: 'radio', options: ['ほとんどない', '月20時間未満', '月20〜45時間', '月45〜80時間', '月80時間以上'], required: true },
 { id: '未払い残業有無', question: '残業代は支払われていますか？', type: 'radio', options: ['すべて支払われている', '一部のみ支払われている', '支払われていない'], required: true },
 { id: '有給休暇の状況', question: '有給休暇の消化状況を教えてください', type: 'text', placeholder: '例: 残り10日分あります', required: true },
 { id: '有給取得希望', question: '有給取得希望はありますか？', type: 'radio', options: ['希望する', 'なし'], required: false },
 { id: '退職金の有無', question: '退職金の有無を教えてください', type: 'radio', options: ['あり', 'なし'], required: false },


 // 5. ハラスメント・健康
 { id: 'ハラスメント有無', question: 'ハラスメントを感じていますか？', type: 'radio', options: ['ある', 'ない'], required: true },
 { id: 'ハラスメント内容', question: 'ハラスメント問題がある場合、具体的な状況を教えてください', type: 'radio', options: ['パワハラ', 'セクハラ', 'マタハラ', 'モラハラ', 'いじめ', '暴言', '暴力', '長時間労働', 'その他', 'ない'], required: false },
 { id: '健康上の問題有無', question: '健康上の問題はありますか？', type: 'radio', options: ['ある', 'ない'], required: true },
 { id: '健康上の問題の詳細', question: '健康上の問題がある場合、状況を教えてください', type: 'radio', options: ['うつ', '適応障害', '不眠症', '自律神経失調症', 'パニック障害', '身体疾患', 'メンタル不調', 'その他', '腰痛', '頭痛', '胃腸障害', '高血圧', 'ない'], required: false },
 { id: '診断書有無', question: '診断書はありますか？', type: 'radio', options: ['ある', 'ない', '取得予定'], required: false },


 // 6. 会社貸与物・私物・書類
 { id: '会社からの貸与物', question: '会社からの貸与物【手元にある物】を選択してください（複数選択可）', type: 'checkbox', options: ['PC', 'スマホ', 'ユニフォーム', '鍵', '安全靴', 'その他'], required: false },
 { id: 'ロッカーの状況', question: 'ロッカーの状況を選択してください（複数選択可）', type: 'checkbox', options: ['鍵なし', '鍵がかかっている', '私物なし', 'ロッカーはない', 'その他'], required: false },
 { id: '私物の取り扱い', question: '私物の取り扱いについて選択してください（複数選択可）', type: 'checkbox', options: ['無し', '破棄希望', '着払いで郵送希望', '辞める前に持ち帰る', 'その他'], required: false },
 { id: '会社からの郵送希望書類', question: '会社からの郵送希望書類を選択してください（複数選択可）', type: 'checkbox', options: ['源泉徴収票', '離職票', '健康保険資格喪失証明書', 'その他'], required: false },


 // 7. 連絡・その他
 { id: '希望連絡手段', question: '当社からの連絡方法の希望を教えてください', type: 'radio', options: ['電話', 'メール', 'LINE'], required: true },
 { id: '連絡希望時間帯', question: '連絡可能な時間帯を教えてください', type: 'text', placeholder: '例: 平日18時以降、土日終日', required: true },
 { id: 'その他要望', question: 'その他ご要望や気になることがあれば記入してください', type: 'textarea', placeholder: '自由にご記入ください', required: false },


 // 8. 当社をどのようにお知りになりましたか？
 { id: '当社をどのようにお知りになりましたか', question: '当社をどのようにお知りになりましたか？（複数選択可）', type: 'checkbox', options: ['Google検索', 'SNS', '知人紹介', '広告', 'YouTube', 'LINE公式', 'その他'], required: false },
];


// クイックアクセスボタンの項目を定義
const QUICK_ACCESS_TOPICS = [
  { id: 'fee_explanation', label: '退職の手続きや費用を知りたい' },
  { id: 'privacy_concern', label: '退職代行を使ったことを知られたくない' },
  { id: 'stress_consultation', label: 'ストレスや悩みについて相談したい' },
  { id: 'service_comparison', label: 'なぜ2,980円なのか？他社との違いは？' },
];


export default function BotModal({ onClose }: { onClose: () => void }) {
 // メッセージは画面サイズ判定後にセットする
 const [messages, setMessages] = useState<ChatMessage[]>([]);
 const [input, setInput] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 // ヒアリングシート関連の状態
 const [isHearingSheetMode, setIsHearingSheetMode] = useState(false);
 const [currentStepIndex, setCurrentStepIndex] = useState(0);
 const [hearingSheetAnswers, setHearingSheetAnswers] = useState<Record<string, string | string[]>>({});
 const [currentInputValue, setCurrentInputValue] = useState<string | string[]>('');
 const [showPrevButton, setShowPrevButton] = useState(false);
 const [spreadsheetConnected, setSpreadsheetConnected] = useState(false);
 // 新しい状態を追加
 const [hearingCompleted, setHearingCompleted] = useState(false);
 const [showLineQR, setShowLineQR] = useState(false);
 const [showStartHearingButton, setShowStartHearingButton] = useState(true);
 // レスポンシブ対応用の状態
 const [isDesktop, setIsDesktop] = useState(false);
 // メッセージコンテナへの参照を作成
 const messagesEndRef = useRef<HTMLDivElement>(null);

 // 画面サイズの検出
 useEffect(() => {
   const checkScreenSize = () => {
     setIsDesktop(window.innerWidth >= 768); // 768px以上をデスクトップとみなす
   };
   
   // 初期チェック
   checkScreenSize();
   
   // リサイズイベントのリスナー
   window.addEventListener('resize', checkScreenSize);
   
   // クリーンアップ
   return () => {
     window.removeEventListener('resize', checkScreenSize);
   };
 }, []);

 // 画面サイズ判定後に初回メッセージを追加（スマホは案内文を短縮）
 useEffect(() => {
   if (messages.length === 0) {
     const desktopText = 'こんにちは！退職あんしん代行サービスです。どんなことでもお気軽にご相談ください。料金は2,980円のみです。\n\n右側のボタンからよくある質問を選ぶか、下部のチャット欄から自由に質問できます。';
     const mobileText = 'こんにちは！退職あんしん代行サービスです。どんなことでもお気軽にご相談ください。料金は2,980円のみです。';
     setMessages([{ role: 'bot', text: isDesktop ? desktopText : mobileText }]);
   }
 }, [isDesktop]);

 // 新しいメッセージが追加されたときに自動スクロール
 useEffect(() => {
   scrollToBottom();
 }, [messages]);


 // 一番下までスクロールする関数
 const scrollToBottom = () => {
   if (messagesEndRef.current) {
     // より滑らかなスクロール
     messagesEndRef.current.scrollIntoView({
       behavior: 'smooth',
       block: 'end'  // 確実に下部にスクロール
     });
   }
 };


 // エラー発生時に呼び出す関数
 const handleError = (errorMessage: string) => {
   console.error('エラーが発生しました:', errorMessage);
   setError(errorMessage);
   // エラーメッセージを表示
   setMessages(prev => [
     ...prev,
     { role: 'bot', text: '申し訳ありません、エラーが発生しました。もう一度お試しください。' }
   ]);
   // エラー表示後スクロール
   setTimeout(scrollToBottom, 100);
   // エラー表示を数秒後に消す
   setTimeout(() => setError(null), 5000);
 };


 // ローディング表示後に確実にスクロールする
 useEffect(() => {
   if (isLoading) {
     setTimeout(scrollToBottom, 100);
   }
 }, [isLoading]);


 // インテント分類関数（シンプルなキーワードマッチング）
 const classifyIntent = (userInput: string): string => {
   // 小文字に変換して比較を簡略化
   const input = userInput.toLowerCase();
  
   // インテントごとのキーワードパターン
   const intentPatterns: Record<string, string[]> = {
     "fee_explanation": ["なぜ", "2,980円", "2980円", "なんで", "安い", "値段", "料金", "費用", "他社", "違い"],
     "retirement_process": ["退職", "辞め方", "手続き", "費用", "流れ", "方法"],
     "privacy_concern": ["知られ", "バレ", "秘密", "プライバシー", "内緒", "こっそり"],
     "stress_consultation": ["ストレス", "悩み", "辛い", "つらい", "精神的", "メンタル", "うつ", "不安"],
     "service_flow": ["流れ", "どんな", "どうなる", "手順", "ステップ", "どういう", "使い方", "サービス", "退職代行"],
     "immediate_resignation": ["即日", "すぐに", "今すぐ", "明日", "早く", "急いで", "今日", "明日退職", "早く辞め", "急いで辞め", "今すぐ辞め", "明日辞め"],
     "direct_request": ["依頼", "始め", "申し込み", "スタート", "退職したい", "辞めたい", "依頼したい", "退職希望"]
   };
  
   // 退職したいという直接的な表現があれば、direct_requestとして処理
   if (input.includes("退職したい") || input.includes("辞めたい")) {
     return "direct_request";
   }
  
   // 明日退職や即日退職など急ぎの表現があれば、immediate_resignationとして処理
   if (input.includes("明日退職") || input.includes("即日退職") ||
       (input.includes("明日") && (input.includes("退職") || input.includes("辞め"))) ||
       (input.includes("今すぐ") && (input.includes("退職") || input.includes("辞め")))) {
     return "immediate_resignation";
   }
  
   // 各インテントとマッチするキーワード数をカウント
   const matchCounts: Record<string, number> = {};
  
   for (const [intent, keywords] of Object.entries(intentPatterns)) {
     matchCounts[intent] = keywords.filter(keyword => input.includes(keyword)).length;
   }
  
   // 最も多くのキーワードにマッチしたインテントを返す
   const sortedIntents = Object.entries(matchCounts).sort((a, b) => b[1] - a[1]);
  
   // マッチするキーワードがある場合のみインテントを返す
   if (sortedIntents.length > 0 && sortedIntents[0][1] > 0) {
     return sortedIntents[0][0];
   }
  
   // どのインテントにもマッチしない場合は入力が短すぎなければ「direct_request」を返す
   // これにより、単に「退職」のような短い入力も処理できる
   if (input.length > 1) {
     return "direct_request";
   }
  
   // 最終的にはunknownを返す
   return "unknown";
 };

 // 標準レスポンスを取得する関数
 const getStandardResponse = (intent: string): string => {
   const responses: Record<string, string> = {
     "fee_explanation": "当サービスの料金は税込2,980円のみです。\n\n【低価格を実現できる理由】\n1. 手続きの標準化とオンライン化で人件費を削減\n2. 法律監修済みテンプレートを活用し弁護士費用を最小限に\n3. LINEを中心としたやり取りで書類郵送コストを削減\n\n【他社との比較】\n・相場：20,000〜50,000円（追加料金が発生するケースも）\n・当社：2,980円のみ／追加料金なし\n・弁護士監修、24時間受付、全額返金保証付きで安心してご利用いただけます。\n\nご不明点があればお気軽にお尋ねください。",
     "service_comparison": "当サービスの料金は税込2,980円のみです。\n\n【低価格を実現できる理由】\n1. 手続きの標準化とオンライン化で人件費を削減\n2. 法律監修済みテンプレートを活用し弁護士費用を最小限に\n3. LINEを中心としたやり取りで書類郵送コストを削減\n\n【他社との比較】\n・相場：20,000〜50,000円（追加料金が発生するケースも）\n・当社：2,980円のみ／追加料金なし\n・弁護士監修、24時間受付、全額返金保証付きで安心してご利用いただけます。\n\n詳しくは以下の記事もご覧ください：\nhttps://taishoku-anshin-daiko.com/blog/anshinhanazeinokariarunakomikara",
     
     "retirement_process": "退職手続きと費用についてご説明します。\n\n【法的ポイント】\n・民法627条：期間の定めのない雇用契約は退職届が会社に到達してから2週間で退職が成立します。\n\n【サービスご利用の流れ】\n1. ヒアリングシートのご記入（所要3分程度）\n2. 担当者による確認・ご相談（LINE／電話）\n3. 当社が会社へ退職意思を代理通知\n4. 退職日と書類（離職票等）の受領を調整\n5. 退職完了のご報告\n\n【料金】税込2,980円のみで、完了まで追加費用は一切かかりません。\n\nさらに詳しい流れをご希望でしたら、ヒアリングシート入力をお勧めいたします。",
     
     "privacy_concern": "ご安心ください。ご家族・友人含め第三者に『退職代行を利用した』ことが知られることはありません。\n\n・当社名義で会社へ連絡するため、代行利用の事実は開示されません。\n・お客様の個人情報は個人情報保護法および当社プライバシーポリシーに基づき厳重に管理します。\n・ご家族や同僚など第三者への連絡も原則不要です。\n\nプライバシー重視でサービスを設計しておりますので、安心してご利用ください。",
     
     "stress_consultation": "毎日お疲れさまです。パワハラや長時間労働などでお悩みの場合、退職は労働者の権利（民法627条）として行使できます。\n\n当社では24時間LINEでご相談を受け付け、状況に応じて以下のサポートも行っています。\n・臨床心理士など専門家の紹介\n・労働基準監督署やハローワークへの相談方法のご案内\n\n無理に詳細をお話しいただく必要はありません。話しやすい範囲でお聞かせください。",
     
     "service_flow": "退職あんしん代行サービスの流れをご説明します：\n\n【申込み】\n1. ヒアリングシートにご記入いただきます\n2. 担当者がご連絡し、詳細確認と退職の意向を再確認します\n\n【退職手続き】\n3. 当社が会社へ連絡し、退職の意思を伝えます\n4. 退職日の調整を行います\n5. 必要書類（離職票など）の発行を依頼します\n\n【完了】\n6. 退職完了のご報告をします\n\nすべて2,980円のみで対応いたします。ご質問があればお気軽にどうぞ。",
     
     "immediate_resignation": "即日・早急な退職のご希望ですね。\n\n法律上、退職の意思表示から2週間経過すれば退職できますが、体調不良などの事情があれば即日退職も可能な場合があります。\n\nまずはヒアリングシートにて詳細をお伺いし、最短での退職を目指してサポートいたします。特に体調面での問題がある場合は、その旨もお知らせください。\n\n緊急性が高いようですので、ヒアリングシートへのご記入をお願いできますか？",
     
     "direct_request": "退職のご依頼をご検討いただき、ありがとうございます。\n\n退職代行サービスをご利用いただくには、まずヒアリングシートにてお客様の状況をお伺いする必要があります。これにより、最適なサポートをご提供できます。\n\nヒアリングシートの入力を始めてもよろしいでしょうか？",
     
     "unknown": "ご質問ありがとうございます。もう少し詳しく教えていただけますと幸いです。\n\n退職に関するご相談、料金についてのご質問、サービスの流れなど、お気軽にお尋ねください。または、ヒアリングシートの入力を始めることもできます。"
   };

   return responses[intent] || responses["unknown"];
 };

 // メッセージを送信する関数
 const sendMessage = async () => {
   if (!input.trim() && !isHearingSheetMode) return;

   try {
     // 入力内容をクリア
     const userMessage = input;
     setInput('');
     setIsLoading(true);

     if (isHearingSheetMode) {
       // ヒアリングシートモードの処理は別の関数で実装
       await handleHearingSheetInput();
     } else {
       // 通常のチャットモードの処理
       // ユーザーのメッセージを追加
       setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

       // インテントを分類
       const intent = classifyIntent(userMessage);
       console.log('Classified intent:', intent);

       // レスポンスを3秒後に表示（ローディング感のため）
       setTimeout(() => {
         const responseText = getStandardResponse(intent);
         
         // 直接申し込みの場合はヒアリングシートモードを開始
         if (intent === "direct_request" || intent === "immediate_resignation") {
           setTimeout(() => {
             setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
             setTimeout(() => {
               startHearingSheet();
             }, 1000);
           }, 500);
         } else {
           setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
         }
         
         setIsLoading(false);
       }, 1500);
     }
   } catch (error) {
     console.error('メッセージ送信中にエラーが発生しました:', error);
     handleError('メッセージを送信できませんでした。');
     setIsLoading(false);
   }
 };

 // ヒアリングシートを開始する関数
 const startHearingSheet = () => {
   setIsHearingSheetMode(true);
   setCurrentStepIndex(0);
   setHearingSheetAnswers({});
   setCurrentInputValue('');
   setShowPrevButton(false);
   setShowStartHearingButton(false);
   
   // ヒアリングシート開始メッセージを追加
   setMessages(prev => [
     ...prev, 
     { 
       role: 'bot', 
       text: 'それでは、退職代行サービスのヒアリングシートにお答えください。これらの情報をもとに最適なサポートをご提供いたします。\n\n途中で中断したい場合は「中断」とお送りください。' 
     }
   ]);
 };

 // ヒアリングシートの入力を処理する関数
 const handleHearingSheetInput = async () => {
   // 現在のステップを取得
   const currentStep = HEARING_SHEET_STEPS[currentStepIndex];
   
   // ユーザーからの回答を処理
   let answer: string | string[] = '';
   
   if (currentStep.type === 'checkbox') {
     // チェックボックスの場合は配列で回答を受け取る
     answer = Array.isArray(currentInputValue) ? currentInputValue : [];
   } else {
     // それ以外のタイプの場合は文字列で回答を受け取る
     answer = typeof currentInputValue === 'string' ? currentInputValue : '';
   }
   
   // 回答をセット
   setHearingSheetAnswers(prev => ({
     ...prev,
     [currentStep.id]: answer
   }));
   
   // 回答をメッセージとして表示
   const displayAnswer = Array.isArray(answer) ? answer.join(', ') : answer;
   
   // ユーザーの回答をメッセージリストに追加
   setMessages(prev => [
     ...prev,
     { role: 'user', text: displayAnswer }
   ]);
   
   // 入力値をリセット
   setCurrentInputValue('');
   
   // 次のステップへ進む
   if (currentStepIndex < HEARING_SHEET_STEPS.length - 1) {
     // まだ質問が残っている場合
     setCurrentStepIndex(prev => prev + 1);
     setShowPrevButton(true); // 2つ目以降の質問では「戻る」ボタンを表示
     
     // 少し遅延させて次の質問を表示
     setTimeout(() => {
       const nextStep = HEARING_SHEET_STEPS[currentStepIndex + 1];
       setMessages(prev => [
         ...prev,
         { role: 'bot', text: nextStep.question }
       ]);
       setIsLoading(false);
     }, 500);
   } else {
     // すべての質問が終了した場合
     await submitHearingSheet();
   }
 };

 // ヒアリングシートの回答を送信する関数
 const submitHearingSheet = async () => {
   try {
     setIsLoading(true);
     
     // 送信中メッセージを表示
     setMessages(prev => [
       ...prev,
       { role: 'bot', text: 'ヒアリングシートの送信中です...' }
     ]);
     
     // 絶対URLを使用する
     const baseUrl = window.location.origin;
     console.log('API呼び出しURL:', `${baseUrl}/api/submit-hearing-sheet`);
     console.log('送信データ:', JSON.stringify({ answers: hearingSheetAnswers }));
     
     // スプレッドシートAPIに送信
     try {
       const response = await fetch(`${baseUrl}/api/submit-hearing-sheet`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ answers: hearingSheetAnswers }),
         // キャッシュをバイパスする
         cache: 'no-store',
         // タイムアウト付きのabortControllerを使用
         signal: (() => {
           const controller = new AbortController();
           setTimeout(() => controller.abort(), 30000); // 30秒後にabort
           return controller.signal;
         })()
       });
     
       if (!response.ok) {
         const errorText = await response.text();
         console.error('API response error:', response.status, errorText);
         throw new Error(`API error: ${response.status} - ${errorText}`);
       }

       const data = await response.json();
       console.log('API応答データ:', data);
     
       // 送信成功メッセージを表示
       setMessages(prev => [
         ...prev.slice(0, -1), // 「送信中」メッセージを削除
         { role: 'bot', text: data.message || 'ヒアリングシートの送信が完了しました。ありがとうございます。\n\nいただいた情報をもとに、担当者より24時間以内にご連絡いたします。\n\nその他ご質問があれば、お気軽にお聞きください。\n\n続けて、以下の選択肢からお選びください：' }
       ]);
       
       // ヒアリングシートモードを終了し、完了状態をセット
       setIsHearingSheetMode(false);
       setHearingCompleted(true);
     } catch (fetchError) {
       console.error('Fetch操作中のエラー:', fetchError);
       throw fetchError; // 外側のcatchブロックでハンドリングするために再スロー
     }
   } catch (error) {
     console.error('ヒアリングシート送信中にエラーが発生しました:', error);
     
     // エラーメッセージを表示
     setMessages(prev => [
       ...prev.slice(0, -1), // 「送信中」メッセージを削除
       { role: 'bot', text: 'ヒアリングシートの送信中にエラーが発生しました。お手数ですが、もう一度お試しいただくか、直接お電話（0120-123-456）でのご連絡をお願いいたします。' }
     ]);
     
     // ヒアリングシートモードを終了
     setIsHearingSheetMode(false);
   } finally {
     setIsLoading(false);
   }
 };
 
 // 前の質問に戻る
 const goToPreviousStep = () => {
   if (currentStepIndex > 0) {
     // 現在の質問を削除
     setMessages(prev => prev.slice(0, -2)); // ボットの質問とユーザーの最後の回答を削除
     
     // インデックスを1つ戻す
     setCurrentStepIndex(prev => prev - 1);
     
     // 最初の質問まで戻った場合は「戻る」ボタンを非表示に
     if (currentStepIndex - 1 === 0) {
       setShowPrevButton(false);
     }
     
     // 前の質問の回答を現在の入力値にセット
     const prevStep = HEARING_SHEET_STEPS[currentStepIndex - 1];
     const prevAnswer = hearingSheetAnswers[prevStep.id];
     setCurrentInputValue(prevAnswer || '');
   }
 };
 
 // 入力がEnterキーで送信された時の処理
 const handleKeyDown = (e: React.KeyboardEvent) => {
   if (e.key === 'Enter' && !e.shiftKey) {
     e.preventDefault();
     sendMessage();
   }
 };
 
 // チェックボックスの選択を処理する関数
 const handleCheckboxChange = (option: string) => {
   setCurrentInputValue(prev => {
     const prevArray = Array.isArray(prev) ? prev : [];
     if (prevArray.includes(option)) {
       return prevArray.filter(item => item !== option);
     } else {
       return [...prevArray, option];
     }
   });
 };

 // ユーザーが選択したラジオボタンをハイライト表示するための関数
 const isRadioSelected = (option: string): boolean => {
   return currentInputValue === option;
 };

 // ユーザーが選択したチェックボックスをハイライト表示するための関数
 const isCheckboxSelected = (option: string): boolean => {
   return Array.isArray(currentInputValue) && currentInputValue.includes(option);
 };

 // 現在の質問を表示する関数
 const renderCurrentQuestion = () => {
   if (!isHearingSheetMode) return null;
   
   const currentStep = HEARING_SHEET_STEPS[currentStepIndex];
   
   return (
     <motion.div
       key={currentStep.id}
       initial={{ opacity: 0, y: 24 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: 24 }}
       transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
       className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mx-4 mb-4"
     >
       <h3 className="font-medium text-gray-900 mb-4 text-lg">{currentStep.question}</h3>
       
       {currentStep.type === 'text' || 
        currentStep.type === 'tel' || 
        currentStep.type === 'email' ? (
         <input
           type={currentStep.type}
           value={currentInputValue as string}
           onChange={(e) => setCurrentInputValue(e.target.value)}
           placeholder={currentStep.placeholder}
           className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
           required={currentStep.required}
         />
       ) : currentStep.type === 'textarea' ? (
         <textarea
           value={currentInputValue as string}
           onChange={(e) => setCurrentInputValue(e.target.value)}
           placeholder={currentStep.placeholder}
           className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
           required={currentStep.required}
         />
       ) : currentStep.type === 'radio' ? (
         <div className="space-y-2">
           {currentStep.options?.map((option) => (
             <div 
               key={option}
               onClick={() => setCurrentInputValue(option)}
               className={`p-4 border rounded-lg cursor-pointer transition-all ${
                 isRadioSelected(option) 
                   ? 'bg-blue-50 border-blue-300 shadow-sm' 
                   : 'border-gray-200 hover:bg-gray-50'
               }`}
             >
               {option}
             </div>
           ))}
         </div>
       ) : currentStep.type === 'checkbox' ? (
         <div className="space-y-2">
           {currentStep.options?.map((option) => (
             <div 
               key={option}
               onClick={() => handleCheckboxChange(option)}
               className={`p-4 border rounded-lg cursor-pointer transition-all ${
                 isCheckboxSelected(option) 
                   ? 'bg-blue-50 border-blue-300 shadow-sm' 
                   : 'border-gray-200 hover:bg-gray-50'
               }`}
             >
               {option}
             </div>
           ))}
         </div>
       ) : null}
       
       <div className="mt-6 flex justify-between">
         {showPrevButton && (
           <button
             onClick={goToPreviousStep}
             className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
           >
             戻る
           </button>
         )}
         <button
           onClick={sendMessage}
           className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors ml-auto font-medium shadow-sm"
         >
           {currentStepIndex === HEARING_SHEET_STEPS.length - 1 ? '送信する' : '次へ'}
         </button>
       </div>
     </motion.div>
   );
 };

 // ヒアリング完了後のアクションボタンを表示する関数
 const renderCompletionActions = () => {
   if (!hearingCompleted) return null;

   return (
     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mx-4 mb-4">
       <h3 className="font-medium text-gray-900 mb-4 text-lg">次のステップを選択してください</h3>
       
       <div className="space-y-3">
         <button
           onClick={handleLineRegistration}
           className="relative w-full py-4 px-5 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm"
         >
           <div className="absolute left-4 bg-white/20 p-2 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
             </svg>
           </div>
           <div className="mx-auto text-center leading-tight">
             <span className="sm:hidden leading-tight flex flex-col">
               <span>LINE公式で</span>
               <span>報告を受ける</span>
             </span>
             <span className="hidden sm:inline">LINE公式アカウントに登録する</span>
           </div>
           <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
           </svg>
         </button>
         
         <button
           onClick={handlePayment}
           className="relative w-full py-4 px-5 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
         >
           <div className="absolute left-4 bg-white/20 p-2 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
             </svg>
           </div>
           <div className="mx-auto text-center leading-tight">
             <span className="sm:hidden leading-tight flex flex-col">
               <span>決済に進む</span>
               <span>2,980円</span>
             </span>
             <span className="hidden sm:inline">決済に進む（2,980円）</span>
           </div>
           <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
           </svg>
         </button>
       </div>
     </div>
   );
 };

 // LINE QRコードを表示する関数
 const renderLineQR = () => {
   if (!showLineQR) return null;

   return (
     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mx-4 mb-4">
       <h3 className="font-medium text-gray-900 mb-4 text-lg">LINE公式アカウント</h3>
       
       <div className="flex flex-col items-center justify-center mb-4">
         <div className="bg-white p-4 border border-gray-200 rounded-lg mb-4">
           {/* ここに実際のQRコード画像を表示 */}
           <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
             <span className="text-sm text-gray-500">LINE QRコード</span>
           </div>
         </div>
         <p className="text-sm text-gray-600 text-center mb-4">
           上記のQRコードをスキャンして、LINE公式アカウントを追加してください。
           追加後に下のボタンをクリックしてください。
         </p>
         <button
           onClick={handleLineRegistrationComplete}
           className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
         >
           LINE登録完了
         </button>
       </div>
     </div>
   );
 };

 // LINE登録ボタンのハンドラー
 const handleLineRegistration = () => {
   // 直接 LINE 公式アカウントへ遷移
   window.open('https://lin.ee/mjMTBEh', '_blank');
   setMessages(prev => [
     ...prev,
     { role: 'bot', text: 'LINE公式アカウントの登録ページを開きました。登録後、LINEでのやり取りに移行します。' }
   ]);
   scrollToBottom();
 };

 // LINE登録完了ボタンのハンドラー
 const handleLineRegistrationComplete = () => {
   setShowLineQR(false);
   setMessages(prev => [
     ...prev,
     { role: 'user', text: 'LINE登録完了しました' },
     { role: 'bot', text: 'LINE登録ありがとうございます！今後はLINEでのやりとりをさせていただきます。担当者から24時間以内にご連絡いたします。' }
   ]);
   scrollToBottom();
 };

 // 決済ボタンのハンドラー
 const handlePayment = () => {
   setMessages(prev => [
     ...prev,
     { role: 'user', text: '決済に進みます' }
   ]);

   // サーバー側でチェックアウトセッションを作成
   fetch('/api/create-checkout-session', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' }
   })
     .then(res => res.json())
     .then(data => {
       if (data.url) {
         window.location.href = data.url; // Stripe Hosted Checkout へリダイレクト
       } else {
         throw new Error('Stripe セッションURLが取得できませんでした');
       }
     })
     .catch(err => {
       console.error(err);
       setMessages(prev => [
         ...prev,
         { role: 'bot', text: '決済ページへの遷移中にエラーが発生しました。時間を置いて再度お試しください。' }
       ]);
       scrollToBottom();
     });
 };

 // クイックアクセストピックをクリックした時の処理
 const handleQuickAccessClick = (topicId: string) => {
   // ユーザーのメッセージを追加
   const topic = QUICK_ACCESS_TOPICS.find(t => t.id === topicId);
   if (!topic) return;
   
   setMessages(prev => [...prev, { role: 'user', text: topic.label }]);
   
   // インテントに基づいた応答を取得
   setTimeout(() => {
     const responseText = getStandardResponse(topicId);
     setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
     scrollToBottom();
   }, 500);
 };

 // ヒアリングシート開始ボタンを表示する関数
 const renderStartHearingButton = () => {
   if (!showStartHearingButton || isHearingSheetMode || hearingCompleted || showLineQR) return null;

   return (
     <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 ${isDesktop ? 'w-full' : 'w-full max-w-sm'} mb-4`}>
       <h3 className="font-bold text-center mb-2 text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent select-none">
         最短1分かんたん手続き
       </h3>
       <div className="flex justify-center text-2xl mb-4 text-indigo-500 animate-bounce select-none">
         ↓↓↓↓↓
       </div>

       <button
         onClick={startHearingSheet}
         className="w-full py-5 px-6 flex items-center justify-between bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl hover:brightness-110 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-indigo-300"
       >
         <div className="flex items-center">
           <div className="mr-3 bg-white/20 p-3 rounded-full shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
             </svg>
           </div>
           <div className="text-center flex-1">
             <div className="font-semibold text-base sm:text-lg">すぐに依頼する</div>
             <div className="text-xs sm:text-sm text-white/80">質問に答えるだけでかんたんスタート</div>
           </div>
         </div>
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
         </svg>
       </button>
     </div>
   );
 };

 // クイックアクセスボタンを表示する関数
 const renderQuickAccessButtons = () => {
   if (isHearingSheetMode || hearingCompleted || showLineQR) return null;

   return (
     <div className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 ${isDesktop ? 'w-full' : 'w-full max-w-sm'} mb-4`}>
       <h3 className="font-medium text-gray-900 mb-4 text-lg">よくある質問</h3>
       
       <div className="space-y-3">
         {QUICK_ACCESS_TOPICS.map((topic) => (
           <button
             key={topic.id}
             onClick={() => handleQuickAccessClick(topic.id)}
             className="w-full py-3 px-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
           >
             {topic.label}
           </button>
         ))}
       </div>
     </div>
   );
 };

 // ===========================
 // テキストレンダリングユーティリティ
 // ===========================

 // URL を自動リンク化し改行も保持
 const renderTextWithLinks = (text: string) => {
   const urlRegex = /(https?:\/\/[^\s]+)/g;
   const parts = text.split(urlRegex);
   return parts.map((part, idx) => {
     if (urlRegex.test(part)) {
       return (
         <a
           key={`url-${idx}`}
           href={part}
           target="_blank"
           rel="noopener noreferrer"
           className="text-blue-600 underline hover:text-blue-800 break-all"
         >
           {part}
         </a>
       );
     }
     // 改行を保持しつつテキストを返却
     return part.split('\n').map((line, lineIdx) => (
       <React.Fragment key={`txt-${idx}-${lineIdx}`}>
         {line}
         {lineIdx < part.split('\n').length - 1 && <br />}
       </React.Fragment>
     ));
   });
 };

 return (
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     transition={{ duration: 0.15 }}
     className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 pt-16"
   >
     <motion.div
       initial={{ y: 32, opacity: 0, scale: 0.95 }}
       animate={{ y: 0, opacity: 1, scale: 1 }}
       exit={{ y: 32, opacity: 0, scale: 0.95 }}
       transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
       className={`bg-white rounded-2xl ${isDesktop ? 'w-full max-w-5xl' : 'w-full max-w-md'} max-h-[calc(90vh-4rem)] flex flex-col shadow-2xl overflow-hidden border border-white/40 ring-2 ring-white/10`}
     >
       {/* ヘッダー */}
       <div className="flex justify-between items-center p-5 bg-gradient-to-r from-indigo-800 via-indigo-700 to-blue-600 text-white border-b border-indigo-500/30 flex-shrink-0">
         <h2 className="text-xl font-bold">退職あんしん代行</h2>
         <button
           onClick={onClose}
           className="text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10 p-2"
         >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
         </button>
       </div>
       
       {/* コンテンツエリア */}
       <div className="flex flex-1 overflow-hidden">
         {/* メインコンテンツエリア */}
         <div className={`flex-1 flex flex-col overflow-hidden ${isDesktop && !isHearingSheetMode && !hearingCompleted && !showLineQR ? 'w-3/5' : 'w-full'}`}>
           {/* メッセージ表示 or ヒアリングシート表示 */}
           <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white relative">
             {isHearingSheetMode ? (
               renderCurrentQuestion()
             ) : hearingCompleted ? (
               showLineQR ? renderLineQR() : renderCompletionActions()
             ) : (
               <div className="relative"> 
                 {/* 通常のチャットメッセージ表示 */} 
                 <AnimatePresence>
                   {messages.map((message, index) => (
                     <motion.div
                       key={index}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.3 }}
                       className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}
                     >
                       <div
                         className={`inline-block p-4 rounded-xl shadow-sm ${
                           message.role === 'user'
                             ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none' 
                             : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                         } max-w-[85%]`}
                       >
                         {renderTextWithLinks(message.text)}
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
                 
                 {/* ローディングインジケータ */}
                 {isLoading && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex items-center mb-4"
                   >
                     <div className="bg-white text-gray-800 p-4 rounded-xl rounded-tl-none shadow-sm border border-gray-100 inline-block">
                       <div className="flex space-x-2">
                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                       </div>
                     </div>
                   </motion.div>
                 )}
                 
                 {/* エラーメッセージ */}
                 {error && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 shadow-sm"
                   >
                     {error}
                   </motion.div>
                 )}
                 
                 {/* 自動スクロール用の参照ポイント */} 
                 <div ref={messagesEndRef} />
                 
                 {/* スマホ版のアクションボタン（チャット表示時） */} 
                 {!isDesktop && !isHearingSheetMode && !hearingCompleted && !showLineQR && (
                   <div className="p-4 mt-4 space-y-4 border-t border-gray-100 bg-white flex flex-col items-center w-full">
                     {renderStartHearingButton()}
                     {renderQuickAccessButtons()}
                   </div>
                 )}
               </div>
             )}
           </div>
           
           {/* 入力エリア（通常チャットモード時） */} 
           {!isHearingSheetMode && !hearingCompleted && !showLineQR && (
             <div className="border-t border-gray-100 p-4 bg-white flex-shrink-0">
               <div className="flex items-center">
                 <textarea
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={handleKeyDown}
                   placeholder="メッセージを入力..."
                   className="flex-1 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                   rows={1}
                 />
                 <button
                   onClick={sendMessage}
                   disabled={isLoading}
                   className="ml-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50 shadow-sm"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                   </svg>
                 </button>
               </div>
             </div>
           )}
         </div>
         
         {/* 右側: アクションボタンエリア（デスクトップの通常モード時） */}
         {isDesktop && !isHearingSheetMode && !hearingCompleted && !showLineQR && (
           <div className="w-2/5 border-l border-gray-200 p-4 bg-gray-50 overflow-y-auto flex-shrink-0">
             <div className="space-y-4">
               {renderStartHearingButton()}
               {renderQuickAccessButtons()}
             </div>
           </div>
         )}
       </div>
     </motion.div>
   </motion.div>
 );
} 