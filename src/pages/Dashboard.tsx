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

// Mock data
const mockData = {
  currentScore: 2.8,
  previousScore: 3.2,
  weekRange: " Nov 14, 2025",
  
  subcategories: [
    { 
      key: "exhaustion", 
      name: "Exhaustion", 
      score: 4.5, 
      previousScore: 4.2,
      status: "critical",
      icon: Zap,
      description: "Energy & Fatigue levels",
      color: "var(--secondary)", // secondary pink for critical (>3.5)
      trend: "worsening",
      historicalData: [
        { month: "Aug", score: 3.8 },
        { month: "Sep", score: 4.1 },
        { month: "Oct", score: 4.2 },
        { month: "Nov", score: 4.5 }
      ],
      interpretation: "This score indicates severe exhaustion levels. Team members are experiencing extreme fatigue, feeling drained, and struggling with energy depletion. This is a critical concern requiring immediate intervention."
    },
    { 
      key: "mental_distance", 
      name: "Mental Distance", 
      score: 1.3,
      previousScore: 1.6, 
      status: "healthy",
      icon: Wind,
      description: "Engagement with work",
      color: "var(--primary)", // primary purple for healthy (0-2.5)
      trend: "improving",
      historicalData: [
        { month: "Aug", score: 2.1 },
        { month: "Sep", score: 1.8 },
        { month: "Oct", score: 1.6 },
        { month: "Nov", score: 1.3 }
      ],
      interpretation: "This excellent score shows strong engagement and connection with work. Team members feel motivated, involved, and maintain a positive attitude toward their responsibilities."
    },
    { 
      key: "cognitive", 
      name: "Cognitive", 
      score: 3.2,
      previousScore: 3.0, 
      status: "at-risk",
      icon: Brain,
      description: "Focus & Concentration",
      color: "var(--accent)", // accent yellow for at-risk (2.6-3.5)
      trend: "worsening",
      historicalData: [
        { month: "Aug", score: 2.7 },
        { month: "Sep", score: 2.9 },
        { month: "Oct", score: 3.0 },
        { month: "Nov", score: 3.2 }
      ],
      interpretation: "This score indicates moderate cognitive impairment. Team members are experiencing difficulties with concentration, memory, and decision-making. Attention is needed to prevent further decline."
    },
    { 
      key: "emotional", 
      name: "Emotional", 
      score: 1.8,
      previousScore: 2.1, 
      status: "healthy",
      icon: Heart,
      description: "Emotional regulation",
      color: "var(--primary)", // primary purple for healthy (0-2.5)
      trend: "improving",
      historicalData: [
        { month: "Aug", score: 2.4 },
        { month: "Sep", score: 2.2 },
        { month: "Oct", score: 2.1 },
        { month: "Nov", score: 1.8 }
      ],
      interpretation: "This healthy score reflects good emotional regulation and resilience. Team members are managing stress well and maintaining emotional balance in their work environment."
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

  recommendations: [
    {
      priority: "critical",
      dimension: "Exhaustion",
      dimensionKey: "exhaustion",
      title: "Immediate Energy Recovery Protocol",
      action: "Implement mandatory rest periods and reduce overtime by 40%",
      why: "Exhaustion at 4.5/5 indicates severe burnout risk. Team energy is critically depleted.",
      howTo: [
        "Block 2-3pm daily as 'no meeting' recovery time",
        "Cap work weeks at 40 hours - enforce strictly",
        "Introduce flexible start times (7am-11am window)"
      ],
      timeframe: "Start immediately - See results in 1 month",
      impact: "Could reduce exhaustion by 30-40%"
    },
    {
      priority: "high",
      dimension: "Cognitive",
      dimensionKey: "cognitive",
      title: "Focus & Deep Work Protection",
      action: "Create distraction-free zones for concentration-intensive work",
      why: "Cognitive score of 3.2/5 shows declining mental sharpness and focus ability.",
      howTo: [
        "Designate Mon/Wed/Fri mornings as 'deep work only'",
        "Turn off all notifications during focus blocks",
        "Limit meetings to 25 minutes with 5-min breaks"
      ],
      timeframe: "Implement next week - Review in 3 weeks",
      impact: "Expected 15-25% cognitive improvement"
    },
    {
      priority: "low",
      dimension: "Emotional",
      dimensionKey: "emotional",
      title: "Sustain Emotional Resilience",
      action: "Maintain current support systems and add peer recognition",
      why: "Emotional health is good at 1.8/5, but worsening trend requires attention.",
      howTo: [
        "Weekly team check-ins focusing on wellbeing",
        "Peer recognition program (kudos board/channel)",
        "Monthly 1-on-1s to discuss stress and support needs"
      ],
      timeframe: "Ongoing - No urgent changes needed",
      impact: "Prevent deterioration, maintain healthy zone"
    },
    {
      priority: "low",
      dimension: "Mental Distance",
      dimensionKey: "mental_distance",
      title: "Keep Engagement Strong",
      action: "Celebrate progress and reinforce team connection",
      why: "Engagement is excellent at 1.3/5 and improving - keep the momentum.",
      howTo: [
        "Share wins and progress updates weekly",
        "Maintain transparent communication on goals",
        "Continue current team building activities"
      ],
      timeframe: "Ongoing - No urgent changes needed",
      impact: "Maintain current healthy engagement"
    }
  ]
};

const overallScoreTrend = [
  { month: "Sep", score: 3.7 },
  { month: "Oct", score: mockData.previousScore },
  { month: "Nov", score: mockData.currentScore }
];

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
    status: "at-risk",
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
    status: "healthy",
    interpretation: "The data shows that 50% of your team sometimes or rarely disconnects from work, which is concerning for long-term wellbeing. Only 20% report 'always' being able to disconnect. This pattern suggests boundary-setting challenges that could lead to burnout.",
    recommendations: [
      {
        title: "Establish Clear Boundaries",
        actions: ["Set explicit 'no-work' hours (e.g., after 6pm and weekends)", "Disable work notifications outside business hours", "Lead by example - managers should respect offline time"],
        impact: "Could increase 'Always' disconnect rate to 35-40%"
      },
      {
        title: "Educate on Digital Wellbeing",
        actions: ["Provide training on healthy work-life integration", "Share tools for managing work-related anxiety", "Create a team charter about communication expectations"],
        impact: "Expected 30% improvement in disconnection ability"
      }
    ]
  },
  
  weeklyWorkload: {
    title: "Weekly Workload Manageability",
    score: 3.7,
    status: "at-risk",
    interpretation: "At 3.7/5, your team's workload is in the at-risk zone, indicating that work demands are approaching unsustainable levels. This score suggests that team members are struggling to complete tasks within reasonable timeframes.",
    recommendations: [
      {
        title: "Workload Audit & Redistribution",
        actions: ["Conduct a comprehensive task audit to identify bottlenecks", "Redistribute tasks based on capacity and expertise", "Consider hiring support or reallocating resources"],
        impact: "Could reduce workload pressure by 20-30%"
      },
      {
        title: "Prioritization Framework",
        actions: ["Implement a clear prioritization system (e.g., Eisenhower Matrix)", "Establish weekly priority-setting meetings", "Empower team to say 'no' to non-critical tasks"],
        impact: "Expected 25% improvement in workload manageability"
      }
    ]
  },
  
  monthlyExhaustion: {
    title: "Monthly Exhaustion Trend",
    score: 3.5,
    status: "at-risk",
    interpretation: "Exhaustion has been steadily increasing from 3.2 in August to 3.8 in November. This upward trend is alarming and suggests accumulating fatigue that recovery periods aren't addressing. Immediate intervention is needed.",
    recommendations: [
      {
        title: "Mandatory Recovery Periods",
        actions: ["Implement 'recharge days' - one Friday off per month", "Encourage full use of vacation time", "Block December as a 'low-intensity' month"],
        impact: "Could reverse the trend and reduce exhaustion by 30%"
      },
      {
        title: "Identify Root Causes",
        actions: ["Conduct one-on-ones to understand exhaustion drivers", "Review project timelines and adjust unrealistic deadlines", "Address any toxic work patterns or cultural issues"],
        impact: "Expected 40% reduction in exhaustion if root causes are addressed"
      }
    ]
  },
  
  weeklyChallenges: {
    title: "Top Weekly Challenges",
    score: 0,
    status: "info",
    interpretation: "The most frequently mentioned challenges are deadlines (45 mentions), communication issues (32), and workload (28). This pattern suggests systemic issues with time management, cross-team coordination, and resource allocation.",
    recommendations: [
      {
        title: "Address Deadline Pressure",
        actions: ["Review and extend unrealistic deadlines", "Build in buffer time for unexpected issues", "Improve estimation practices for project timelines"],
        impact: "Could reduce deadline stress by 35%"
      },
      {
        title: "Improve Communication Systems",
        actions: ["Standardize communication channels (reduce tool sprawl)", "Implement async-first communication practices", "Create clear escalation paths for urgent issues"],
        impact: "Expected 40% reduction in communication-related challenges"
      }
    ]
  },
  
  moodTriggers: {
    title: "Weekly Mood Triggers",
    score: 0,
    status: "info",
    interpretation: "45% of mood impacts stem from workload issues, 30% from work relationships, and 25% from personal life. The high workload component reinforces other findings and suggests this is the primary lever for improvement.",
    recommendations: [
      {
        title: "Workload Intervention",
        actions: ["See recommendations from 'Weekly Workload Manageability'", "Monitor workload impact on mood weekly", "Adjust quickly when workload triggers increase"],
        impact: "Could shift distribution to 30% workload, 25% relationships, 45% personal"
      },
      {
        title: "Support Work Relationships",
        actions: ["Facilitate team-building activities", "Provide conflict resolution training", "Create safe spaces for feedback and concerns"],
        impact: "Expected 20% improvement in relationship-triggered mood"
      }
    ]
  },
  
  challengeTypes: {
    title: "Challenge Types Ranking",
    score: 0,
    status: "info",
    interpretation: "High workload (42) and tight deadlines (38) dominate the challenge landscape, followed by unclear expectations (28). This cluster of issues points to project management and scoping problems.",
    recommendations: [
      {
        title: "Project Management Overhaul",
        actions: ["Implement Agile methodologies for better sprint planning", "Use capacity planning to avoid overcommitment", "Regular retrospectives to identify process improvements"],
        impact: "Could reduce top 3 challenges by 40%"
      },
      {
        title: "Clarify Expectations",
        actions: ["Create detailed project briefs before kickoff", "Establish clear definition of 'done' for all tasks", "Regular check-ins to ensure alignment"],
        impact: "Expected 50% reduction in unclear expectations"
      }
    ]
  },
  
  weeklySupport: {
    title: "Weekly Support",
    score: 3.8,
    status: "at-risk",
    interpretation: "At 3.8/5, team members feel moderately supported but there's room for improvement. This score suggests that support systems exist but may not be consistently accessible or effective for everyone.",
    recommendations: [
      {
        title: "Strengthen Support Networks",
        actions: ["Establish peer mentorship programs", "Ensure managers have weekly check-ins with direct reports", "Create channels for anonymous support requests"],
        impact: "Could improve support score to 4.2-4.5/5"
      },
      {
        title: "Resource Accessibility",
        actions: ["Publicize existing support resources (EAP, wellness programs)", "Reduce barriers to accessing help", "Normalize asking for support in team culture"],
        impact: "Expected 25% increase in support utilization"
      }
    ]
  },
  
  psychologicalSafety: {
    title: "Psychological Safety",
    score: 72,
    status: "healthy",
    interpretation: "72% of your team feels safe speaking up about mistakes or challenges, which is good but not excellent. The 28% who don't feel safe represent a significant portion that may be silently struggling or withholding important information.",
    recommendations: [
      {
        title: "Foster Open Communication",
        actions: ["Publicly celebrate learning from failures", "Ensure leaders model vulnerability and admit mistakes", "Create 'no-blame' retrospectives after incidents"],
        impact: "Could increase to 85-90% feeling safe"
      },
      {
        title: "Address the 28%",
        actions: ["Conduct anonymous surveys to understand barriers", "Provide multiple channels for raising concerns", "Hold leadership accountable for creating safety"],
        impact: "Expected 40% improvement among those currently feeling unsafe"
      }
    ]
  },
  
  feelingConnected: {
    title: "Feeling Connected",
    score: 3.5,
    status: "at-risk",
    interpretation: "A connection score of 3.5/5 indicates moderate team cohesion with room for improvement. In remote or hybrid environments, this score suggests that social bonds may be weakening.",
    recommendations: [
      {
        title: "Strengthen Team Bonds",
        actions: ["Regular team social events (virtual or in-person)", "Create 'coffee chat' pairings for casual connections", "Celebrate wins and milestones together"],
        impact: "Could improve connection to 4.0-4.3/5"
      },
      {
        title: "Hybrid Work Optimization",
        actions: ["Coordinate in-office days for team collaboration", "Use video calls (not just chat) for team interactions", "Create virtual water cooler spaces"],
        impact: "Expected 30% improvement in connection scores"
      }
    ]
  },
  
  inputNotConsidered: {
    title: "Input Not Considered",
    score: 68,
    status: "healthy",
    interpretation: "68% report their input IS considered (answering 'No' to feeling ignored), which is positive. However, 32% feeling their expertise is overlooked is significant and could lead to disengagement.",
    recommendations: [
      {
        title: "Improve Decision Transparency",
        actions: ["Explain why certain suggestions aren't implemented", "Create clear processes for input gathering and consideration", "Close the feedback loop on all submitted ideas"],
        impact: "Could reduce 'Yes' responses to 15-20%"
      },
      {
        title: "Empower Subject Matter Experts",
        actions: ["Give SMEs decision-making authority in their domains", "Publicly recognize valuable contributions", "Ensure diverse voices are heard in meetings"],
        impact: "Expected 45% improvement in feeling heard"
      }
    ]
  },
  
  managerApproachability: {
    title: "Manager Approachability",
    score: 4.2,
    status: "healthy",
    interpretation: "At 4.2/5, managers are quite approachable, which is excellent. This strong score indicates good leadership accessibility and open-door culture. Maintain and reinforce this strength.",
    recommendations: [
      {
        title: "Maintain Approachability",
        actions: ["Continue current practices that foster openness", "Regularly solicit feedback on leadership effectiveness", "Share best practices across management team"],
        impact: "Sustain current high levels"
      },
      {
        title: "Reach for Excellence",
        actions: ["Proactive check-ins (don't wait for team to approach)", "Train managers on active listening skills", "Create multiple touch points (1-on-1s, team meetings, casual chats)"],
        impact: "Could push score to 4.5-4.7/5"
      }
    ]
  },
  
  receivedRecognition: {
    title: "Received Recognition",
    score: 58,
    status: "moderate",
    interpretation: "Only 58% report receiving recognition, meaning 42% of your team feels their work goes unnoticed. Recognition is a key driver of engagement and morale - this gap needs attention.",
    recommendations: [
      {
        title: "Formalize Recognition Programs",
        actions: ["Implement peer-to-peer recognition system", "Manager training on effective praise and acknowledgment", "Celebrate both big wins and small contributions"],
        impact: "Could increase to 75-80% receiving recognition"
      },
      {
        title: "Make Recognition Timely & Specific",
        actions: ["Recognize contributions within 48 hours", "Be specific about what was done well and its impact", "Use public and private recognition appropriately"],
        impact: "Expected 50% improvement in recognition effectiveness"
      }
    ]
  },
  
  workAppreciated: {
    title: "Work is Appreciated",
    score: 65,
    status: "moderate",
    interpretation: "65% feel their work is recognized and appreciated, leaving 35% feeling undervalued. This gap between those who receive recognition (58%) and feel appreciated (65%) suggests recognition quality may vary.",
    recommendations: [
      {
        title: "Connect Work to Impact",
        actions: ["Show how individual contributions support company goals", "Share customer/stakeholder feedback with the team", "Make appreciation genuine and meaningful, not formulaic"],
        impact: "Could increase to 80-85% feeling appreciated"
      },
      {
        title: "Leadership Recognition Cadence",
        actions: ["Weekly shout-outs in team meetings", "Monthly highlight of exceptional work", "Quarterly awards or bonuses for outstanding contributions"],
        impact: "Expected 35% increase in appreciation sentiment"
      }
    ]
  },
  
  clarityOfGoals: {
    title: "Clarity of Goals",
    score: 3.6,
    status: "at-risk",
    interpretation: "Goal clarity at 3.6/5 is concerning - nearly at-risk levels. When teams don't have clear direction, effort is wasted, frustration builds, and outcomes suffer. This requires leadership attention.",
    recommendations: [
      {
        title: "Improve Goal Communication",
        actions: ["Cascade company OKRs down to team and individual level", "Use visual roadmaps and dashboards", "Regular town halls to reinforce strategic priorities"],
        impact: "Could improve clarity to 4.3-4.6/5"
      },
      {
        title: "Ensure Two-Way Understanding",
        actions: ["Have team members repeat back their understanding of goals", "Document and share goals in accessible formats", "Quarterly goal review and adjustment sessions"],
        impact: "Expected 40% improvement in goal clarity"
      }
    ]
  },
  
  processBottlenecks: {
    title: "Process Bottlenecks",
    score: 0,
    status: "info",
    interpretation: "Approval processes (38 mentions) and communication tools (32) are the top bottlenecks, suggesting bureaucratic friction and tool inefficiency are slowing down work significantly.",
    recommendations: [
      {
        title: "Streamline Approval Workflows",
        actions: ["Audit all approval processes for necessity", "Empower teams with delegated decision-making authority", "Set SLAs for approval turnaround times"],
        impact: "Could reduce approval bottlenecks by 50%"
      },
      {
        title: "Optimize Communication Stack",
        actions: ["Consolidate to 2-3 core tools maximum", "Create clear guidelines on which tool for what purpose", "Reduce notification fatigue through smart configuration"],
        impact: "Expected 45% reduction in communication friction"
      }
    ]
  },
  
  unclearInstructions: {
    title: "Unclear Instructions",
    score: 62,
    status: "moderate",
    interpretation: "38% encounter unclear or conflicting instructions, which wastes time and creates frustration. This often correlates with rework, delays, and decreased quality.",
    recommendations: [
      {
        title: "Improve Instruction Quality",
        actions: ["Use templates for common task types", "Include examples and acceptance criteria", "Encourage questions before work begins"],
        impact: "Could reduce unclear instructions to 15-20%"
      },
      {
        title: "Feedback Loop on Clarity",
        actions: ["Ask team to flag unclear instructions immediately", "Review and improve frequently misunderstood instructions", "Train leaders on clear communication"],
        impact: "Expected 60% improvement in instruction clarity"
      }
    ]
  },
  
  roleClarity: {
    title: "Role Clarity",
    score: 75,
    status: "healthy",
    interpretation: "75% report clear roles and responsibilities, which is good. The 25% without clarity may experience overlap confusion, gaps in coverage, or uncertainty about decision rights.",
    recommendations: [
      {
        title: "Document All Roles",
        actions: ["Create RACI matrices for key processes", "Update job descriptions to reflect current reality", "Publish organizational charts with clear reporting lines"],
        impact: "Could increase clarity to 85-90%"
      },
      {
        title: "Address Gray Areas",
        actions: ["Identify and resolve areas of role overlap or confusion", "Clarify decision-making authority at each level", "Regular role expectation discussions in 1-on-1s"],
        impact: "Expected 45% reduction in role ambiguity"
      }
    ]
  },
  
  careerStagnation: {
    title: "Career Stagnation",
    score: 55,
    status: "moderate",
    interpretation: "45% feel advancement opportunities are limited, which is a significant retention risk. High performers will leave if they don't see a path forward.",
    recommendations: [
      {
        title: "Create Growth Pathways",
        actions: ["Map out career ladders with clear progression criteria", "Offer lateral moves for skill development", "Create individual development plans (IDPs) for all employees"],
        impact: "Could reduce stagnation feeling to 25-30%"
      },
      {
        title: "Invest in Development",
        actions: ["Allocate budget for training and courses", "Support conference attendance and certifications", "Implement mentorship and shadowing programs"],
        impact: "Expected 50% improvement in perceived growth opportunities"
      }
    ]
  },
  
  skillsUnderutilized: {
    title: "Skills Underutilized",
    score: 60,
    status: "moderate",
    interpretation: "40% feel their skills are underutilized, representing wasted potential and likely leading to disengagement. When talented people can't use their abilities, they'll find places where they can.",
    recommendations: [
      {
        title: "Skills Inventory & Matching",
        actions: ["Conduct a team skills audit", "Match projects to people's strengths and growth areas", "Allow time for passion projects or skill-based rotation"],
        impact: "Could reduce underutilization to 20-25%"
      },
      {
        title: "Stretch Assignments",
        actions: ["Identify high-potential employees for challenging projects", "Cross-functional collaboration opportunities", "Let people volunteer for initiatives outside their core role"],
        impact: "Expected 55% improvement in skill utilization"
      }
    ]
  },
  
  remoteWorkPreference: {
    title: "Remote Work Preference",
    score: 0,
    status: "info",
    interpretation: "There's a 15% gap between current (30% full remote) and preferred (45% full remote) arrangements. This suggests some team members are required to be in-office more than they'd like, which could impact satisfaction.",
    recommendations: [
      {
        title: "Align Reality with Preferences",
        actions: ["Review remote work policies for flexibility", "Understand individual circumstances and needs", "Pilot increased remote options for willing teams"],
        impact: "Could reduce preference gap to 5-8%"
      },
      {
        title: "Optimize Hybrid Model",
        actions: ["Make in-office time purposeful (collaboration, not just presence)", "Invest in quality remote work tech", "Train managers to lead hybrid teams effectively"],
        impact: "Expected 40% improvement in arrangement satisfaction"
      }
    ]
  },
  
  remoteWorkBalance: {
    title: "Remote Work Balance",
    score: 0,
    status: "info",
    interpretation: "Remote work makes work-life balance easier for 65% but communication (58% harder) and team connection (65% harder) suffer. This is a classic remote work trade-off that needs active management.",
    recommendations: [
      {
        title: "Preserve Remote Work Benefits",
        actions: ["Protect flexibility - don't revert to rigid schedules", "Support home office setups", "Maintain async-friendly processes"],
        impact: "Sustain 65% finding balance easier"
      },
      {
        title: "Solve Communication & Connection",
        actions: ["Over-invest in relationship building", "Use video for important conversations", "Regular in-person gatherings (quarterly team offsites)"],
        impact: "Could shift communication to 50-50 and connection to 45% harder/55% easier"
      }
    ]
  }
};

export default function DashboardCompany() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedRec, setExpandedRec] = useState<number | null>(0);
  const [selectedDimension, setSelectedDimension] = useState<typeof mockData.subcategories[0] | null>(null);
  const [selectedMicrosurvey, setSelectedMicrosurvey] = useState<{
    title: string;
    score: number;
    status: string;
    interpretation: string;
    recommendations: Array<{
      title: string;
      actions: string[];
      impact: string;
    }>;
    chartComponent: React.ReactNode;
  } | null>(null);
  
  // Get current date formatted like "Nov 14, 2025"
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Helper function to get color based on score (lower is better for burnout)
  const getScoreColor = (score: number): string => {
    if (score <= 2.5) return 'var(--success-bright)'; // Green - Healthy
    if (score <= 3.5) return 'var(--warning)'; // Yellow - At Risk
    return 'var(--danger)'; // Red - Critical
  };
  
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
              <div className="relative rounded-[15px] shadow-lg p-6 lg:p-8" style={{ background: 'var(--background-light)', borderColor: 'var(--foreground)', border: '1.5px solid' }}>
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                  {/* Left: Title, Date, and Info */}
                  <div className="flex-1 text-center lg:text-left lg:pl-20">
                    <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tight mb-2">
                      Burnout Score
                    </h1>
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-medium">{getCurrentDate()}</span>
                    </div>
                    <p className="text-sm text-foreground/70 max-w-xs lg:mx-0 mx-auto">
                      Tracking energy, focus, and emotional resilience
                    </p>
                  </div>

                  {/* Center: Scorecard Widget */}
                  <div className="flex items-center justify-center lg:mx-8">
                    <ScorecardWidget
                      currentScore={mockData.currentScore}
                      previousScore={mockData.previousScore}
                      animatedScore={animatedScore}
                      trendData={overallScoreTrend}
                    />
                  </div>

                  {/* Right: Quick Stats */}
                  <div className="flex-1 text-center lg:text-right lg:pr-16">
                    <div className="inline-flex flex-col gap-2 lg:items-end items-center">
                      <div className="px-4 py-2 rounded-[15px] bg-muted/30">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-0.5">
                          Health Status
                        </p>
                        <p className="text-base font-black text-foreground">
                          {mockData.currentScore <= 2.5 ? '✓ Healthy' : mockData.currentScore <= 3.5 ? '⚠ At Risk' : '⚠ Critical'}
                        </p>
                      </div>
                      <p className="text-xs text-foreground/60 px-2">
                        Lower scores = healthier teams
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid flex-1 min-h-0 gap-6 xl:grid-cols-2 xl:auto-rows-[minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="relative min-h-0"
              >
                <div className="relative h-full rounded-[15px] shadow-lg p-6 flex flex-col" style={{ background: 'var(--background-light)', borderColor: 'var(--foreground)', border: '1.5px solid' }}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-black text-primary">Dimensions</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-h-0 overflow-auto pr-1 content-start">
                    {mockData.subcategories.map((category, index) => {
                      const Icon = category.icon;
                      const scoreColor = getScoreColor(category.score);

                      return (
                        <motion.div
                          key={category.key}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          onClick={() => setSelectedDimension(category)}
                          className="relative rounded-[15px] p-4 transition-all duration-300 bg-card shadow-sm hover:shadow-md cursor-pointer"
                          style={{ borderColor: 'var(--foreground)', border: '1.5px solid' }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="p-2.5 rounded-[15px] bg-muted/50"
                              >
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{category.description}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-end gap-2 mt-4">
                            <span
                              className="text-3xl font-black"
                              style={{ color: scoreColor }}
                            >
                              {category.score.toFixed(1)}
                            </span>
                            <span className="text-sm font-semibold uppercase text-muted-foreground">
                              /5
                            </span>
                          </div>

                          <div className="w-full h-2.5 rounded-full overflow-hidden mt-3 bg-border/30">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(category.score / 5) * 100}%` }}
                              viewport={{ once: true, margin: "-60px" }}
                              transition={{ duration: 1.1, delay: index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: scoreColor }}
                            />
                          </div>

                          <div className="mt-3 text-[11px] uppercase tracking-wide">
                            <span 
                              className="font-bold"
                              style={{ color: scoreColor }}
                            >
                              {category.score <= 2.5 ? 'Healthy' : category.score <= 3.5 ? 'At Risk' : 'Critical'}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="relative min-h-0"
              >
                <div className="relative h-full rounded-[15px] shadow-lg p-6 flex flex-col" style={{ background: 'var(--background-light)', borderColor: 'var(--foreground)', border: '1.5px solid' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <h2 className="text-xl font-black text-primary">Manager Action Plan</h2>
                  </div>

                  <div className="flex-1 min-h-0 overflow-auto pr-1 space-y-3">
                    {mockData.recommendations.map((rec, index) => {
                      const isExpanded = expandedRec === index;
                      const dimensionColor = getScoreColor(
                        mockData.subcategories.find(cat => cat.key === rec.dimensionKey)?.score || 0
                      );
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-[15px] overflow-hidden transition-all duration-300 border bg-card shadow-sm hover:shadow-md"
                          style={{
                            borderColor: isExpanded ? dimensionColor : 'hsl(var(--border) / 0.5)',
                            borderWidth: isExpanded ? '1.5px' : '1.5px'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedRec(isExpanded ? null : index)}
                            className="w-full text-left p-4 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-center gap-2">
                                <span
                                  className="px-2.5 py-1 rounded-[15px] text-[10px] font-black uppercase tracking-wide"
                                  style={{
                                    backgroundColor: rec.priority === 'critical'
                                      ? 'var(--danger-bg)'
                                      : rec.priority === 'high'
                                      ? 'var(--warning-bg)'
                                      : rec.priority === 'medium'
                                      ? 'var(--warning-bg)'
                                      : 'var(--success-bg)',
                                    color: rec.priority === 'critical'
                                      ? 'var(--danger-dark)'
                                      : rec.priority === 'high'
                                      ? 'var(--warning-dark)'
                                      : rec.priority === 'medium'
                                      ? 'var(--warning-dark)'
                                      : 'var(--success)'
                                  }}
                                >
                                  Priority: {rec.priority}
                                </span>
                              </div>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ArrowRight className="w-4 h-4 transform rotate-90 text-muted-foreground" />
                              </motion.div>
                            </div>

                            <h3 className={`font-bold text-foreground transition-all duration-300 ${isExpanded ? 'text-xl' : 'text-sm'}`}>
                              {rec.title}
                            </h3>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 space-y-4" style={{ borderTopColor: 'var(--foreground)', borderTop: '1.5px solid' }}>
  <div className="pt-4 mx-4">
    <div className="flex items-start gap-2 mb-3">
      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Why This Matters
      </p>
    </div>
    <NumberText className="text-sm leading-relaxed text-foreground/80 ">
      {rec.why}
    </NumberText>
  </div>

  {rec.priority !== 'low' && (
    <div className="rounded-[15px] p-4 bg-muted/50">
      <div className="flex items-start gap-2 mb-3">
        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-foreground" />
        <p className="text-xs font-bold uppercase tracking-wide text-foreground">
          How to Execute
        </p>
      </div>
      <ul className="space-y-2">
        {rec.howTo.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <span className="text-base font-black text-foreground">
              {i + 1}.
            </span>
            <NumberText className="leading-relaxed">{step}</NumberText>
          </li>
        ))}
      </ul>
    </div>
  )}

  <div className="flex items-center gap-2 pt-2">
    <Calendar className="w-4 h-4 text-muted-foreground" />
    <span className="text-xs font-semibold text-muted-foreground">
      {rec.timeframe}
    </span>
  </div>
</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Dimension Detail Modal */}
      <AnimatePresence>
        {selectedDimension && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDimension(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[15px] shadow-2xl"
              style={{ background: 'var(--background-light)' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDimension(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-[15px] bg-muted/50">
                    {React.createElement(selectedDimension.icon, { 
                      className: "w-8 h-8",
                      style: { color: getScoreColor(selectedDimension.score) }
                    })}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-black mb-2" style={{ color: getScoreColor(selectedDimension.score) }}>
                      {selectedDimension.description}
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-end gap-2">
                        <span
                          className="text-5xl font-black"
                          style={{ color: getScoreColor(selectedDimension.score) }}
                        >
                          {selectedDimension.score.toFixed(1)}
                        </span>
                        <span className="text-xl font-semibold uppercase text-muted-foreground pb-1">
                          /5
                        </span>
                      </div>
                      <div className="px-3 py-1.5 rounded-[15px] text-xs font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: `${getScoreColor(selectedDimension.score)}20`,
                          color: getScoreColor(selectedDimension.score)
                        }}
                      >
                        {selectedDimension.score <= 2.5 ? 'Healthy' : selectedDimension.score <= 3.5 ? 'At Risk' : 'Critical'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interpretation */}
                <div className="mb-8 p-6 rounded-[15px] bg-muted/30">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                    Score Interpretation
                  </h3>
                  <p className="text-base leading-relaxed text-foreground">
                    {selectedDimension.interpretation}
                  </p>
                </div>

                {/* Historical Chart */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
                    3-Month Trend
                  </h3>
                  <div className="relative h-64 p-6 bg-muted/30 rounded-[15px]">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-6 bottom-6 flex flex-col justify-between text-xs font-semibold text-muted-foreground">
                      <span>5.0</span>
                      <span>3.75</span>
                      <span>2.5</span>
                      <span>1.25</span>
                      <span>0.0</span>
                    </div>

                    {/* Chart area */}
                    <div className="ml-8 h-full flex items-end justify-around gap-4">
                      {selectedDimension.historicalData.map((data: { month: string; score: number }, idx: number) => {
                        const height = (data.score / 5) * 100;
                        const color = getScoreColor(data.score);
                        
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                            <div className="relative w-full flex items-end justify-center" style={{ height: '180px' }}>
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="w-full rounded-t-lg relative"
                                style={{ backgroundColor: color }}
                              >
                                <span
                                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold whitespace-nowrap"
                                  style={{ color: color }}
                                >
                                  {data.score.toFixed(1)}
                                </span>
                              </motion.div>
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">
                              {data.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex items-center justify-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--success-bright)' }}></div>
                      <span className="text-muted-foreground">Healthy (0-2.5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></div>
                      <span className="text-muted-foreground">At Risk (2.6-3.5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--danger)' }}></div>
                      <span className="text-muted-foreground">Critical (3.6-5.0)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

          