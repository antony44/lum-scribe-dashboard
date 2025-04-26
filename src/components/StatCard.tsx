
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

type StatCardProps = {
  value: string | number;
  label: string;
  trend?: string;
  color?: string;
  badge?: string;
  tooltip?: string;
  children?: React.ReactNode;
};

export default function StatCard({ value, label, trend, color, badge, tooltip, children }: StatCardProps) {
  return (
    <div className="flex flex-col dark:bg-[#161C24] dark:border-[#202837]/50 rounded-xl border px-5 py-4 shadow-sm min-w-[110px] max-w-[170px] flex-1 justify-between">
      <div className="flex items-center">
        <span className="text-2xl font-bold mr-2 dark:text-white">{value}</span>
        {badge && (
          <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold rounded px-2 py-0.5 ml-1">
            {badge}
          </span>
        )}
        {trend && (
          <span className="text-xs font-medium text-green-500 dark:text-green-400 ml-1">{trend}</span>
        )}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-1 text-gray-400 dark:text-gray-500 cursor-pointer">?</span>
            </TooltipTrigger>
            <TooltipContent>
              <span className="dark:text-gray-200">{tooltip}</span>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
        {label}
        {children}
      </div>
    </div>
  );
}
