import { NextRequest, NextResponse } from 'next/server';

// APIレスポンスの型（型はコンポーネントとの整合性を保つ）
interface ApiResponse {
  runId?: string;
  status: 'RUNNING' | 'SUSPENDED' | 'COMPLETED' | 'FAILED';
  suspendPayload?: {
    message: string;
    inputType?: 'text' | 'number' | 'select';
    options?: string[];
    inputKey?: string;
    stepId?: string;
  };
  message?: string;
  result?: any;
}

// ワークフローのモックデータ - 本番環境では実際のMastraワークフローと連携
const MOCK_WORKFLOW_STEPS = [
  {
    id: 'companyName',
    message: '現在お勤めの会社名を教えてください。',
    inputType: 'text',
    inputKey: 'companyName',
  },
  {
    id: 'industry',
    message: '業種を選択してください。',
    inputType: 'select',
    inputKey: 'industry',
    options: ['IT・通信', '金融・保険', '製造', '小売・流通', '医療・福祉', '建設・不動産', 'サービス業', '公務員・教育', 'その他'],
  },
  {
    id: 'position',
    message: '現在の役職を教えてください。',
    inputType: 'select',
    inputKey: 'position',
    options: ['一般社員', '主任・係長', '課長', '部長', '役員', 'その他'],
  },
  {
    id: 'employmentPeriod',
    message: '勤続年数を教えてください。',
    inputType: 'select',
    inputKey: 'employmentPeriod',
    options: ['1年未満', '1年以上3年未満', '3年以上5年未満', '5年以上10年未満', '10年以上'],
  },
  {
    id: 'resignReason',
    message: '退職理由を教えてください。',
    inputType: 'select',
    inputKey: 'resignReason',
    options: ['転職', '健康上の理由', '人間関係', '労働条件', '会社の将来性への不安', 'その他'],
  },
  {
    id: 'lineRegistration',
    message: 'ありがとうございます。当社から詳細な退職代行サービスのご案内をさせていただきます。\n\nLINEで詳細な情報提供とご相談を継続するため、下のQRコードから公式アカウントを追加してください。',
    inputType: 'select',
    inputKey: 'lineRegistered',
    stepId: 'lineRegistration',
  }
];

// ワークフローの状態を保持するインメモリストア（実際の実装ではデータベースやMastraのワークフロー状態管理を使用）
type WorkflowState = {
  runId: string;
  currentStepIndex: number;
  context: Record<string, any>;
  complete: boolean;
};

// サンプル用の一時的な状態ストア
const workflowStates = new Map<string, WorkflowState>();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('APIリクエスト:', data);

    // 新しいワークフローを開始
    if (!data.runId) {
      return startNewWorkflow();
    }
    
    // 既存のワークフローを再開
    return resumeWorkflow(data.runId, data.resumeData);
  } catch (error) {
    console.error('APIエラー:', error);
    return NextResponse.json({ 
      error: `APIエラー: ${(error as Error).message}` 
    }, { status: 500 });
  }
}

// 新しいワークフローを開始する関数
function startNewWorkflow(): NextResponse {
  // 一意のIDを生成
  const runId = `run-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // 最初のステップを取得
  const firstStep = MOCK_WORKFLOW_STEPS[0];
  
  // ワークフロー状態を初期化
  workflowStates.set(runId, {
    runId,
    currentStepIndex: 0,
    context: {},
    complete: false
  });
  
  // 応答を返す
  const response: ApiResponse = {
    runId,
    status: 'SUSPENDED',
    suspendPayload: {
      message: firstStep.message,
      inputType: firstStep.inputType as 'text' | 'number' | 'select',
      options: firstStep.options,
      inputKey: firstStep.inputKey,
      stepId: firstStep.id
    }
  };
  
  return NextResponse.json(response);
}

// 既存のワークフローを再開する関数
function resumeWorkflow(runId: string, resumeData: any): NextResponse {
  // ワークフロー状態を取得
  const workflow = workflowStates.get(runId);
  
  if (!workflow) {
    return NextResponse.json({ 
      error: `指定されたワークフロー (${runId}) が見つかりません。` 
    }, { status: 404 });
  }
  
  if (workflow.complete) {
    return NextResponse.json({ 
      runId,
      status: 'COMPLETED',
      message: 'このワークフローは既に完了しています。' 
    });
  }
  
  // 入力データをコンテキストに追加
  if (resumeData && resumeData.context) {
    workflow.context = { ...workflow.context, ...resumeData.context };
  }
  
  // 特殊なステップを処理
  if (resumeData?.stepId === 'lineRegistration' && resumeData.context?.lineRegistered) {
    // LINE登録完了の場合、ワークフローを完了状態に設定
    workflow.complete = true;
    workflowStates.set(runId, workflow);
    
    return NextResponse.json({
      runId,
      status: 'COMPLETED',
      message: 'ありがとうございました！当社の担当者から3営業日以内にLINEでご連絡いたします。それまでお待ちください。'
    });
  }
  
  // 次のステップに進む
  workflow.currentStepIndex++;
  
  // すべてのステップが完了した場合
  if (workflow.currentStepIndex >= MOCK_WORKFLOW_STEPS.length) {
    workflow.complete = true;
    workflowStates.set(runId, workflow);
    
    // 収集したデータに基づいて、パーソナライズされた完了メッセージを作成
    const company = workflow.context.companyName || 'お勤め先';
    let completionMessage = `${company}からの退職をサポートさせていただきます。\n\n`;
    completionMessage += '当社の退職代行サービスは以下を提供します：\n';
    completionMessage += '・会社への退職意思の伝達\n';
    completionMessage += '・退職に必要な手続きのアドバイス\n';
    completionMessage += '・円満退職のためのサポート\n\n';
    completionMessage += 'LINEでのご登録ありがとうございました。詳細は担当者からご連絡いたします。';
    
    return NextResponse.json({
      runId,
      status: 'COMPLETED',
      message: completionMessage,
      result: workflow.context
    });
  }
  
  // 次のステップを取得
  const nextStep = MOCK_WORKFLOW_STEPS[workflow.currentStepIndex];
  workflowStates.set(runId, workflow);
  
  // 応答を返す
  const response: ApiResponse = {
    runId,
    status: 'SUSPENDED',
    suspendPayload: {
      message: nextStep.message,
      inputType: nextStep.inputType as 'text' | 'number' | 'select',
      options: nextStep.options,
      inputKey: nextStep.inputKey,
      stepId: nextStep.id
    }
  };
  
  return NextResponse.json(response);
} 