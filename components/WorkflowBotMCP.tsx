"use client";

import React, { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
// 実際のMCP設定ができるまでこれらをコメントアウト
// import { MCPConfiguration } from '@mastra/mcp';
// import { Memory } from '@mastra/memory';
// import { openai } from '@ai-sdk/openai';
// import { anthropic } from '@ai-sdk/anthropic';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, X } from 'lucide-react';
import { cn } from '../lib/utils';
// import { taishokuWorkflow } from '@/lib/workflow/taishoku-workflow'; // 古い定義を削除
import { addBotMessage, typeMessage } from '../lib/utils/chat-utils';
import {
  ChatMessage,
  WorkflowProps,
  // Memory // MemoryはMastraが管理
} from '../lib/workflow/types'; // 古い型定義の一部を削除または見直し

// Mastra Workflowとメッセージ定数をインポート
// import {
//   mastra,
//   taishokuChatWorkflow,
//   WELCOME_MESSAGE,
//   FINAL_MESSAGE
// } from '@/lib/mastra/taishoku-workflow-mastra';
// import { RunStatus, Run } from '@mastra/core'; // 型エラーのためコメントアウト
// type Run = any; // 必要であればanyで仮置き
// const RunStatus = { // 文字列リテラルを使用するためenum定義は不要
//   Running: "RUNNING",
//   Suspended: "SUSPENDED",
//   Completed: "COMPLETED",
//   Failed: "FAILED"
// } as const;

// suspend payloadの型 (ワークフロー定義から流用するか、別途定義)
interface SuspendPayload {
  message: string;
  inputType?: 'text' | 'number' | 'select';
  options?: string[];
  inputKey?: string;
  stepId?: string;
}

// ワークフローコンポーネント
export function WorkflowBotMCP({ onComplete, isOpen, onClose }: WorkflowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const [lineRegComplete, setLineRegComplete] = useState(false); // これは最終ステップのUI用なので残す
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Mastra Workflow実行関連のstate
  const [currentRunId, setCurrentRunId] = useState<string | null>(null); // runIdを保持するstate
  const [isSuspended, setIsSuspended] = useState(false);
  const [suspendPayload, setSuspendPayload] = useState<SuspendPayload | null>(null);
  const [workflowResult, setWorkflowResult] = useState<any>(null);

  // 初期化処理が実行されたかを追跡するRef
  const initializedRef = useRef(false);

  // メッセージ表示領域に自動スクロール
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // キーボードショートカット（Enter送信、Shift+Enterで改行）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && inputRef.current === document.activeElement) {
        // 現在のワークフローが中断中でテキスト入力を期待している場合
        if (isSuspended && (suspendPayload?.inputType === 'text' || suspendPayload?.inputType === 'number')) {
          e.preventDefault();
          // フォームSubmitイベントを発火させる
          if (inputRef.current?.form) {
            inputRef.current.form.requestSubmit();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSuspended, suspendPayload, input]); // inputを依存関係に追加

  // --- API呼び出し関数 --- (useEffectより前に定義)
  const callWorkflowApi = useCallback(async (data: any) => {
    try {
      console.log('API呼び出し:', data);
      const response = await fetch('/api/workflow-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = `API request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error("レスポンスのJSONパースに失敗:", parseError);
          // HTMLが返ってきている可能性があるので、テキストとして読み込む
          const textResponse = await response.text();
          console.error("エラーレスポンス:", textResponse.substring(0, 500)); // 長い場合は一部だけログ出力
          if (textResponse.includes('<!DOCTYPE')) {
            errorMessage = "APIエンドポイントが見つかりません。HTMLページが返されました。";
          }
        }
        throw new Error(errorMessage);
      }

      try {
        const result = await response.json();
        console.log('API Response:', result);
        return result;
      } catch (parseError) {
        console.error("成功レスポンスのJSONパースに失敗:", parseError);
        throw new Error("APIからの応答を解析できませんでした。");
      }
    } catch (error: any) {
      console.error("API Call Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: `エラーが発生しました: ${error.message}` }]);
      setIsSuspended(false);
      setSuspendPayload(null);
      return null;
    }
  }, []);

  // --- ワークフロー開始と状態更新ロジック ---
  useEffect(() => {
    // モーダルが開いていない場合はスキップ
    if (!isOpen) return;
    
    // 既に初期化済みの場合はスキップ（重複初期化防止）
    if (initializedRef.current) {
      console.log('既に初期化済みのためスキップ');
      return;
    }

    console.log('モーダル初期化処理を開始');
    
    // 状態リセット
    setMessages([]);
    setInput('');
    setTypingMessageIndex(null);
    setIsSuspended(false);
    setSuspendPayload(null);
    setCurrentRunId(null);
    setWorkflowResult(null);
    setLineRegComplete(false);
    
    // APIの呼び出しをブロックするフラグを立てる
    let isApiCalled = false;

    // 歓迎メッセージを表示
    const welcomeMsg = "こんにちは！退職あんしん代行のチャットへようこそ😊\nまずは\"たった５問\"だけお願いします！";
    const welcomeChatMessage: ChatMessage = { role: 'bot', text: welcomeMsg };
    console.log('歓迎メッセージを設定:', welcomeChatMessage);
    setMessages([welcomeChatMessage]);
    
    // 少し遅延させてからAPIを呼び出し
    const timer = setTimeout(() => {
      // 重複呼び出し防止
      if (isApiCalled) {
        console.log('既にAPI呼び出し済みのためスキップ');
        return;
      }
      
      isApiCalled = true;
      console.log('ワークフロー開始API呼び出し');
      
      // APIを呼び出してワークフローを開始
      callWorkflowApi({}).then(result => {
        if (!result) {
          console.error('APIの呼び出しに失敗しました');
          setMessages(prev => [...prev, {
            role: 'bot',
            text: "申し訳ありません。システムエラーが発生しました。\nページを再読み込みして再度お試しください。"
          }]);
          return;
        }
        
        // 初期化完了フラグを設定
        initializedRef.current = true;
        
        if (result.runId) {
          console.log('ワークフローrunId取得:', result.runId);
          setCurrentRunId(result.runId);
          
          if (result.status === 'SUSPENDED' && result.suspendPayload) {
            console.log('ワークフロー開始 -> 中断状態:', result.suspendPayload);
            setIsSuspended(true);
            const payload = result.suspendPayload as SuspendPayload;
            setSuspendPayload(payload);
            
            // 質問メッセージを表示
            const botMessage: ChatMessage = { role: 'bot', text: payload.message };
            console.log('質問メッセージを設定:', botMessage);
            setMessages(prev => {
              console.log('現在のメッセージ配列:', prev, '新しいメッセージ:', botMessage);
              return [...prev, botMessage];
            });
          } else {
            console.warn('Workflow started but initial status is not SUSPENDED:', result.status);
            setMessages(prev => [...prev, {
              role: 'bot',
              text: "チャットの準備ができませんでした。もう一度お試しください。"
            }]);
          }
        } else {
          console.error('APIレスポンスにrunIdがありません:', result);
          setMessages(prev => [...prev, {
            role: 'bot',
            text: "サーバーからの応答に問題がありました。\nページを再読み込みして再度お試しください。"
          }]);
        }
      }).catch(err => {
        console.error('ワークフロー開始エラー:', err);
        setMessages(prev => [...prev, {
          role: 'bot',
          text: `エラーが発生しました: ${err.message}\nページを再読み込みして再度お試しください。`
        }]);
      });
    }, 1500); // 遅延時間を1.5秒に増やして、歓迎メッセージが確実に表示されるまで待つ
     
    return () => {
      clearTimeout(timer); // タイマーのクリーンアップ
    };
  }, [isOpen, callWorkflowApi]); // callWorkflowApiを依存配列に追加
  
  // モーダルが閉じられたときの初期化処理
  useEffect(() => {
    if (!isOpen && initializedRef.current) {
      console.log('モーダル閉鎖検知 - 初期化フラグをリセット');
      initializedRef.current = false;
      setCurrentRunId(null);
      setMessages([]);
      setIsSuspended(false);
      setSuspendPayload(null);
    }
  }, [isOpen]);

  // ユーザーメッセージ送信処理 (テキスト/数値入力)
  const handleSendMessage = useCallback(async () => {
    const textInput = input.trim();
    if (!textInput || !currentRunId || !isSuspended || !suspendPayload?.inputKey || !suspendPayload?.stepId) return;

    const payloadKey = suspendPayload.inputKey;
    const stepIdToResume = suspendPayload.stepId;
    console.log(`テキスト/数値入力送信: Run=${currentRunId}, Step=${stepIdToResume}, Key=${payloadKey}, 値=${textInput}`);
    
    // 入力をクリアして送信中の状態にする（先に行う）
    setInput('');
    setIsSuspended(false);
    setSuspendPayload(null);
    
    // ユーザーメッセージを表示（その後に返信を追加する）
    const userMessage: ChatMessage = { role: 'user', text: textInput };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // APIを呼び出してワークフローを再開
      const result = await callWorkflowApi({
        runId: currentRunId,
        resumeData: {
          stepId: stepIdToResume,
          context: { [payloadKey]: textInput }
        }
      });

      if (!result) {
        console.error('APIから応答が返りませんでした');
        setMessages(prev => [...prev, { role: 'bot', text: 'エラーが発生しました。もう一度お試しください。' }]);
        return;
      }

      if (result.status === 'SUSPENDED' && result.suspendPayload) {
        // 次の質問があれば表示
        console.log('ワークフロー再開 -> 新たな中断状態:', result.suspendPayload);
        setIsSuspended(true);
        const nextPayload = result.suspendPayload as SuspendPayload;
        setSuspendPayload(nextPayload);
        
        // Bot応答を別のメッセージとして追加
        const nextMessage: ChatMessage = { role: 'bot', text: nextPayload.message };
        console.log('次の質問メッセージを設定:', nextMessage);
        setMessages(prev => {
          console.log('選択後現在のメッセージ配列:', prev, '次のメッセージ:', nextMessage);
          return [...prev, nextMessage];
        });
      } else if (result.status === 'COMPLETED') {
        // 完了処理
        console.log('ワークフロー完了 (API経由):', result);
        setWorkflowResult(result); // 必要なら結果を保存
        setIsSuspended(false);
        setSuspendPayload(null);
        
        // 完了メッセージ表示（APIからのメッセージをそのまま使用）
        const completionMessage = result.message || "ご相談ありがとうございました。当社の退職代行サービスでは、あなたに代わって退職の意思を会社に伝え、円滑な退職手続きをサポートいたします。";
        setMessages(prev => [...prev, { role: 'bot', text: completionMessage }]);
        
        // ワークフロー完了を親コンポーネントに通知（自動クローズはしない）
        if (onComplete) onComplete(result);
      } else {
        // 予期しない状態
        console.warn('Unexpected workflow status after resume:', result.status);
        setMessages(prev => [...prev, { role: 'bot', text: '処理中にエラーが発生しました。もう一度お試しください。' }]);
      }
    } catch (error) {
      console.error('メッセージ送信中にエラーが発生しました:', error);
      setMessages(prev => [...prev, { role: 'bot', text: `エラーが発生しました: ${(error as Error).message}` }]);
    }
  }, [input, currentRunId, isSuspended, suspendPayload, callWorkflowApi, onComplete, messages]); // messages を依存配列に追加

  // 選択肢クリック処理 (select入力)
  const handleOptionClick = useCallback(async (option: string) => {
    if (!currentRunId || !isSuspended || suspendPayload?.inputType !== 'select' || !suspendPayload?.inputKey || !suspendPayload?.stepId) return;
    
    const payloadKey = suspendPayload.inputKey;
    const stepIdToResume = suspendPayload.stepId;
    console.log(`選択肢クリック: Run=${currentRunId}, Step=${stepIdToResume}, Key=${payloadKey}, 値=${option}`);

    // 先に状態更新
    setIsSuspended(false);
    setSuspendPayload(null);
    
    // ユーザーの選択を表示
    const userMessage: ChatMessage = { role: 'user', text: option };
    setMessages(prev => [...prev, userMessage]);

    try {
      // APIを呼び出してワークフローを再開
      const result = await callWorkflowApi({
        runId: currentRunId,
        resumeData: {
          stepId: stepIdToResume,
          context: { [payloadKey]: option }
        }
      });

      if (!result) {
        console.error('APIから応答が返りませんでした');
        setMessages(prev => [...prev, { role: 'bot', text: 'エラーが発生しました。もう一度お試しください。' }]);
        return;
      }

      if (result.status === 'SUSPENDED' && result.suspendPayload) {
        // 次の質問があれば表示
        console.log('ワークフロー再開 -> 新たな中断状態:', result.suspendPayload);
        setIsSuspended(true);
        const nextPayload = result.suspendPayload as SuspendPayload;
        setSuspendPayload(nextPayload);
      
        // 新しいBotメッセージを追加
        const nextMessage: ChatMessage = { role: 'bot', text: nextPayload.message };
        console.log('次の質問メッセージを設定:', nextMessage);
        setMessages(prev => {
          console.log('選択後現在のメッセージ配列:', prev, '次のメッセージ:', nextMessage);
          return [...prev, nextMessage];
        });
      } else if (result.status === 'COMPLETED') {
        // 完了処理
        console.log('ワークフロー完了 (API経由):', result);
        setWorkflowResult(result); // 必要なら結果を保存
        setIsSuspended(false);
        setSuspendPayload(null);
        
        // 完了メッセージ表示（APIからのメッセージをそのまま使用）
        const completionMessage = result.message || "ご相談ありがとうございました。当社の退職代行サービスでは、あなたに代わって退職の意思を会社に伝え、円滑な退職手続きをサポートいたします。";
        setMessages(prev => [...prev, { role: 'bot', text: completionMessage }]);
        
        // ワークフロー完了を親コンポーネントに通知（自動クローズはしない）
        if (onComplete) onComplete(result);
      } else {
        // 予期しない状態
        console.warn('Unexpected workflow status after resume:', result.status);
        setMessages(prev => [...prev, { role: 'bot', text: '処理中にエラーが発生しました。もう一度お試しください。' }]);
      }
    } catch (error) {
      console.error('選択肢クリック処理中にエラーが発生しました:', error);
      setMessages(prev => [...prev, { role: 'bot', text: `エラーが発生しました: ${(error as Error).message}` }]);
    }
  }, [currentRunId, isSuspended, suspendPayload, callWorkflowApi, onComplete, messages]); // messages を依存配列に追加

  // LINEに登録完了ボタンのハンドラー
  const handleLineRegistrationComplete = useCallback(() => {
    // LINE登録完了を表示
    const userMessage: ChatMessage = { role: 'user', text: 'LINEに登録完了しました' };
    setMessages(prev => [...prev, userMessage]);
    
    // 最終ステップのワークフローを再開
    if (currentRunId && suspendPayload?.stepId === 'lineRegistration') {
      // ワークフロー❻の最終ステップを実行
      callWorkflowApi({
        runId: currentRunId,
        resumeData: {
          stepId: 'lineRegistration',
          context: { lineRegistered: true }
        }
      }).then(result => {
        if (result && result.status === 'COMPLETED') {
          // 完了処理
          setLineRegComplete(true);
          setWorkflowResult(result);
          // 完了メッセージ表示
          const finalMsg = result.message || 'ありがとうございます！今後はLINEで詳細なご案内をいたします。このウィンドウは閉じていただいて大丈夫です。';
          const completionMessage: ChatMessage = { role: 'bot', text: finalMsg };
          setMessages(prev => [...prev, completionMessage]);
          
          // 親コンポーネントに通知
          if (onComplete) onComplete(result);
        } else {
          // エラー処理
          addBotMessage(
            messages,
            setMessages,
            'LINEでの登録ありがとうございます。担当者から連絡いたします。このウィンドウは閉じていただいて大丈夫です。',
            setTypingMessageIndex
          );
        }
      }).catch(error => {
        console.error('LINE登録完了処理エラー:', error);
        addBotMessage(
          messages,
          setMessages,
          'ありがとうございます！今後はLINEで詳細なご案内をいたします。このウィンドウは閉じていただいて大丈夫です。',
          setTypingMessageIndex
        );
      });
    } else {
      // フォールバック処理（ワークフローのAPI呼び出しができない場合）
      setLineRegComplete(true);
      addBotMessage(
        messages,
        setMessages,
        'ありがとうございます！今後はLINEで詳細なご案内をいたします。このウィンドウは閉じていただいて大丈夫です。',
        setTypingMessageIndex
      );
    }
  }, [currentRunId, suspendPayload, messages, setMessages, callWorkflowApi, onComplete, setTypingMessageIndex]);

  // 入力欄のリサイズ処理
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  // --- 入力送信処理 (手入力のテキスト送信用) ---
  const handleSendText = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentRunId || !isSuspended) return;
    
    try {
      // ユーザー入力メッセージを追加
      const userMessage: ChatMessage = { role: 'user', text: input };
      console.log('ユーザー入力メッセージを追加:', userMessage);
      setMessages(prev => [...prev, userMessage]);
      setInput(''); // 入力フィールドをクリア
      
      // 一時的に中断状態を解除して入力を防止
      const tempPayload = suspendPayload;
      setIsSuspended(false);
      
      // suspendPayloadがnullの場合の対応
      if (!tempPayload || !tempPayload.stepId) {
        console.error('suspendPayloadが不正です');
        setMessages(prev => [...prev, { role: 'bot', text: 'エラーが発生しました。ページを再読み込みしてください。' }]);
        return;
      }
      
      // APIを呼び出してワークフローを再開
      console.log('テキスト入力でワークフロー再開 runId:', currentRunId, 'input:', input);
      const result = await callWorkflowApi({
        runId: currentRunId,
        resumeData: {
          stepId: tempPayload.stepId,
          context: { [tempPayload.inputKey || 'input']: input.trim() }
        }
      });
      
      if (!result) {
        console.error('APIから応答が返りませんでした (テキスト送信)');
        setMessages(prev => [...prev, { role: 'bot', text: 'エラーが発生しました。もう一度お試しください。' }]);
        return;
      }
      
      // APIレスポンス処理
      if (result.status === 'SUSPENDED' && result.suspendPayload) {
        // 次の質問があれば表示
        console.log('テキスト送信後 -> 新たな中断状態:', result.suspendPayload);
        setIsSuspended(true);
        const nextPayload = result.suspendPayload as SuspendPayload;
        setSuspendPayload(nextPayload);
        
        // 新しいBotメッセージを追加
        const nextMessage: ChatMessage = { role: 'bot', text: nextPayload.message };
        console.log('テキスト送信後の質問メッセージを設定:', nextMessage);
        setMessages(prev => [...prev, nextMessage]);
      } else if (result.status === 'COMPLETED') {
        // 完了処理
        console.log('ワークフロー完了 (テキスト送信):', result);
        setWorkflowResult(result);
        setIsSuspended(false);
        setSuspendPayload(null);
        
        // 完了メッセージ表示
        const completionMessage = result.message || "ご相談ありがとうございました。当社の退職代行サービスでは、あなたに代わって退職の意思を会社に伝え、円滑な退職手続きをサポートいたします。";
        setMessages(prev => [...prev, { role: 'bot', text: completionMessage }]);
        
        // ワークフロー完了を親コンポーネントに通知
        if (onComplete) onComplete(result);
      } else {
        // 予期しない状態
        console.warn('Unexpected workflow status after text input:', result.status);
        setMessages(prev => [...prev, { role: 'bot', text: '処理中にエラーが発生しました。もう一度お試しください。' }]);
      }
    } catch (error) {
      console.error('テキスト送信処理中にエラーが発生しました:', error);
      setMessages(prev => [...prev, { role: 'bot', text: `エラーが発生しました: ${(error as Error).message}` }]);
    }
  };

  // チャットモーダルのレンダリング
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* オーバーレイ背景 */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* チャットボットUI本体 */}
      <motion.div 
        className="relative flex flex-col w-full max-w-lg h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/40 ring-2 ring-white/10"
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 text-white border-b border-emerald-500/30">
          <h3 className="text-xl font-bold">退職あんしん代行チャット</h3>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-emerald-600/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* メッセージ表示エリア */}
        <div 
          className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white"
          ref={messageContainerRef}
        >
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "mb-4 max-w-[85%]",
                  message.role === 'user' ? "ml-auto" : "mr-auto"
                )}
              >
                <div className={cn(
                  "rounded-xl px-4 py-3 shadow-sm",
                  message.role === 'user' 
                    ? "bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-tr-none" 
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                )}>
                  {/* タイピングアニメーション表示 */}
                  {typingMessageIndex === index ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="whitespace-pre-line"
                    >
                      {message.text}
                    </motion.div>
                  ) : (
                    <div className="whitespace-pre-line">{message.text}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* 選択肢オプション（存在する場合のみ表示） */}
          {isSuspended && suspendPayload?.inputType === 'select' && suspendPayload.options && suspendPayload.options.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col space-y-2 mt-2"
            >
              {suspendPayload.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors shadow-sm"
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
          
          {/* LINE登録ステップの特別UI */}
          {isSuspended && suspendPayload?.stepId === 'lineRegistration' && !lineRegComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center space-y-4 mt-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
            >
              <p className="text-center text-sm text-gray-600">
                以下のQRコードをスキャンして、公式LINEアカウントを追加してください。
                追加後に下のボタンをクリックしてください。
              </p>
              
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                {/* LINE QRコード画像（実際のQRコードに変更すること） */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                  {/* QRコード画像を表示するか、ダミー表示 */}
                  <span className="text-sm text-gray-500">LINE QRコード</span>
                </div>
              </div>
              
              <button
                onClick={handleLineRegistrationComplete}
                className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-colors font-medium shadow-sm"
              >
                LINEに登録完了しました
              </button>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* 入力エリア */}
        {(isSuspended && !lineRegComplete && suspendPayload?.inputType !== 'select' && suspendPayload?.stepId !== 'lineRegistration') && (
          <form onSubmit={handleSendText} className="border-t border-gray-100 p-4 bg-white">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={handleTextareaInput}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                placeholder="メッセージを入力..."
                className={cn(
                  "w-full px-4 py-3 pr-12 resize-none rounded-lg border",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                  hasFocus ? "border-emerald-300" : "border-gray-200",
                  "max-h-[120px] min-h-[44px] transition-all"
                )}
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full",
                  "transition-colors",
                  input.trim()
                    ? "text-emerald-500 hover:bg-emerald-50"
                    : "text-gray-400 cursor-not-allowed"
                )}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        )}
        
        {/* 完了またはクローズボタン */}
        {(lineRegComplete || (isSuspended && suspendPayload?.stepId === 'completed')) && (
          <div className="border-t border-gray-100 p-4 bg-white">
            <button
              onClick={onClose}
              className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-colors font-medium shadow-sm"
            >
              閉じる
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 