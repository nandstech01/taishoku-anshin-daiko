interface ChartProps {
  data: {
    date: string;
    views: number;
  }[];
}

export function Chart({ data }: ChartProps) {
  return (
    <div className="h-64 bg-gray-50 rounded p-4">
      <div className="text-center text-gray-500">
        グラフ表示用のライブラリを実装予定
      </div>
    </div>
  );
} 