/**
 * チャットメッセージの型定義
 */
export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

/**
 * ワークフローコンポーネントのprops
 */
export interface WorkflowProps {
  onComplete?: (result: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ワークフローステップの入力タイプ
 */
export type InputType = 'text' | 'number' | 'select';

/**
 * ワークフローの実行状態
 */
export type RunStatus = 'RUNNING' | 'SUSPENDED' | 'COMPLETED' | 'FAILED';

/**
 * APIからのレスポンス型
 */
export interface ApiResponse {
  runId?: string;
  status: RunStatus;
  suspendPayload?: {
    message: string;
    inputType?: InputType;
    options?: string[];
    inputKey?: string;
    stepId?: string;
  };
  message?: string;
  result?: any;
} 