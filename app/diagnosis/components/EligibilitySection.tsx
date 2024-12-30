import { Check } from "lucide-react";

export default function EligibilitySection() {
  return (
    <div className="mb-12">
      {/* Header with woman illustration */}
      <div className="bg-emerald-500 rounded-t-xl p-6 relative">
        <h2 className="text-white text-2xl font-bold">
          当サービスをご利用できる方
        </h2>
        
        {/* Woman illustration */}
        <div className="absolute top-4 right-4 flex items-start">
          <div className="relative">
            {/* Warning icon */}
            <div className="absolute -top-2 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center z-10">
              <span className="text-black font-bold">!</span>
            </div>
            {/* Woman illustration - replace src with actual image */}
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNFMEYyRjEiLz48L3N2Zz4="
              alt="Woman illustration"
              className="w-20 h-20"
            />
          </div>
        </div>
      </div>

      {/* Eligibility criteria */}
      <div className="bg-white rounded-b-xl p-6 shadow-lg">
        <div className="space-y-6">
          {[
            {
              text: "現在の会社を退職する前，または退職予定の方",
              subtext: "",
            },
            {
              text: "社会保険の適用期間が12ヶ月以上の方",
              subtext: "（現在の会社だけではなく、それ以前の会社も含む）",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-emerald-500 rounded-full p-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-emerald-800 text-lg font-medium">
                  {item.text}
                  {item.subtext && (
                    <span className="text-emerald-700 text-base block mt-1">
                      {item.subtext}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 