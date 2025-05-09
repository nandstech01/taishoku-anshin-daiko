"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { WorkflowBotMCP } from "./WorkflowBotMCP";
import BotSelectModal from "./BotSelectModal";
import BotModal from "./BotModal";

interface WorkflowBotTriggerProps {
  buttonLabel?: React.ReactNode;
  buttonClassName?: string;
  onComplete?: (result: any) => void;
}

export function WorkflowBotTrigger({
  buttonLabel = "最速１分でかんたん退職",
  buttonClassName = "px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors text-lg shadow-md",
  onComplete
}: WorkflowBotTriggerProps) {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showQuickFormModal, setShowQuickFormModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleComplete = (result: any) => {
    if (onComplete) {
      onComplete(result);
    }
    // モーダルは閉じない - ユーザーが閉じるまで表示したままにする
  };

  // 選択モーダルを閉じる
  const handleCloseSelectModal = () => {
    setShowSelectModal(false);
  };

  // すぐに退職依頼する（BotModal）を選択
  const handleSelectQuickForm = () => {
    setShowSelectModal(false);
    setShowQuickFormModal(true);
  };

  // 相談しながら依頼する（WorkflowBotMCP）を選択
  const handleSelectConsultation = () => {
    setShowSelectModal(false);
    setShowConsultationModal(true);
  };

  return (
    <>
      <button
        onClick={() => setShowSelectModal(true)}
        className={`relative ${buttonClassName}`}
      >
        {buttonLabel}
        <ArrowRight size={18} className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2" />
      </button>
      
      {/* 選択モーダル */}
      {showSelectModal && (
        <BotSelectModal
          onClose={handleCloseSelectModal}
          onSelectQuickForm={handleSelectQuickForm}
          onSelectConsultation={handleSelectConsultation}
        />
      )}

      {/* すぐに退職依頼するモーダル */}
      {showQuickFormModal && (
        <BotModal
          onClose={() => setShowQuickFormModal(false)}
        />
      )}

      {/* 相談しながら依頼するモーダル */}
      {showConsultationModal && (
        <WorkflowBotMCP
          isOpen={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
          onComplete={handleComplete}
        />
      )}
    </>
  );
} 