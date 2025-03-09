import { User, ChatGroup } from '../types';
import { availableAgents } from './agents';

export const currentUser: User = {
  id: 'user-1',
  name: '当前用户',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
};

export const mockChatGroups: ChatGroup[] = [
  {
    id: 'group-1',
    name: '项目规划小组',
    participants: [
      currentUser,
      availableAgents[0],
      availableAgents[2],
      availableAgents[4]
    ],
    messages: [
      {
        id: 'msg-1',
        content: '我们需要规划下一季度的产品路线图，有什么建议？',
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        timestamp: Date.now() - 3600000,
        isAgent: false
      },
      {
        id: 'msg-2',
        content: '问题：产品路线图规划\n需要：下季度计划\n步骤：\n1. 分析当前产品数据\n2. 确定3-5个核心功能优先级\n3. 设定明确交付时间\n4. 分配资源和责任人\n5. 建立每周检查点',
        senderId: availableAgents[0].id,
        senderName: availableAgents[0].name,
        senderAvatar: availableAgents[0].avatar,
        timestamp: Date.now() - 3500000,
        isAgent: true
      },
      {
        id: 'msg-3',
        content: '瓶颈分析：\n- 开发资源分散，集中80%资源到20%核心功能\n- 测试周期过长，引入自动化测试减少30%时间\n- 跨团队沟通低效，建立每日15分钟同步会议\n\n建议时间分配：规划(10%)→开发(60%)→测试(20%)→部署(10%)',
        senderId: availableAgents[2].id,
        senderName: availableAgents[2].name,
        senderAvatar: availableAgents[2].avatar,
        timestamp: Date.now() - 3400000,
        isAgent: true
      }
    ]
  },
  {
    id: 'group-2',
    name: '技术解决方案',
    participants: [
      currentUser,
      availableAgents[1],
      availableAgents[3]
    ],
    messages: [
      {
        id: 'msg-1',
        content: '我们的应用加载速度太慢，如何优化？',
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        timestamp: Date.now() - 7200000,
        isAgent: false
      },
      {
        id: 'msg-2',
        content: '解决方案：\n```javascript\n// 实现代码分割\nimport { lazy, Suspense } from "react";\nconst LazyComponent = lazy(() => import("./Component"));\n\n// 使用\n<Suspense fallback={<Loader />}>\n  <LazyComponent />\n</Suspense>\n```\n\n关键点：代码分割减少初始加载包大小，按需加载组件。考虑添加资源预加载和HTTP/2支持。',
        senderId: availableAgents[3].id,
        senderName: availableAgents[3].name,
        senderAvatar: availableAgents[3].avatar,
        timestamp: Date.now() - 7100000,
        isAgent: true
      }
    ]
  }
];
