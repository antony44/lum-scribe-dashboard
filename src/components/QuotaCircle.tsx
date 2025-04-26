
import React from "react";

interface QuotaCircleProps {
  percent: number;
}

export default function QuotaCircle({ percent }: QuotaCircleProps) {
  // SVG circle animation values
  const radius = 46;
  const stroke = 9;
  const norm = 2 * Math.PI * radius;
  const progress = norm * (1 - percent / 100);

  // Animate color for <20%
  const mainColor = percent < 20 ? "#B91226" : "#2563eb"; // accent red or blue

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl border shadow-sm p-4 min-w-[150px]">
      <div className="relative w-[110px] h-[110px] flex items-center justify-center">
        <svg width={110} height={110} className="rotate-[-90deg]">
          <circle
            cx={55}
            cy={55}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          <circle
            cx={55}
            cy={55}
            r={radius}
            fill="none"
            stroke={mainColor}
            strokeWidth={stroke}
            strokeDasharray={norm}
            strokeDashoffset={progress}
            strokeLinecap="round"
            className={`transition-all duration-700 ${percent < 20 ? 'animate-pulse' : ''}`}
            style={{ filter: percent < 20 ? "drop-shadow(0 0 4px #B91226)" : undefined }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">
          {percent} <span className="text-base font-medium ml-1">%</span>
        </span>
      </div>
      <div className="text-sm text-muted-foreground mt-2">Quota restant</div>
    </div>
  );
}
