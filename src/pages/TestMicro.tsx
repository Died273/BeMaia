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
  X
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScorecardWidget from "@/components/ui/ScorecardWidget";
import NumberText from "@/components/ui/NumberText";
import LineChart from "@/components/ui/charts/LineChart";
import GaugeChart from "@/components/ui/charts/GaugeChart";
import PieChart from "@/components/ui/charts/PieChart";
import StackedBarChart from "@/components/ui/charts/StackedBarChart";
import HorizontalBarChart from "@/components/ui/charts/HorizontalBarChart";
import WordCloud from "@/components/ui/charts/WordCloud";
import DivergingBarChart from "@/components/ui/charts/DivergingBarChart";

interface Recommendation {
  title: string;
  actions: string[];
  impact: string;
}

interface MicrosurveyDetail {
  title: string;
  score: number;
  status: 'healthy' | 'at-risk' | 'moderate';
  chartComponent: React.ReactNode;
  interpretation: string;
  recommendations: Recommendation[];
}

// Microsurvey Mock Data
const microsurveyData = {
  // 1. Weekly Pulse & Burnout Risks
  weeklyEnergyLevel: [
    { label: "Week 1", value: 3.2 },
    { label: "Week 2", value: 3.5 },
    { label: "Week 3", value: 3.1 },
    { label: "Week 4", value: 2.8 },
    { label: "Week 5", value: 3.4 },
    { label: "Week 6", value: 3.6 }
  ],
  
  abilityToDisconnect: [
    {
      label: "Week 1",
      values: [
        { category: "Rarely", value: 15, color: "var(--secondary)" },
        { category: "Sometimes", value: 35, color: "var(--accent)" },
        { category: "Often", value: 30, color: "var(--primary-medium)" },
        { category: "Always", value: 20, color: "var(--primary)" }
      ]
    },
    {
      label: "Week 2",
      values: [
        { category: "Rarely", value: 20, color: "var(--secondary)" },
        { category: "Sometimes", value: 30, color: "var(--accent)" },
        { category: "Often", value: 28, color: "var(--primary-medium)" },
        { category: "Always", value: 22, color: "var(--primary)" }
      ]
    },
    {
      label: "Week 3",
      values: [
        { category: "Rarely", value: 12, color: "var(--secondary)" },
        { category: "Sometimes", value: 38, color: "var(--accent)" },
        { category: "Often", value: 32, color: "var(--primary-medium)" },
        { category: "Always", value: 18, color: "var(--primary)" }
      ]
    }
  ],
  
  weeklyWorkload: 3.7,
  monthlyExhaustion: [
    { label: "Aug", value: 3.2 },
    { label: "Sep", value: 3.6 },
    { label: "Oct", value: 3.4 },
    { label: "Nov", value: 3.8 }
  ],
  
  // 2. Acute Stressors & Workload
  weeklyChallenges: [
    { text: "Deadlines", value: 45 },
    { text: "Communication", value: 32 },
    { text: "Workload", value: 28 },
    { text: "Meetings", value: 25 },
    { text: "Unclear Requirements", value: 22 },
    { text: "Technical Issues", value: 18 },
    { text: "Team Conflicts", value: 15 },
    { text: "Lack of Resources", value: 12 },
    { text: "Burnout", value: 10 }
  ],
  
  moodTriggers: [
    { label: "Workload Issues", value: 45, color: "var(--secondary)" },
    { label: "Work Relationships", value: 30, color: "var(--accent)" },
    { label: "Personal Life", value: 25, color: "var(--primary)" }
  ],
  
  challengeTypes: [
    { label: "High Workload", value: 42, color: "var(--secondary)" },
    { label: "Tight Deadlines", value: 38, color: "var(--secondary-light)" },
    { label: "Unclear Expectations", value: 28, color: "var(--accent)" },
    { label: "Lack of Support", value: 22, color: "var(--muted-foreground)" },
    { label: "Technical Challenges", value: 18, color: "var(--primary)" }
  ],
  
  // 3. Team Dynamics & Psychological Safety
  weeklySupport: 3.8,
  psychologicalSafety: [
    { label: "Yes", value: 72, color: "var(--primary)" },
    { label: "No", value: 28, color: "var(--secondary)" }
  ],
  feelingConnected: 3.5,
  inputNotConsidered: [
    { label: "No", value: 68, color: "var(--primary)" },
    { label: "Yes", value: 32, color: "var(--secondary)" }
  ],
  
  // 4. Leadership & Recognition
  managerApproachability: 4.2,
  receivedRecognition: [
    { label: "Yes", value: 58, color: "var(--primary)" },
    { label: "No", value: 42, color: "var(--secondary)" }
  ],
  workAppreciated: [
    { label: "Yes", value: 65, color: "var(--primary)" },
    { label: "No", value: 35, color: "var(--secondary)" }
  ],
  clarityOfGoals: 3.6,
  
  // 5. Workflow & Process Clarity
  processBottlenecks: [
    { text: "Approval Process", value: 38 },
    { text: "Communication Tools", value: 32 },
    { text: "Documentation", value: 28 },
    { text: "Code Review", value: 24 },
    { text: "Deployment", value: 20 },
    { text: "Testing", value: 18 },
    { text: "Meetings", value: 15 }
  ],
  
  unclearInstructions: [
    { label: "No", value: 62, color: "var(--primary)" },
    { label: "Yes", value: 38, color: "var(--secondary)" }
  ],
  roleClarity: [
    { label: "Yes", value: 75, color: "var(--primary)" },
    { label: "No", value: 25, color: "var(--secondary)" }
  ],
  
  // 6. Career & Growth
  careerStagnation: [
    { label: "No", value: 55, color: "var(--primary)" },
    { label: "Yes", value: 45, color: "var(--secondary)" }
  ],
  skillsUnderutilized: [
    { label: "No", value: 60, color: "var(--primary)" },
    { label: "Yes", value: 40, color: "var(--secondary)" }
  ],
  
  // 7. Remote & Hybrid Work
  remoteWorkPreference: [
    {
      label: "Current",
      values: [
        { category: "Full Remote", value: 30, color: "var(--primary)" },
        { category: "Hybrid", value: 50, color: "var(--primary-medium)" },
        { category: "Full Office", value: 20, color: "var(--secondary)" }
      ]
    },
    {
      label: "Preferred",
      values: [
        { category: "Full Remote", value: 45, color: "var(--primary)" },
        { category: "Hybrid", value: 40, color: "var(--primary-medium)" },
        { category: "Full Office", value: 15, color: "var(--secondary)" }
      ]
    }
  ],
  
  remoteWorkBalance: [
    { label: "Work-Life Balance", easier: 65, harder: 35 },
    { label: "Productivity", easier: 58, harder: 42 },
    { label: "Communication", easier: 42, harder: 58 },
    { label: "Team Connection", easier: 35, harder: 65 }
  ]
};

// Detailed information for each microsurvey metric
const microsurveyDetails = {
  weeklyEnergyLevel: {
    title: "Weekly Energy Level",
    score: 3.3,
    status: "at-risk" as const,
    interpretation: "Your team's energy levels are fluctuating in the at-risk zone, averaging 3.3/5. There's a concerning pattern of mid-week energy dips, particularly in Week 4 (2.8/5). This suggests that workload distribution or recovery periods may need adjustment.",
    recommendations: [
      {
        title: "Implement Energy Recovery Blocks",
        actions: ["Schedule 30-minute 'recharge breaks' on Wednesday afternoons", "Encourage short walks or stretching during low-energy periods", "Consider mid-week team wellness activities"],
        impact: "Expected 15-20% improvement in sustained energy levels"
      },
      {
        title: "Optimize Workload Distribution",
        actions: ["Shift high-intensity tasks to Monday-Tuesday when energy is higher", "Reduce meeting load on Wednesdays and Thursdays", "Front-load deadlines to avoid end-of-week crashes"],
        impact: "Could stabilize energy fluctuations by 25%"
      }
    ]
  },
  
  abilityToDisconnect: {
    title: "Ability to Disconnect",
    score: 2.5,
    status: "healthy" as const,
    interpretation: "The data shows that 50% of your team sometimes or rarely disconnects from work, which is concerning for long-term wellbeing. Only 20% report 'always' being able to disconnect. This pattern suggests boundary-setting challenges that could lead to burnout.",
    recommendations: [
      {
        title: "Establish Clear Boundaries",
        actions: ["Set explicit 'no-work' hours (e.g., after 6pm and weekends)", "Disable work notifications outside business hours", "Lead by example - managers should respect offline time"],
        impact: "Could increase 'Always' disconnect rate to 35-40%"
      }
    ]
  },
  
  weeklyWorkload: {
    title: "Weekly Workload Manageability",
    score: 3.7,
    status: "at-risk" as const,
    interpretation: "At 3.7/5, your team's workload is in the at-risk zone, indicating that work demands are approaching unsustainable levels. This score suggests that team members are struggling to complete tasks within reasonable timeframes.",
    recommendations: [
      {
        title: "Workload Audit & Redistribution",
        actions: ["Conduct a comprehensive task audit to identify bottlenecks", "Redistribute tasks based on capacity and expertise", "Consider hiring support or reallocating resources"],
        impact: "Could reduce workload pressure by 20-30%"
      }
    ]
  },
  
  monthlyExhaustion: {
    title: "Monthly Exhaustion Trend",
    score: 3.5,
    status: "at-risk" as const,
    interpretation: "Exhaustion has been steadily increasing from 3.2 in August to 3.8 in November. This upward trend is alarming and suggests accumulating fatigue that recovery periods aren't addressing. Immediate intervention is needed.",
    recommendations: [
      {
        title: "Mandatory Recovery Periods",
        actions: ["Implement 'recharge days' - one Friday off per month", "Encourage full use of vacation time", "Block December as a 'low-intensity' month"],
        impact: "Could reverse the trend and reduce exhaustion by 30%"
      }
    ]
  },
  
  weeklyChallenges: {
    title: "Top Weekly Challenges",
    score: 0,
    status: "moderate" as const,
    interpretation: "The most frequently mentioned challenges are deadlines (45 mentions), communication issues (32), and workload (28). This pattern suggests systemic issues with time management, cross-team coordination, and resource allocation.",
    recommendations: [
      {
        title: "Address Deadline Pressure",
        actions: ["Review and extend unrealistic deadlines", "Build in buffer time for unexpected issues", "Improve estimation practices for project timelines"],
        impact: "Could reduce deadline stress by 35%"
      }
    ]
  },
  
  moodTriggers: {
    title: "Weekly Mood Triggers",
    score: 0,
    status: "moderate" as const,
    interpretation: "45% of mood impacts stem from workload issues, 30% from work relationships, and 25% from personal life. The high workload component reinforces other findings and suggests this is the primary lever for improvement.",
    recommendations: [
      {
        title: "Workload Intervention",
        actions: ["Monitor workload impact on mood weekly", "Adjust quickly when workload triggers increase", "Provide stress management resources"],
        impact: "Could shift distribution to 30% workload, 25% relationships, 45% personal"
      }
    ]
  },
  
  challengeTypes: {
    title: "Challenge Types Ranking",
    score: 0,
    status: "moderate" as const,
    interpretation: "High workload (42) and tight deadlines (38) dominate the challenge landscape, followed by unclear expectations (28). This cluster of issues points to project management and scoping problems.",
    recommendations: [
      {
        title: "Project Management Overhaul",
        actions: ["Implement Agile methodologies for better sprint planning", "Use capacity planning to avoid overcommitment", "Regular retrospectives to identify process improvements"],
        impact: "Could reduce top 3 challenges by 40%"
      }
    ]
  },
  
  weeklySupport: {
    title: "Weekly Support",
    score: 3.8,
    status: "at-risk" as const,
    interpretation: "At 3.8/5, team members feel moderately supported but there's room for improvement. This score suggests that support systems exist but may not be consistently accessible or effective for everyone.",
    recommendations: [
      {
        title: "Strengthen Support Networks",
        actions: ["Establish peer mentorship programs", "Ensure managers have weekly check-ins with direct reports", "Create channels for anonymous support requests"],
        impact: "Could improve support score to 4.2-4.5/5"
      }
    ]
  },
  
  psychologicalSafety: {
    title: "Psychological Safety",
    score: 72,
    status: "healthy" as const,
    interpretation: "72% of your team feels safe speaking up about mistakes or challenges, which is good but not excellent. The 28% who don't feel safe represent a significant portion that may be silently struggling or withholding important information.",
    recommendations: [
      {
        title: "Foster Open Communication",
        actions: ["Publicly celebrate learning from failures", "Ensure leaders model vulnerability and admit mistakes", "Create 'no-blame' retrospectives after incidents"],
        impact: "Could increase to 85-90% feeling safe"
      }
    ]
  },
  
  feelingConnected: {
    title: "Feeling Connected",
    score: 3.5,
    status: "at-risk" as const,
    interpretation: "A connection score of 3.5/5 indicates moderate team cohesion with room for improvement. In remote or hybrid environments, this score suggests that social bonds may be weakening.",
    recommendations: [
      {
        title: "Strengthen Team Bonds",
        actions: ["Regular team social events (virtual or in-person)", "Create 'coffee chat' pairings for casual connections", "Celebrate wins and milestones together"],
        impact: "Could improve connection to 4.0-4.3/5"
      }
    ]
  },
  
  inputNotConsidered: {
    title: "Input Not Considered",
    score: 68,
    status: "healthy" as const,
    interpretation: "68% report their input IS considered (answering 'No' to feeling ignored), which is positive. However, 32% feeling their expertise is overlooked is significant and could lead to disengagement.",
    recommendations: [
      {
        title: "Improve Decision Transparency",
        actions: ["Explain why certain suggestions aren't implemented", "Create clear processes for input gathering and consideration", "Close the feedback loop on all submitted ideas"],
        impact: "Could reduce 'Yes' responses to 15-20%"
      }
    ]
  },
  
  managerApproachability: {
    title: "Manager Approachability",
    score: 4.2,
    status: "healthy" as const,
    interpretation: "At 4.2/5, managers are quite approachable, which is excellent. This strong score indicates good leadership accessibility and open-door culture. Maintain and reinforce this strength.",
    recommendations: [
      {
        title: "Maintain Approachability",
        actions: ["Continue current practices that foster openness", "Regularly solicit feedback on leadership effectiveness", "Share best practices across management team"],
        impact: "Sustain current high levels"
      }
    ]
  },
  
  receivedRecognition: {
    title: "Received Recognition",
    score: 58,
    status: "moderate" as const,
    interpretation: "Only 58% report receiving recognition, meaning 42% of your team feels their work goes unnoticed. Recognition is a key driver of engagement and morale - this gap needs attention.",
    recommendations: [
      {
        title: "Formalize Recognition Programs",
        actions: ["Implement peer-to-peer recognition system", "Manager training on effective praise and acknowledgment", "Celebrate both big wins and small contributions"],
        impact: "Could increase to 75-80% receiving recognition"
      }
    ]
  },
  
  workAppreciated: {
    title: "Work is Appreciated",
    score: 65,
    status: "moderate" as const,
    interpretation: "65% feel their work is recognized and appreciated, leaving 35% feeling undervalued. This gap between those who receive recognition (58%) and feel appreciated (65%) suggests recognition quality may vary.",
    recommendations: [
      {
        title: "Connect Work to Impact",
        actions: ["Show how individual contributions support company goals", "Share customer/stakeholder feedback with the team", "Make appreciation genuine and meaningful, not formulaic"],
        impact: "Could increase to 80-85% feeling appreciated"
      }
    ]
  },
  
  clarityOfGoals: {
    title: "Clarity of Goals",
    score: 3.6,
    status: "at-risk" as const,
    interpretation: "Goal clarity at 3.6/5 is concerning - nearly at-risk levels. When teams don't have clear direction, effort is wasted, frustration builds, and outcomes suffer. This requires leadership attention.",
    recommendations: [
      {
        title: "Improve Goal Communication",
        actions: ["Cascade company OKRs down to team and individual level", "Use visual roadmaps and dashboards", "Regular town halls to reinforce strategic priorities"],
        impact: "Could improve clarity to 4.3-4.6/5"
      }
    ]
  },
  
  processBottlenecks: {
    title: "Process Bottlenecks",
    score: 0,
    status: "moderate" as const,
    interpretation: "Approval processes (38 mentions) and communication tools (32) are the top bottlenecks, suggesting bureaucratic friction and tool inefficiency are slowing down work significantly.",
    recommendations: [
      {
        title: "Streamline Approval Workflows",
        actions: ["Audit all approval processes for necessity", "Empower teams with delegated decision-making authority", "Set SLAs for approval turnaround times"],
        impact: "Could reduce approval bottlenecks by 50%"
      }
    ]
  },
  
  unclearInstructions: {
    title: "Unclear Instructions",
    score: 62,
    status: "moderate" as const,
    interpretation: "38% encounter unclear or conflicting instructions, which wastes time and creates frustration. This often correlates with rework, delays, and decreased quality.",
    recommendations: [
      {
        title: "Improve Instruction Quality",
        actions: ["Use templates for common task types", "Include examples and acceptance criteria", "Encourage questions before work begins"],
        impact: "Could reduce unclear instructions to 15-20%"
      }
    ]
  },
  
  roleClarity: {
    title: "Role Clarity",
    score: 75,
    status: "healthy" as const,
    interpretation: "75% report clear roles and responsibilities, which is good. The 25% without clarity may experience overlap confusion, gaps in coverage, or uncertainty about decision rights.",
    recommendations: [
      {
        title: "Document All Roles",
        actions: ["Create RACI matrices for key processes", "Update job descriptions to reflect current reality", "Publish organizational charts with clear reporting lines"],
        impact: "Could increase clarity to 85-90%"
      }
    ]
  },
  
  careerStagnation: {
    title: "Career Stagnation",
    score: 55,
    status: "moderate" as const,
    interpretation: "45% feel advancement opportunities are limited, which is a significant retention risk. High performers will leave if they don't see a path forward.",
    recommendations: [
      {
        title: "Create Growth Pathways",
        actions: ["Map out career ladders with clear progression criteria", "Offer lateral moves for skill development", "Create individual development plans (IDPs) for all employees"],
        impact: "Could reduce stagnation feeling to 25-30%"
      }
    ]
  },
  
  skillsUnderutilized: {
    title: "Skills Underutilized",
    score: 60,
    status: "moderate" as const,
    interpretation: "40% feel their skills are underutilized, representing wasted potential and likely leading to disengagement. When talented people can't use their abilities, they'll find places where they can.",
    recommendations: [
      {
        title: "Skills Inventory & Matching",
        actions: ["Conduct a team skills audit", "Match projects to people's strengths and growth areas", "Allow time for passion projects or skill-based rotation"],
        impact: "Could reduce underutilization to 20-25%"
      }
    ]
  },
  
  remoteWorkPreference: {
    title: "Remote Work Preference",
    score: 0,
    status: "moderate" as const,
    interpretation: "There's a 15% gap between current (30% full remote) and preferred (45% full remote) arrangements. This suggests some team members are required to be in-office more than they'd like, which could impact satisfaction.",
    recommendations: [
      {
        title: "Align Reality with Preferences",
        actions: ["Review remote work policies for flexibility", "Understand individual circumstances and needs", "Pilot increased remote options for willing teams"],
        impact: "Could reduce preference gap to 5-8%"
      }
    ]
  },
  
  remoteWorkBalance: {
    title: "Remote Work Balance",
    score: 0,
    status: "moderate" as const,
    interpretation: "Remote work makes work-life balance easier for 65% but communication (58% harder) and team connection (65% harder) suffer. This is a classic remote work trade-off that needs active management.",
    recommendations: [
      {
        title: "Preserve Remote Work Benefits",
        actions: ["Protect flexibility - don't revert to rigid schedules", "Support home office setups", "Maintain async-friendly processes"],
        impact: "Sustain 65% finding balance easier"
      }
    ]
  }
};

// Helper function to get color based on score (lower is better for burnout)
const getScoreColor = (score: number): string => {
  if (score <= 2.5) return 'var(--primary)'; // Primary purple - Healthy
  if (score <= 3.5) return 'var(--accent)'; // Accent yellow - At Risk
  return 'var(--secondary)'; // Secondary pink - Critical
};

export default function TestMicro() {
  const [selectedMicrosurvey, setSelectedMicrosurvey] = useState<MicrosurveyDetail | null>(null);

  return (
    <>
      <Header />
      <div className="min-h-screen w-full relative flex flex-col overflow-hidden page-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        </div>

        <div className="flex-1 relative z-10 flex flex-col pt-32 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.39, 1.69, 0.36, 1] }}
              className="mb-6 relative"
            >
              <div className="relative rounded-[15px] border border-border/50 bg-white shadow-lg p-6 lg:p-8">
                <div className="text-center">
                  <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tight mb-2">
                    📊 Microsurvey Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Comprehensive team health and operational insights
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* New Wellbeing & Operational Insights Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-black text-primary mb-2">
            📊 Wellbeing & Operational Insights
          </h2>
          <p className="text-muted-foreground">
            Microsurvey data across key team health dimensions
          </p>
        </motion.div>

        {/* 1. Weekly Pulse & Burnout Risks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative rounded-[15px] border border-border/50 bg-white shadow-lg p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-[15px] bg-primary/10">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-foreground">Weekly Pulse & Burnout Risks</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Weekly Energy Level */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.weeklyEnergyLevel,
                  chartComponent: <LineChart data={microsurveyData.weeklyEnergyLevel} color="var(--primary)" />
                })}
                className="relative rounded-[15px] p-5 transition-all duration-300 border-2 border-border/50 bg-card shadow-sm hover:shadow-xl hover:border-primary/40 cursor-pointer group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-3 pr-6">Weekly Energy Level</h4>
                <div className="h-32 mb-3">
                  <LineChart 
                    data={microsurveyData.weeklyEnergyLevel}
                    height={128}
                    color="var(--primary)"
                    showGrid={false}
                  />
                </div>
              </motion.div>

              {/* Ability to Disconnect */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.abilityToDisconnect,
                  chartComponent: <StackedBarChart data={microsurveyData.abilityToDisconnect} height={240} compact={false} />
                })}
                className="relative rounded-[15px] p-5 transition-all duration-300 border-2 border-border/50 bg-card shadow-sm hover:shadow-xl hover:border-primary/40 cursor-pointer group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-3 pr-6">Ability to Disconnect</h4>
                <div className="h-48 mb-3">
                  <StackedBarChart 
                    data={microsurveyData.abilityToDisconnect}
                    height={192}
                    compact={true}
                  />
                </div>
              </motion.div>

              {/* Weekly Workload Manageability */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.weeklyWorkload,
                  chartComponent: <GaugeChart value={microsurveyData.weeklyWorkload} max={5} />
                })}
                className="relative rounded-[15px] p-5 transition-all duration-300 border-2 border-border/50 bg-card shadow-sm hover:shadow-xl hover:border-primary/40 cursor-pointer group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-3 pr-6">Weekly Workload</h4>
                <div className="h-32 mb-3 flex items-center justify-center">
                  <GaugeChart 
                    value={microsurveyData.weeklyWorkload}
                    max={5}
                    size={120}
                  />
                </div>
              </motion.div>

              {/* Monthly Exhaustion Trend */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.monthlyExhaustion,
                  chartComponent: <LineChart data={microsurveyData.monthlyExhaustion} color="var(--secondary)" />
                })}
                className="relative rounded-[15px] p-5 transition-all duration-300 border-2 border-border/50 bg-card shadow-sm hover:shadow-xl hover:border-primary/40 cursor-pointer group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-3 pr-6">Monthly Exhaustion</h4>
                <div className="h-32 mb-3">
                  <LineChart 
                    data={microsurveyData.monthlyExhaustion}
                    height={128}
                    color="var(--secondary)"
                    showGrid={false}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Acute Stressors & Workload, Team Dynamics, Leadership, Workflow, Career, Remote Work sections coming soon... */}
        
        {/* 2. Acute Stressors & Workload */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 rounded-[15px] bg-accent/10">
                <AlertCircle className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-3xl font-black text-foreground">
                Acute Stressors & Workload
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Top Weekly Challenges */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.weeklyChallenges,
                  chartComponent: <WordCloud words={microsurveyData.weeklyChallenges} />
                })}
                className="col-span-full rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-accent/50 transition-all shadow-md hover:shadow-lg"
              >
                <div className="mb-4">
                  <div className="h-90">
                    <WordCloud words={microsurveyData.weeklyChallenges} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">Top Weekly Challenges</h4>
                    <p className="text-xs text-muted-foreground">Most reported workplace stressors</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>

              {/* Weekly Mood Triggers */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.moodTriggers,
                  chartComponent: <PieChart data={microsurveyData.moodTriggers} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-accent/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Weekly Mood Triggers</h4>
                <div className="mb-4">
                  <div className="h-90">
                    <PieChart data={microsurveyData.moodTriggers} size={280} />
                  </div>
                </div>
              </motion.div>

              {/* Bi-Weekly Challenge Types */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.challengeTypes,
                  chartComponent: <HorizontalBarChart data={microsurveyData.challengeTypes} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-accent/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Bi-Weekly Challenge Types</h4>
                <div className="mb-4">
                  <div className="h-48">
                    <HorizontalBarChart data={microsurveyData.challengeTypes} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 3. Team Dynamics & Psychological Safety */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 rounded-[15px] bg-secondary/10">
                <Heart className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-3xl font-black text-foreground">
                Team Dynamics & Psychological Safety
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Weekly Support */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.weeklySupport,
                  chartComponent: <GaugeChart value={microsurveyData.weeklySupport} max={5} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-secondary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <GaugeChart 
                      value={microsurveyData.weeklySupport}
                      max={5}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Psychological Safety */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.psychologicalSafety,
                  chartComponent: <PieChart data={microsurveyData.psychologicalSafety} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-secondary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <PieChart data={microsurveyData.psychologicalSafety} size={210} />
                  </div>
                </div>
              </motion.div>

              {/* Feeling Connected */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.feelingConnected,
                  chartComponent: <GaugeChart value={microsurveyData.feelingConnected} max={5} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-secondary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <GaugeChart 
                      value={microsurveyData.feelingConnected}
                      max={5}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Input Not Considered */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.inputNotConsidered,
                  chartComponent: <PieChart data={microsurveyData.inputNotConsidered} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-secondary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <PieChart data={microsurveyData.inputNotConsidered} size={210} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 4. Leadership & Recognition */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 rounded-[15px] bg-primary/10">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-3xl font-black text-foreground">
                Leadership & Recognition
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Manager Approachability */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.managerApproachability,
                  chartComponent: <GaugeChart value={microsurveyData.managerApproachability} max={5} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-primary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <GaugeChart 
                      value={microsurveyData.managerApproachability}
                      max={5}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Received Recognition */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.receivedRecognition,
                  chartComponent: <PieChart data={microsurveyData.receivedRecognition} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-primary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <PieChart data={microsurveyData.receivedRecognition} size={210} />
                  </div>
                </div>
              </motion.div>

              {/* Work is Appreciated */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.workAppreciated,
                  chartComponent: <PieChart data={microsurveyData.workAppreciated} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-primary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <PieChart data={microsurveyData.workAppreciated} size={210} />
                  </div>
                </div>
              </motion.div>

              {/* Clarity of Goals */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.clarityOfGoals,
                  chartComponent: <GaugeChart value={microsurveyData.clarityOfGoals} max={5} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-primary/50 transition-all shadow-md hover:shadow-lg group flex flex-col"
              >
                <div className="mb-auto">
                  <div className="h-64">
                    <GaugeChart 
                      value={microsurveyData.clarityOfGoals}
                      max={5}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 5. Workflow & Process Clarity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 rounded-[15px] bg-accent/10">
                <CheckCircle2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-3xl font-black text-foreground">
                Workflow & Process Clarity
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Process Bottlenecks */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.processBottlenecks,
                  chartComponent: <WordCloud words={microsurveyData.processBottlenecks} />
                })}
                className="col-span-full rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-accent/50 transition-all shadow-md hover:shadow-lg"
              >
                <div className="mb-4">
                  <div className="h-48">
                    <WordCloud words={microsurveyData.processBottlenecks} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">Process Bottlenecks</h4>
                    <p className="text-xs text-muted-foreground">Common workflow friction points</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>

              {/* Unclear Instructions */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.unclearInstructions,
                  chartComponent: <PieChart data={microsurveyData.unclearInstructions} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-accent/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Unclear Instructions</h4>
                <div className="mb-4">
                  <div className="h-66">
                    <PieChart data={microsurveyData.unclearInstructions} size={240} />
                  </div>
                </div>
              </motion.div>

              {/* Role Clarity */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.roleClarity,
                  chartComponent: <PieChart data={microsurveyData.roleClarity} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-accent/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Role Clarity</h4>
                <div className="mb-4">
                  <div className="h-66">
                    <PieChart data={microsurveyData.roleClarity} size={240} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 6. Career & Growth */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 rounded-[15px] bg-secondary/10">
                <TrendingUp className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-3xl font-black text-foreground">
                Career & Growth
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Career Stagnation */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.careerStagnation,
                  chartComponent: <PieChart data={microsurveyData.careerStagnation} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-secondary/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Career Stagnation</h4>
                <div className="mb-4">
                  <div className="h-66">
                    <PieChart data={microsurveyData.careerStagnation} size={240} />
                  </div>
                </div>
              </motion.div>

              {/* Skills Underutilized */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.skillsUnderutilized,
                  chartComponent: <PieChart data={microsurveyData.skillsUnderutilized} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-secondary/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Skills Underutilized</h4>
                <div className="mb-4">
                  <div className="h-66">
                    <PieChart data={microsurveyData.skillsUnderutilized} size={240} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 7. Remote & Hybrid Work */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 rounded-[15px] bg-primary/10">
                <Wind className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-3xl font-black text-foreground">
                Remote & Hybrid Work
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Remote Work Preference */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.remoteWorkPreference,
                  chartComponent: <StackedBarChart data={microsurveyData.remoteWorkPreference} height={240} compact={false} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-primary/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-1 pr-8">Remote Work Preference</h4>
                <p className="text-xs text-muted-foreground mb-3">Distribution of work mode preferences</p>
                <div className="mb-4">
                  <div className="h-64">
                    <StackedBarChart 
                      data={microsurveyData.remoteWorkPreference}
                      height={256}
                      compact={true}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>

              {/* Remote Work Balance */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedMicrosurvey({
                  ...microsurveyDetails.remoteWorkBalance,
                  chartComponent: <DivergingBarChart data={microsurveyData.remoteWorkBalance} />
                })}
                className="rounded-[15px] border-2 border-border bg-card p-6 cursor-pointer hover:border-primary/50 transition-all shadow-md hover:shadow-lg group"
              >
                <h4 className="text-sm font-bold text-foreground mb-3 pr-8">Remote Work Balance</h4>
                <div className="mb-4">
                  <div className="h-90">
                    <DivergingBarChart data={microsurveyData.remoteWorkBalance} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Microsurvey Detail Modal */}
      <AnimatePresence>
        {selectedMicrosurvey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMicrosurvey(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-[15px] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMicrosurvey(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="p-8 lg:p-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-[15px] bg-primary/10">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-black text-primary mb-2">
                        {selectedMicrosurvey.title}
                      </h2>
                      {selectedMicrosurvey.score > 0 && (
                        <div className="flex items-center gap-4">
                          <span
                            className="text-5xl font-black"
                            style={{ 
                              color: selectedMicrosurvey.status === 'at-risk' ? 'var(--accent)' : 
                                     selectedMicrosurvey.status === 'healthy' ? 'var(--primary)' : 
                                     'var(--secondary)'
                            }}
                          >
                            {selectedMicrosurvey.score.toFixed(1)}
                          </span>
                          <div className="px-3 py-1.5 rounded-[15px] text-xs font-bold uppercase tracking-wide"
                            style={{
                              backgroundColor: selectedMicrosurvey.status === 'at-risk' ? 'var(--warning-bg)' : 
                                             selectedMicrosurvey.status === 'healthy' ? 'hsla(251 51% 37% / 0.15)' : 
                                             'var(--danger-bg)',
                              color: selectedMicrosurvey.status === 'at-risk' ? 'var(--accent)' : 
                                    selectedMicrosurvey.status === 'healthy' ? 'var(--primary)' : 
                                    'var(--secondary)'
                            }}
                          >
                            {selectedMicrosurvey.status === 'at-risk' ? '⚠ At Risk' : 
                             selectedMicrosurvey.status === 'healthy' ? '✓ Healthy' : 
                             'ℹ Moderate'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="mb-6 p-6 rounded-[15px] bg-muted/30">
                    {selectedMicrosurvey.chartComponent}
                  </div>

                  {/* Interpretation */}
                  <div className="p-6 rounded-[15px] bg-primary/5 border border-primary/20">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-primary mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Interpretation
                    </h3>
                    <p className="text-base leading-relaxed text-foreground">
                      {selectedMicrosurvey.interpretation}
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Recommended Actions
                  </h3>
                  
                  <div className="space-y-4">
                    {selectedMicrosurvey.recommendations.map((rec: Recommendation, index: number) => (
                      <div key={index} className="rounded-[15px] border-2 border-border/50 bg-card p-5">
                        <h4 className="text-lg font-bold text-foreground mb-3">
                          {rec.title}
                        </h4>
                        
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
                            Action Steps
                          </p>
                          <ul className="space-y-2">
                            {rec.actions.map((action: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}