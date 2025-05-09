import { ChatMessage } from "../workflow/types";

/**
 * チャットボットのメッセージをタイピングエフェクト付きで追加する
 */
export const addBotMessage = (
  messages: ChatMessage[],
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  text: string,
  setTypingMessageIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
  // 新しいメッセージを追加し、そのインデックスを取得
  const newMessage: ChatMessage = { role: 'bot', text };
  setMessages(prev => [...prev, newMessage]);
  
  // タイピングアニメーションインデックスをセット
  const newIndex = messages.length;
  setTypingMessageIndex(newIndex);
  
  // タイピングアニメーション終了後にnullに戻す
  setTimeout(() => {
    setTypingMessageIndex(null);
  }, 1500);
};

/**
 * テキストを徐々に表示するタイピングエフェクト
 */
export const typeMessage = (
  message: string,
  setDisplayedText: React.Dispatch<React.SetStateAction<string>>,
  speed = 30
) => {
  let i = 0;
  const typing = setInterval(() => {
    if (i < message.length) {
      setDisplayedText(message.substring(0, i + 1));
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
  
  return () => clearInterval(typing);
}; 