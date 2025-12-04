import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, ArrowRight, Sparkles, X } from "lucide-react";
import NumberText from "@/components/ui/NumberText";

type TrendPoint = {
  month: string;
  score: number;
};

interface ScorecardWidgetProps {
  currentScore: number;
  previousScore: number;
  animatedScore: number;
  trendData: TrendPoint[];
}

export default function ScorecardWidget({
  currentScore,
  previousScore,
  animatedScore,
  trendData,
}: ScorecardWidgetProps) {
  const scoreChange = currentScore - previousScore;
  const isImproving = scoreChange < 0; // lower score = better
  const TrendIcon = isImproving ? TrendingDown : TrendingUp;
  const trendColor = isImproving ? "var(--accent)" : "var(--destructive)";
  const progress = Math.min(Math.max(currentScore / 5, 0), 1);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const [isTrendOpen, setIsTrendOpen] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState<TrendPoint | null>(null);

  const resolvedTrend = trendData?.length
    ? trendData
    : [
        { month: "Month 1", score: previousScore },
        { month: "Month 2", score: currentScore },
      ];

  const chartWidth = 500;
  const chartHeight = 220;
  const padding = 32;
  const leftPadding = 70; // Padding for Y-axis labels
  const rightPadding = 50; // Padding on the right
  const pointOffset = 30; // Extra offset to move first point away from Y-axis
  const maxScore = 5;
  const minScore = 0;
  
  // Helper to get color based on score
  const getScoreColor = (score: number): string => {
    if (score <= 2.5) return '#4ade80'; // Green - Healthy
    if (score <= 3.5) return '#fbbf24'; // Yellow - At Risk
    return '#EB5F43'; // Red - Critical
  };
  
  // Helper to get score explanation
  const getScoreExplanation = (score: number, isPastMonth: boolean): { status: string; message: string } => {
    if (score <= 2.5) {
      return {
        status: 'Healthy',
        message: isPastMonth 
          ? 'Your team was functioning well with minimal signs of burnout. Team members appeared engaged and energized.'
          : 'Your team is functioning well with minimal signs of burnout. Team members appear engaged and energized.'
      };
    }
    if (score <= 3.5) {
      return {
        status: 'At Risk',
        message: isPastMonth
          ? 'Your team was showing moderate signs of burnout. Early intervention was recommended to prevent escalation.'
          : 'Your team is showing moderate signs of burnout. Early intervention is recommended to prevent escalation.'
      };
    }
    return {
      status: 'Critical',
      message: isPastMonth
        ? 'Your team was experiencing high levels of burnout. Immediate action was required to support team wellbeing.'
        : 'Your team is experiencing high levels of burnout. Immediate action is required to support team wellbeing.'
    };
  };
  
  const chartPoints = resolvedTrend.map((point, index) => {
    const availableWidth = chartWidth - leftPadding - rightPadding - pointOffset * 2;
    const x = leftPadding + pointOffset + (index / (resolvedTrend.length - 1)) * availableWidth;
    const normalized = Math.min(Math.max((point.score - minScore) / (maxScore - minScore), 0), 1);
    const yRange = chartHeight - padding * 2;
    const y = chartHeight - padding - normalized * yRange;
    const color = getScoreColor(point.score);
    return { ...point, x, y, color };
  });
  const polylinePoints =
    chartPoints.length > 1 ? chartPoints.map((point) => `${point.x},${point.y}`).join(" ") : "";

  return (
    <>
      <div className="relative w-full max-w-md mx-auto lg:mx-0">
        <div 
          className="relative rounded-2xl shadow-lg border border-border/60 p-5 bg-card cursor-pointer transition-all duration-200 hover:shadow-xl hover:border-primary/20"
          onClick={() => setIsTrendOpen(true)}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center justify-center">
              <svg width="160" height="160" className="-rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="var(--border)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.3}
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="var(--primary)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p
                  className="text-4xl font-black font-number text-primary"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {animatedScore.toFixed(2)}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mt-1">
                  out of <NumberText className="text-[12px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mt-1">5</NumberText>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="rounded-xl border border-border/60 bg-card p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> Prior
                </p>
                <p className="text-xl font-black text-foreground font-number">
                  {previousScore.toFixed(2)}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1 flex items-center justify-center gap-1">
                  <TrendIcon className="w-3 h-3" style={{ color: trendColor }} /> Change
                </p>
                <p className="text-xl font-black font-number" style={{ color: trendColor }}>
                  {isImproving ? "-" : "+"}
                  {Math.abs(scoreChange).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
              Show trend
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isTrendOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsTrendOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setIsTrendOpen(false)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="p-10">
                <div className="mb-8">
                  <h2 className="text-4xl font-black text-primary mb-3">Burnout Trend</h2>
                  <p className="text-base text-foreground/60 max-w-xl">
                    Track your team's burnout trajectory over the past three months
                  </p>
                </div>

                <div className="bg-muted/30 rounded-3xl p-12">
                  <svg width="100%" height={chartHeight + 60} viewBox={`0 0 ${chartWidth} ${chartHeight + 60}`} preserveAspectRatio="xMidYMid meet">
                    {/* Y-axis line */}
                    <line
                      x1={leftPadding}
                      x2={leftPadding}
                      y1={padding}
                      y2={chartHeight - padding}
                      stroke="var(--border)"
                      strokeWidth={2}
                    />
                    
                    {/* X-axis line */}
                    <line
                      x1={leftPadding}
                      x2={chartWidth - rightPadding}
                      y1={chartHeight - padding}
                      y2={chartHeight - padding}
                      stroke="var(--border)"
                      strokeWidth={2}
                    />

                    {/* Y-axis labels and grid */}
                    {[0, 1, 2, 3, 4, 5].map((step) => {
                      const y = chartHeight - padding - (step / maxScore) * (chartHeight - padding * 2);
                      return (
                        <g key={step}>
                          <line
                            x1={leftPadding}
                            x2={chartWidth - rightPadding}
                            y1={y}
                            y2={y}
                            stroke="var(--border)"
                            strokeWidth={1}
                            opacity={0.15}
                            strokeDasharray="6 6"
                          />
                          <text
                            x={leftPadding - 18}
                            y={y + 5}
                            textAnchor="end"
                            className="text-sm font-bold"
                            fill="var(--muted-foreground)"
                          >
                            {step.toFixed(1)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Main trend line - gradient segments */}
                    {chartPoints.length > 1 && chartPoints.map((point, idx) => {
                      if (idx === chartPoints.length - 1) return null;
                      const nextPoint = chartPoints[idx + 1];
                      return (
                        <line
                          key={`segment-${idx}`}
                          x1={point.x}
                          y1={point.y}
                          x2={nextPoint.x}
                          y2={nextPoint.y}
                          stroke={point.color}
                          strokeWidth={4}
                          strokeLinecap="round"
                          opacity={0.8}
                        />
                      );
                    })}

                    {/* Data points */}
                    {chartPoints.map((point, idx) => (
                      <g 
                        key={point.month}
                        onClick={() => setSelectedPoint(point)}
                        style={{ cursor: 'pointer' }}
                        className="transition-opacity hover:opacity-80"
                      >
                        {/* Outer glow */}
                        <circle 
                          cx={point.x} 
                          cy={point.y} 
                          r={16} 
                          fill={point.color}
                          opacity={0.15}
                        />
                        
                        {/* Point circle */}
                        <circle 
                          cx={point.x} 
                          cy={point.y} 
                          r={10} 
                          fill="white" 
                          stroke={point.color}
                          strokeWidth={4}
                        />
                        
                        {/* Inner dot */}
                        <circle 
                          cx={point.x} 
                          cy={point.y} 
                          r={4} 
                          fill={point.color}
                        />
                        
                        {/* Month label */}
                        <text
                          x={point.x}
                          y={chartHeight - padding + 28}
                          textAnchor="middle"
                          className="text-base font-black"
                          fill="var(--foreground)"
                          style={{ pointerEvents: 'none' }}
                        >
                          {point.month}
                        </text>
                        
                        {/* Score label above point with colored background */}
                        <g style={{ pointerEvents: 'none' }}>
                          <rect
                            x={point.x - 28}
                            y={point.y - 36}
                            width={56}
                            height={24}
                            rx={8}
                            fill={point.color}
                          />
                          <text
                            x={point.x}
                            y={point.y - 18}
                            textAnchor="middle"
                            className="text-base font-black"
                            fill="white"
                            style={{ fontFamily: "Arial, sans-serif" }}
                          >
                            {point.score.toFixed(2)}
                          </text>
                        </g>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Legend */}
                <div className="mt-8 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-foreground">Healthy (0-2.5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-semibold text-foreground">At Risk (2.6-3.5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm font-semibold text-foreground">Critical (3.6-5.0)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Explanation Modal */}
      <AnimatePresence>
        {selectedPoint && (() => {
          const currentMonth = "Nov"; // Current month
          const isPastMonth = selectedPoint.month !== currentMonth;
          const explanation = getScoreExplanation(selectedPoint.score, isPastMonth);
          
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPoint(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setSelectedPoint(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="p-10">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black"
                      style={{ backgroundColor: getScoreColor(selectedPoint.score) }}
                    >
                      {selectedPoint.score.toFixed(1)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-primary">
                        {explanation.status}
                      </h2>
                      <p className="text-sm text-muted-foreground font-semibold">
                        {selectedPoint.month} • BAT Score
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {explanation.message}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    <strong className="text-foreground font-semibold">About BAT Scores:</strong> The BAT-12 (Burnout Assessment Tool) is used under the Creative Commons Attribution 4.0 International License (CC BY 4.0), developed by Wilmar Schaufeli and collaborators. Lower scores indicate healthier teams with better engagement and reduced burnout risk.{' '}
                    <a 
                      href="https://www.burnoutassessmenttool.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}