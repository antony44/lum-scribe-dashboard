
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Data for the activity heatmap
const activityData = [
  { day: "Lun", hours: [1, 2, 2, 1, 1, 0, 0] },
  { day: "Mar", hours: [3, 3, 2, 1, 1, 0, 0] },
  { day: "Mer", hours: [2, 1, 1, 0, 0, 0, 0] },
  { day: "Jeu", hours: [2, 1, 1, 0, 0, 0, 0] },
  { day: "Ven", hours: [1, 0, 0, 0, 0, 0, 0] },
  { day: "Sam", hours: [3, 2, 1, 0, 0, 0, 0] },
  { day: "Dim", hours: [2, 2, 1, 0, 0, 0, 0] }
];

// Function to get the color based on activity level
const getActivityColor = (level: number) => {
  if (level === 0) return "bg-blue-100";
  if (level === 1) return "bg-blue-300";
  if (level === 2) return "bg-blue-500";
  return "bg-blue-700";
};

const ActivityHeatmap = () => {
  return (
    <Card className="bg-white rounded-xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Activité</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-1">
          {/* Column headers (invisible first cell for alignment) */}
          <div></div>
          <div className="text-xs text-center text-gray-500">8h</div>
          <div className="text-xs text-center text-gray-500">10h</div>
          <div className="text-xs text-center text-gray-500">12h</div>
          <div className="text-xs text-center text-gray-500">14h</div>
          <div className="text-xs text-center text-gray-500">16h</div>
          <div className="text-xs text-center text-gray-500">18h</div>
          <div className="text-xs text-center text-gray-500">20h</div>
          
          {/* Heatmap data */}
          {activityData.map((row, rowIndex) => (
            <React.Fragment key={row.day}>
              <div className="text-xs font-medium text-gray-700">{row.day}</div>
              {row.hours.map((level, colIndex) => (
                <Tooltip key={`${row.day}-${colIndex}`}>
                  <TooltipTrigger asChild>
                    <div 
                      className={`w-full h-6 ${getActivityColor(level)} rounded transition-all duration-300 hover:opacity-80 cursor-pointer`}
                      aria-label={`Niveau d'activité: ${level}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Niveau d'activité: {level}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </React.Fragment>
          ))}
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          Le mardi matin est votre créneau le plus actif
        </p>
      </CardContent>
    </Card>
  );
};

export default ActivityHeatmap;
