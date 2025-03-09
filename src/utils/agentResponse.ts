import { Agent } from '../types';

export const generateAgentResponse = (userMessage: string, agent: Agent): string => {
  // This is a simplified mock implementation
  // In a real application, this would call an AI API with the agent's meta prompt

  const responses: { [key: string]: (msg: string) => string } = {
    'agent-1': (msg) => {
      // Direct Solver
      return `问题：${msg.substring(0, 30)}${msg.length > 30 ? '...' : ''}\n解决方案：\n1. 分析问题核心\n2. 确定关键步骤\n3. 执行最优路径\n\n无需多余解释，直接执行上述步骤可解决问题。`;
    },
    'agent-2': (msg) => {
      // Idea Generator
      return `针对"${msg.substring(0, 20)}${msg.length > 20 ? '...' : ''}"的创新方案：\n\n1. 颠覆性思路：从反向思考问题\n2. 跨领域借鉴：应用生物学原理\n3. 极简主义：减少90%复杂度\n4. 协作模式：引入多方参与机制\n5. 自动化路径：构建自我优化系统`;
    },
    'agent-3': (msg) => {
      // Efficiency Expert
      return `效率分析：\n\n当前流程瓶颈：沟通环节占用40%时间\n优化方案：\n- 实施15分钟站会代替1小时会议（节省75%时间）\n- 使用异步沟通工具（提高30%响应速度）\n- 建立决策矩阵（减少50%决策时间）\n\n预期结果：总体效率提升65%`;
    },
    'agent-4': (msg) => {
      // Code Assistant
      return `\`\`\`javascript\n// 解决方案\nfunction optimize(input) {\n  const result = input\n    .filter(item => item.value > 0)\n    .map(item => ({ ...item, processed: true }))\n    .reduce((acc, curr) => {\n      acc[curr.id] = curr;\n      return acc;\n    }, {});\n  \n  return Object.values(result);\n}\n\`\`\`\n\n性能复杂度：O(n)，内存使用优化，支持大数据集。`;
    },
    'agent-5': (msg) => {
      // Goal Tracker
      return `目标分解：\n\n第1阶段（1-7天）：\n- 定义明确成功指标\n- 收集必要资源\n- 设置每日检查点\n\n第2阶段（8-14天）：\n- 执行核心任务\n- 每日进度回顾\n- 调整优先级\n\n潜在障碍：时间分配不足，解决方案：使用时间块技术`;
    },
    'agent-6': (msg) => {
      // Business Advisor
      return `商业分析：\n\n市场机会：$2.3B（年增长率17%）\n竞争格局：3个主要竞争者，市场集中度42%\n差异化策略：\n1. 价格优势：降低15%获取成本\n2. 用户体验：提升NPS至少20点\n3. 数据驱动：建立预测性客户需求模型\n\nROI预测：首年1.4x，三年3.2x`;
    },
    'market-agent-1': (msg) => {
      // 数据分析专家
      return `数据分析结果：\n\n关键指标：\n- 增长率：23.5%（同比+7.2%）\n- 用户留存：68%（环比+5%）\n- 转化漏斗效率：提升12%\n\n数据可视化建议：使用热力图展示用户行为模式，突出高价值交互点。\n\n洞察：用户在第二步流失率高，建议简化该环节，预计可提升整体转化15-20%。`;
    },
    'market-agent-2': (msg) => {
      // 创意写作助手
      return `创意标题：《突破思维边界，拥抱无限可能》\n\n正文：\n想象一下，当你站在决策的十字路口，每一条路都通向不同的未来。传统思维会让你选择最安全的道路，但真正的突破往往来自于勇敢尝试未知的旅程。\n\n就像爱因斯坦曾说："我们无法用制造问题的思维方式来解决问题。"今天，就让我们一起打破常规，重新定义可能性的边界。`;
    },
    'market-agent-3': (msg) => {
      // 项目管理专家
      return `项目计划分析：\n\n关键路径：任务A → C → F → H（总耗时28天）\n资源分配优化：\n- 开发团队：重新平衡工作负载，消除6月15-22日瓶颈\n- QA资源：提前介入设计阶段，减少后期返工\n\n风险预警：\n⚠️ 第三方API集成可能延迟（概率60%）\n应对策略：准备备选方案，提前2周启动集成测试`;
    },
    'market-agent-4': (msg) => {
      // 学习辅导员
      return `概念解析：\n\n核心原理：将复杂问题分解为基础组件，建立连接，形成知识网络。\n\n类比说明：就像搭建乐高，每个小块（基础概念）组合成更大的结构（复杂理论）。\n\n学习计划：\n1. 掌握基础定义（2天）\n2. 理解应用场景（3天）\n3. 解决简单问题（4天）\n4. 分析复杂案例（5天）\n\n练习题：[根据您的具体问题生成相关练习]`;
    },
    'market-agent-5': (msg) => {
      // 健康顾问
      return `健康建议：\n\n基于您的描述，推荐以下调整：\n\n1. 睡眠优化：\n   - 建立固定睡眠时间（22:30-6:30）\n   - 睡前1小时避免蓝光设备\n\n2. 营养调整：\n   - 增加蛋白质摄入（每天体重×1.6g）\n   - 每餐添加彩色蔬菜（至少3种颜色）\n\n3. 运动计划：\n   - 每周3次30分钟中高强度间歇训练\n   - 每天10分钟伸展活动\n\n这些小改变将在2-3周内带来明显的精力提升。`;
    },
    'market-agent-6': (msg) => {
      // 财务规划师
      return `财务分析：\n\n当前状况：\n- 储蓄率：15%（建议：提高至20%）\n- 债务/收入比：32%（健康范围内）\n- 应急基金：覆盖2个月（目标：6个月）\n\n优化建议：\n1. 重新分配投资组合：增加10%指数基金配置\n2. 建立自动储蓄机制：每月收入的5%直接转入高收益储蓄\n3. 优化税务策略：利用税收递延账户，预计年省税5-7%\n\n5年财务预测：净资产增长85-110%（基于7%年均回报率）`;
    },
    'market-agent-7': (msg) => {
      // 旅行规划师
      return `旅行建议：\n\n基于您的兴趣，推荐以下行程：\n\nDay 1-3：城市探索\n- 上午：历史区步行游览（预计3小时）\n- 下午：当地美食体验（推荐：传统市场）\n- 晚上：屋顶酒吧欣赏城市夜景\n\nDay 4-5：自然探险\n- 全天：国家公园徒步（中等难度，带足水）\n- 日落：海滩野餐\n\n住宿推荐：\n- 市中心精品酒店（$120-150/晚）\n- 海边小屋（$90-110/晚）\n\n交通建议：租用小型车，便于灵活探索`;
    },
    'market-agent-8': (msg) => {
      // UI/UX设计顾问
      return `设计分析：\n\n用户流程优化：\n- 将5步注册流程简化为3步（预计提升转化率23%）\n- 重新设计导航结构，减少层级（提升任务完成率18%）\n\n视觉设计建议：\n- 配色方案：主色#3B82F6，辅色#F59E0B，中性色#F3F4F6\n- 排版：增加内容间距（16px → 24px），提高可读性\n- 交互元素：增大触摸目标（最小48px），优化移动体验\n\n可用性改进：添加进度指示器，提供明确反馈，减少用户认知负荷`;
    }
  };

  // Default response for any agent not in the predefined list
  const defaultResponse = (msg: string) => {
    return `我已收到您的消息："${msg.substring(0, 50)}${msg.length > 50 ? '...' : ''}"。\n\n根据我的专长，我建议从以下几个方面考虑：\n1. 分析核心问题\n2. 考虑多种可能的解决方案\n3. 评估每种方案的优缺点\n4. 选择最适合的方案并制定实施计划`;
  };

  // Get the specific response function for this agent, or use default
  const responseFunction = responses[agent.id] || defaultResponse;

  // Generate the response
  return responseFunction(userMessage);
};

// 根据用户输入自动选择合适的Agent
export const autoSelectAgents = (userMessage: string, availableAgents: Agent[], maxAgents: number = 3): Agent[] => {
  // 这是一个简化的实现，实际应用中可能需要更复杂的NLP或AI分析

  // 提取用户消息中的关键词
  const keywords = extractKeywords(userMessage.toLowerCase());

  // 为每个Agent计算匹配分数
  const scoredAgents = availableAgents
    .filter(agent => agent.isInstalled)
    .map(agent => {
      // 基于标签匹配计算分数
      const tagScore = (agent.tags || []).reduce((score, tag) => {
        return keywords.includes(tag.toLowerCase()) ? score + 3 : score;
      }, 0);

      // 基于类别匹配计算分数
      const categoryScore = agent.category && keywords.includes(agent.category.toLowerCase()) ? 2 : 0;

      // 基于描述匹配计算分数
      const descriptionScore = (agent.description || '').toLowerCase().split(' ').reduce((score, word) => {
        return keywords.includes(word) ? score + 0.5 : score;
      }, 0);

      return {
        agent,
        score: tagScore + categoryScore + descriptionScore
      };
    })
    .filter(item => item.score > 0) // 只保留有匹配的Agent
    .sort((a, b) => b.score - a.score); // 按分数降序排序

  // 如果没有匹配的Agent，返回默认的几个
  if (scoredAgents.length === 0) {
    return availableAgents
      .filter(agent => agent.isInstalled)
      .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
      .slice(0, maxAgents);
  }

  // 返回得分最高的几个Agent
  return scoredAgents.slice(0, maxAgents).map(item => item.agent);
};

// 从文本中提取关键词
const extractKeywords = (text: string): string[] => {
  // 移除标点符号
  const cleanText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

  // 分词并过滤掉常见的停用词
  const stopWords = ['的', '了', '是', '在', '我', '有', '和', '就', '不', '人', '都', '一', '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好', '自己', '这'];
  const words = cleanText.split(' ').filter(word => word.length > 1 && !stopWords.includes(word));

  return [...new Set(words)]; // 去重
};
