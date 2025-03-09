import { Agent } from '../types';
import { Brain, Lightbulb, Zap, Code, Target, Briefcase, BarChart, PenTool, ClipboardList, GraduationCap, Heart, DollarSign, Compass, Palette } from 'lucide-react';

export const availableAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Direct Solver',
    avatar: 'Brain',
    metaPrompt: '别绕弯子，直接上干货。问题是什么？要什么结果？列步骤/给方案，别用套话。没用的词全删了，只留关键信息。',
    category: '效率',
    description: '直接解决问题，提供简洁明了的步骤和方案，不浪费时间。',
    rating: 4.8,
    downloads: 15600,
    isInstalled: true,
    tags: ['效率', '直接', '解决方案']
  },
  {
    id: 'agent-2',
    name: 'Idea Generator',
    avatar: 'Lightbulb',
    metaPrompt: '提供创新思路。列出5个不同角度的解决方案。每个方案简洁明了，突出创新点。',
    category: '创新',
    description: '从多个角度提供创新解决方案，激发思维，突破常规。',
    rating: 4.6,
    downloads: 12300,
    isInstalled: true,
    tags: ['创新', '思路', '多角度']
  },
  {
    id: 'agent-3',
    name: 'Efficiency Expert',
    avatar: 'Zap',
    metaPrompt: '分析最高效路径。识别瓶颈，提供时间/资源优化方案。用数据支持建议，给出具体可行的改进步骤。',
    category: '效率',
    description: '分析流程瓶颈，提供基于数据的优化方案，提高效率。',
    rating: 4.7,
    downloads: 11200,
    isInstalled: true,
    tags: ['效率', '优化', '流程']
  },
  {
    id: 'agent-4',
    name: 'Code Assistant',
    avatar: 'Code',
    metaPrompt: '提供简洁高效的代码解决方案。直接给出代码示例，附带简短说明。优先考虑性能和可维护性。',
    category: '技术',
    description: '提供高效、可维护的代码解决方案，专注于实用性和性能。',
    rating: 4.9,
    downloads: 14500,
    isInstalled: true,
    tags: ['代码', '技术', '开发']
  },
  {
    id: 'agent-5',
    name: 'Goal Tracker',
    avatar: 'Target',
    metaPrompt: '分解目标为可执行步骤。设定明确时间线，提供进度跟踪方法。识别潜在障碍并给出应对策略。',
    category: '项目管理',
    description: '将目标分解为可执行步骤，设定时间线，跟踪进度，预见并解决障碍。',
    rating: 4.7,
    downloads: 10300,
    isInstalled: true,
    tags: ['目标', '计划', '跟踪']
  },
  {
    id: 'agent-6',
    name: 'Business Advisor',
    avatar: 'Briefcase',
    metaPrompt: '从商业角度分析问题。考虑成本效益、市场影响和长期战略。提供基于数据的建议，避免空洞理论。',
    category: '商业',
    description: '从商业角度分析问题，考虑成本效益、市场影响和长期战略。',
    rating: 4.6,
    downloads: 9800,
    isInstalled: true,
    tags: ['商业', '战略', '分析']
  },
  {
    id: 'market-agent-1',
    name: '数据分析专家',
    avatar: 'BarChart',
    metaPrompt: '专注于数据分析和可视化。提供数据解读，识别趋势和模式，生成图表建议，并提供actionable insights。',
    category: '数据分析',
    description: '专注于数据分析和可视化，提供数据解读，识别趋势和模式。',
    rating: 4.8,
    downloads: 12500,
    isInstalled: false,
    tags: ['数据', '分析', '可视化']
  },
  {
    id: 'market-agent-2',
    name: '创意写作助手',
    avatar: 'PenTool',
    metaPrompt: '帮助生成创意内容，包括故事、广告文案、社交媒体帖子等。提供多种风格选择，并根据目标受众调整语调。',
    category: '内容创作',
    description: '帮助生成创意内容，包括故事、广告文案、社交媒体帖子等。',
    rating: 4.6,
    downloads: 9800,
    isInstalled: false,
    tags: ['写作', '创意', '内容']
  },
  {
    id: 'market-agent-3',
    name: '项目管理专家',
    avatar: 'ClipboardList',
    metaPrompt: '协助项目规划、任务分解、资源分配和进度跟踪。提供甘特图建议，识别关键路径，并预测潜在风险。',
    category: '项目管理',
    description: '协助项目规划、任务分解、资源分配和进度跟踪。',
    rating: 4.7,
    downloads: 11200,
    isInstalled: false,
    tags: ['项目', '管理', '规划']
  },
  {
    id: 'market-agent-4',
    name: '学习辅导员',
    avatar: 'GraduationCap',
    metaPrompt: '帮助理解复杂概念，提供学习计划，生成练习题，并根据学习风格调整解释方式。专注于深度理解而非简单记忆。',
    category: '教育',
    description: '帮助理解复杂概念，提供学习计划，生成练习题。',
    rating: 4.9,
    downloads: 15600,
    isInstalled: false,
    tags: ['学习', '教育', '辅导']
  },
  {
    id: 'market-agent-5',
    name: '健康顾问',
    avatar: 'Heart',
    metaPrompt: '提供健康生活方式建议，包括营养、运动、睡眠和压力管理。根据个人目标定制建议，并帮助建立可持续习惯。',
    category: '健康',
    description: '提供健康生活方式建议，包括营养、运动、睡眠和压力管理。',
    rating: 4.5,
    downloads: 8900,
    isInstalled: false,
    tags: ['健康', '生活', '习惯']
  },
  {
    id: 'market-agent-6',
    name: '财务规划师',
    avatar: 'DollarSign',
    metaPrompt: '协助个人财务规划，包括预算管理、储蓄策略、投资建议和债务管理。提供量化分析和长期财务目标规划。',
    category: '财务',
    description: '协助个人财务规划，包括预算管理、储蓄策略、投资建议和债务管理。',
    rating: 4.7,
    downloads: 10300,
    isInstalled: false,
    tags: ['财务', '规划', '投资']
  },
  {
    id: 'market-agent-7',
    name: '旅行规划师',
    avatar: 'Compass',
    metaPrompt: '帮助规划旅行行程，推荐目的地、住宿、交通和活动。考虑预算、时间和个人偏好，提供定制化旅行体验。',
    category: '生活',
    description: '帮助规划旅行行程，推荐目的地、住宿、交通和活动。',
    rating: 4.6,
    downloads: 9500,
    isInstalled: false,
    tags: ['旅行', '规划', '体验']
  },
  {
    id: 'market-agent-8',
    name: 'UI/UX设计顾问',
    avatar: 'Palette',
    metaPrompt: '提供用户界面和用户体验设计建议，包括布局、配色、交互模式和可用性优化。基于用户研究和设计原则提供建议。',
    category: '设计',
    description: '提供用户界面和用户体验设计建议，包括布局、配色、交互模式和可用性优化。',
    rating: 4.8,
    downloads: 12100,
    isInstalled: false,
    tags: ['设计', 'UI', 'UX']
  }
];

export const getAgentIcon = (iconName: string) => {
  switch (iconName) {
    case 'Brain':
      return Brain;
    case 'Lightbulb':
      return Lightbulb;
    case 'Zap':
      return Zap;
    case 'Code':
      return Code;
    case 'Target':
      return Target;
    case 'Briefcase':
      return Briefcase;
    case 'BarChart':
      return BarChart;
    case 'PenTool':
      return PenTool;
    case 'ClipboardList':
      return ClipboardList;
    case 'GraduationCap':
      return GraduationCap;
    case 'Heart':
      return Heart;
    case 'DollarSign':
      return DollarSign;
    case 'Compass':
      return Compass;
    case 'Palette':
      return Palette;
    default:
      return Brain;
  }
};
