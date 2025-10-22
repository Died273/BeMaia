import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown,
  Minus,
  Zap, 
  Wind,
  Brain, 
  Heart,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Target,
  Calendar,
  ArrowRight,
  Flame,
  Sparkles,
  Activity,
  Eye,
  EyeOff
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data
const mockData = {
  currentScore: 2.8,
  previousScore: 3.2,
  weekRange: "Oct 14 - Oct 20, 2024",
  
  subcategories: [
    { 
      key: "exhaustion", 
      name: "Exhaustion", 
      score: 3.1, 
      previousScore: 3.4,
      status: "at-risk",
      icon: Zap,
      description: "Energy and fatigue levels",
      color: "#94a3b8",
      trend: "improving"
    },
    { 
      key: "mental_distance", 
      name: "Mental Distance", 
      score: 2.4,
      previousScore: 2.6, 
      status: "healthy",
      icon: Wind,
      description: "Engagement with work",
      color: "#6b7280",
      trend: "improving"
    },
    { 
      key: "cognitive", 
      name: "Cognitive", 
      score: 2.9,
      previousScore: 3.1, 
      status: "at-risk",
      icon: Brain,
      description: "Focus and concentration",
      color: "#9ca3af",
      trend: "improving"
    },
    { 
      key: "emotional", 
      name: "Emotional", 
      score: 2.6,
      previousScore: 2.5, 
      status: "healthy",
      icon: Heart,
      description: "Emotional regulation",
      color: "#78716c",
      trend: "worsening"
    }
  ],

  historicalData: [
    { week: "Sep 2", score: 2.3 },
    { week: "Sep 9", score: 2.5 },
    { week: "Sep 16", score: 2.8 },
    { week: "Sep 23", score: 3.0 },
    { week: "Sep 30", score: 3.2 },
    { week: "Oct 7", score: 3.1 },
    { week: "Oct 14", score: 2.9 },
    { week: "Oct 20", score: 2.8 }
  ],

  insights: [
    {
      type: "positive",
      text: "Team burnout decreased 12.5% - momentum is building!",
      impact: "high"
    },
    {
      type: "warning",
      text: "Exhaustion remains elevated despite improvements",
      impact: "medium"
    },
    {
      type: "neutral",
      text: "Engagement holding steady across departments",
      impact: "low"
    }
  ],

  recommendations: [
    {
      priority: "high",
      title: "Flexible Work Hours",
      description: "Let teams optimize their energy cycles",
      category: "exhaustion",
      estimatedImpact: "15-20% improvement"
    },
    {
      priority: "high",
      title: "Deep Work Blocks",
      description: "Protected focus time for cognitive recovery",
      category: "cognitive",
      estimatedImpact: "10-15% improvement"
    },
    {
      priority: "medium",
      title: "Weekly Pulse Checks",
      description: "Catch emotional stress signals early",
      category: "emotional",
      estimatedImpact: "8-12% improvement"
    },
    {
      priority: "medium",
      title: "Recognition Rituals",
      description: "Combat mental distance with appreciation",
      category: "mental_distance",
      estimatedImpact: "5-10% improvement"
    }
  ]
};

export default function DashboardCompany() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [showRadar, setShowRadar] = useState(false);
  const [hoveredInsight, setHoveredInsight] = useState<number | null>(null);
  
  // Animate score on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const easeProgress = 1 - Math.pow(1 - currentStep / steps, 3);
      setAnimatedScore(mockData.currentScore * easeProgress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedScore(mockData.currentScore);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, []);

  const scoreChange = mockData.currentScore - mockData.previousScore;
  const isImproving = scoreChange < 0;
  
  // Prepare radar chart data
  const radarData = mockData.subcategories.map(cat => ({
    dimension: cat.name,
    score: cat.score,
    fullMark: 5
  }));

  return (
    <>
      <Header />
      <div className="min-h-screen w-full pt-20 pb-16 page-bg relative overflow-hidden">
        {/* Static background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Hero Header with animated gradient */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/3 to-primary/3 rounded-3xl blur-3xl" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60 shadow-xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <Flame className="w-8 h-8 text-slate-500" />
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-800">
                      Burnout Pulse
                    </h1>
                  </motion.div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{mockData.weekRange}</span>
                    <span className="text-xs bg-gray-50 px-2 py-1 rounded-full border border-gray-200">Live Data</span>
                  </div>
                </div>
                
                {/* Quick stats pills */}
                <div className="flex flex-wrap gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-green-50/50 rounded-full border border-green-200/50"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600/70" />
                      <span className="text-sm font-bold text-green-700/80">2 Healthy</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-orange-50/50 rounded-full border border-orange-200/50"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600/70" />
                      <span className="text-sm font-bold text-orange-700/80">2 At Risk</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Grid - Asymmetric Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            
            {/* Score Card - Now takes more horizontal space */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200/60 h-full overflow-hidden">

                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-black mb-1 text-gray-800">
                        Team Health Score
                      </h2>
                      <p className="text-sm text-gray-500">Lower is better</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${isImproving ? 'bg-green-100/60' : 'bg-red-100/60'}`}>
                      {isImproving ? (
                        <TrendingDown className="w-6 h-6 text-green-600/80" />
                      ) : (
                        <TrendingUp className="w-6 h-6 text-red-600/80" />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    {/* Static rings behind score */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border-4 border-gray-200/30" />
                      <div className="absolute w-40 h-40 rounded-full border-4 border-gray-200/40" />
                    </div>

                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                      className="relative text-center py-8"
                    >
                      <div className="text-8xl font-black text-gray-700">
                        {animatedScore.toFixed(2)}
                      </div>
                      <div className="text-lg font-bold text-gray-400 mt-2">
                        / 5.00
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50/70 rounded-2xl border border-gray-200/50">
                      <span className="text-sm font-medium text-gray-600">Previous Week</span>
                      <span className="text-xl font-bold text-gray-500">{mockData.previousScore.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-4 bg-green-50/50 rounded-2xl border border-green-200/60">
                      <Activity className="w-5 h-5 text-green-600/80" />
                      <span className="text-sm font-bold text-green-700/90">
                        {Math.abs(scoreChange).toFixed(2)} point improvement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trend Chart - Takes remaining space */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-gray-200/60 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-gray-800">Recovery Trajectory</h2>
                    <p className="text-sm text-gray-500 mt-1">8-week burnout evolution</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRadar(!showRadar)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 border border-gray-200"
                  >
                    {showRadar ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {showRadar ? 'Line View' : 'Radar View'}
                  </motion.button>
                </div>
                
                <AnimatePresence mode="wait">
                  {!showRadar ? (
                    <motion.div
                      key="line"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="h-80 w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockData.historicalData}>
                          <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4}/>
                              <stop offset="50%" stopColor="var(--accent)" stopOpacity={0.2}/>
                              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                          <XAxis 
                            dataKey="week" 
                            tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                          />
                          <YAxis 
                            domain={[0, 5]} 
                            tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(255,255,255,0.98)',
                              border: 'none',
                              borderRadius: '16px',
                              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                              padding: '12px 16px'
                            }}
                            labelStyle={{ color: '#111827', fontWeight: 'bold', marginBottom: '4px' }}
                            formatter={(value: number) => [
                              <span className="font-bold text-primary">{value.toFixed(2)}</span>,
                              'Score'
                            ]}
                          />
                          <Area
                            type="monotone"
                            dataKey="score"
                            stroke="var(--primary)"
                            strokeWidth={4}
                            fill="url(#colorGradient)"
                            dot={{ 
                              fill: 'white', 
                              stroke: 'var(--primary)',
                              strokeWidth: 3,
                              r: 6 
                            }}
                            activeDot={{ 
                              r: 9,
                              stroke: 'var(--primary)',
                              strokeWidth: 3,
                              fill: 'white'
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="radar"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="h-80 w-full flex items-center justify-center"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis 
                            dataKey="dimension" 
                            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                          />
                          <Radar
                            name="Current"
                            dataKey="score"
                            stroke="var(--primary)"
                            fill="var(--primary)"
                            fillOpacity={0.3}
                            strokeWidth={3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Target: 1.00 - 2.53</span>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-gray-500">Healthy</span>
                    <div className="w-3 h-3 rounded-full bg-orange-400 ml-3" />
                    <span className="text-gray-500">At Risk</span>
                    <div className="w-3 h-3 rounded-full bg-red-400 ml-3" />
                    <span className="text-gray-500">Critical</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dimension Cards - Interactive hover states */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-black mb-6 text-gray-800 flex items-center gap-3">
              <Target className="w-6 h-6 text-gray-600" />
              Dimension Deep Dive
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {mockData.subcategories.map((category, index) => {
                const Icon = category.icon;
                const isSelected = selectedDimension === category.key;
                
                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedDimension(isSelected ? null : category.key)}
                    className="relative group cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl"
                      style={{ 
                        background: `${category.color}15`,
                        opacity: isSelected ? 0.4 : 0.2 
                      }}
                    />
                    <div 
                      className={`relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
                        isSelected ? 'border-opacity-100 scale-105' : 'border-gray-200/60 hover:border-gray-300/80'
                      }`}
                      style={{ borderColor: isSelected ? category.color : undefined }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <motion.div 
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: `${category.color}15` }}
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <Icon className="w-6 h-6" style={{ color: category.color }} />
                        </motion.div>
                        
                        <div className="flex flex-col items-end gap-1">
                          {category.trend === "improving" ? (
                            <TrendingDown className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                          )}
                          <span className="text-xs font-bold text-gray-400">
                            {Math.abs(category.score - category.previousScore).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-black text-lg mb-1 text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4 font-medium">
                        {category.description}
                      </p>

                      <div className="flex items-end gap-2 mb-3">
                        <div 
                          className="text-5xl font-black"
                          style={{ color: category.color }}
                        >
                          {category.score.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-400 font-bold mb-1">/5.0</div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(category.score / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>

                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                        style={{ 
                          backgroundColor: `${category.color}15`,
                          color: category.color
                        }}
                      >
                        {category.status === 'healthy' ? '✓ Healthy' : '⚠ At Risk'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Insights & Recommendations - Side by side with unique styling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Insights - Stacked card style */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-gray-200/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50/70 rounded-xl">
                      <Lightbulb className="w-6 h-6 text-blue-600/80" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800">This Week's Signal</h2>
                  </div>

                  <div className="space-y-3">
                    {mockData.insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.1 }}
                        onHoverStart={() => setHoveredInsight(index)}
                        onHoverEnd={() => setHoveredInsight(null)}
                        className="relative group"
                      >
                        <motion.div
                          animate={{
                            scale: hoveredInsight === index ? 1.02 : 1,
                            x: hoveredInsight === index ? 4 : 0
                          }}
                          className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                            insight.type === 'positive' 
                              ? 'bg-gradient-to-br from-green-50/60 to-emerald-50/60 border-green-200/60' 
                              : insight.type === 'warning' 
                              ? 'bg-gradient-to-br from-orange-50/60 to-yellow-50/60 border-orange-200/60' 
                              : 'bg-gradient-to-br from-blue-50/60 to-indigo-50/60 border-blue-200/60'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {insight.type === 'positive' && (
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                              )}
                              {insight.type === 'warning' && (
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                  <AlertCircle className="w-5 h-5 text-orange-600" />
                                </div>
                              )}
                              {insight.type === 'neutral' && (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <Activity className="w-5 h-5 text-blue-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-800 leading-relaxed">
                                {insight.text}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span 
                                  className="text-xs font-bold px-2 py-1 rounded-full"
                                  style={{
                                    backgroundColor: insight.impact === 'high' ? '#fee2e2' : insight.impact === 'medium' ? '#fef3c7' : '#e0e7ff',
                                    color: insight.impact === 'high' ? '#dc2626' : insight.impact === 'medium' ? '#d97706' : '#4f46e5'
                                  }}
                                >
                                  {insight.impact.toUpperCase()} IMPACT
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommendations - Card deck style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-gray-200/60">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-50/70 rounded-xl">
                      <Target className="w-6 h-6 text-purple-600/80" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800">Action Blueprint</h2>
                  </div>

                  <div className="space-y-3">
                    {mockData.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 6 }}
                        className="group cursor-pointer"
                      >
                        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-gray-50/70 to-gray-100/70 border-2 border-gray-200/60 hover:border-purple-300/60 transition-all duration-300">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide"
                                style={{
                                  background: rec.priority === 'high' 
                                    ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' 
                                    : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                                  color: rec.priority === 'high' ? '#991b1b' : '#92400e'
                                }}
                              >
                                {rec.priority}
                              </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          
                          <h3 className="font-black text-base mb-2 text-gray-900">
                            {rec.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                            {rec.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                              {rec.estimatedImpact}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              {rec.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}