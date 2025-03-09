import React, { useState, useEffect } from 'react';
import { Search, X, Star, Download, Check, Filter, ArrowUpDown } from 'lucide-react';
import { Agent } from '../types';
import { getAgentIcon } from '../data/agents';

interface AgentMarketplaceProps {
  installedAgents: Agent[];
  onInstallAgent: (agent: Agent) => void;
  onUninstallAgent: (agentId: string) => void;
  onClose: () => void;
}

const AgentMarketplace: React.FC<AgentMarketplaceProps> = ({
  installedAgents,
  onInstallAgent,
  onUninstallAgent,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'installed' | 'popular'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');
  const [marketplaceAgents, setMarketplaceAgents] = useState<Agent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Simulated marketplace agents - in a real app, this would come from an API
  useEffect(() => {
    // Combine installed agents with marketplace agents
    const marketAgents: Agent[] = [
      {
        id: 'market-agent-1',
        name: '数据分析专家',
        avatar: 'Brain',
        metaPrompt: '专注于数据分析和可视化。提供数据解读，识别趋势和模式，生成图表建议，并提供actionable insights。',
        category: '数据分析',
        rating: 4.8,
        downloads: 12500,
        isNew: false
      },
      {
        id: 'market-agent-2',
        name: '创意写作助手',
        avatar: 'Lightbulb',
        metaPrompt: '帮助生成创意内容，包括故事、广告文案、社交媒体帖子等。提供多种风格选择，并根据目标受众调整语调。',
        category: '内容创作',
        rating: 4.6,
        downloads: 9800,
        isNew: false
      },
      {
        id: 'market-agent-3',
        name: '项目管理专家',
        avatar: 'Target',
        metaPrompt: '协助项目规划、任务分解、资源分配和进度跟踪。提供甘特图建议，识别关键路径，并预测潜在风险。',
        category: '项目管理',
        rating: 4.7,
        downloads: 11200,
        isNew: false
      },
      {
        id: 'market-agent-4',
        name: '学习辅导员',
        avatar: 'Brain',
        metaPrompt: '帮助理解复杂概念，提供学习计划，生成练习题，并根据学习风格调整解释方式。专注于深度理解而非简单记忆。',
        category: '教育',
        rating: 4.9,
        downloads: 15600,
        isNew: true
      },
      {
        id: 'market-agent-5',
        name: '健康顾问',
        avatar: 'Zap',
        metaPrompt: '提供健康生活方式建议，包括营养、运动、睡眠和压力管理。根据个人目标定制建议，并帮助建立可持续习惯。',
        category: '健康',
        rating: 4.5,
        downloads: 8900,
        isNew: true
      },
      {
        id: 'market-agent-6',
        name: '财务规划师',
        avatar: 'Briefcase',
        metaPrompt: '协助个人财务规划，包括预算管理、储蓄策略、投资建议和债务管理。提供量化分析和长期财务目标规划。',
        category: '财务',
        rating: 4.7,
        downloads: 10300,
        isNew: false
      },
      {
        id: 'market-agent-7',
        name: '旅行规划师',
        avatar: 'Target',
        metaPrompt: '帮助规划旅行行程，推荐目的地、住宿、交通和活动。考虑预算、时间和个人偏好，提供定制化旅行体验。',
        category: '生活',
        rating: 4.6,
        downloads: 9500,
        isNew: true
      },
      {
        id: 'market-agent-8',
        name: 'UI/UX设计顾问',
        avatar: 'Code',
        metaPrompt: '提供用户界面和用户体验设计建议，包括布局、配色、交互模式和可用性优化。基于用户研究和设计原则提供建议。',
        category: '设计',
        rating: 4.8,
        downloads: 12100,
        isNew: false
      }
    ];
    
    setMarketplaceAgents(marketAgents);
  }, []);

  const installedAgentIds = installedAgents.map(agent => agent.id);
  
  const categories = Array.from(new Set(marketplaceAgents.map(agent => agent.category)));
  
  const filteredAgents = marketplaceAgents.filter(agent => {
    // Apply search filter
    const matchesSearch = searchTerm === '' || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.metaPrompt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    const matchesCategory = selectedCategory === null || agent.category === selectedCategory;
    
    // Apply installation filter
    const matchesInstallation = 
      filter === 'all' || 
      (filter === 'installed' && installedAgentIds.includes(agent.id)) ||
      (filter === 'popular' && agent.downloads > 10000);
    
    return matchesSearch && matchesCategory && matchesInstallation;
  });
  
  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.downloads - a.downloads;
    } else {
      // For demo purposes, we'll just use the 'isNew' flag
      return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const toggleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">AI助手市场</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="搜索AI助手..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-9 pr-9 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button 
                  className="px-3 py-2 border border-gray-300 rounded-md flex items-center space-x-1 hover:bg-gray-50"
                >
                  <Filter size={16} />
                  <span>筛选</span>
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden">
                  <div className="py-1">
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${filter === 'all' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setFilter('all')}
                    >
                      全部助手
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${filter === 'installed' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setFilter('installed')}
                    >
                      已安装
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${filter === 'popular' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setFilter('popular')}
                    >
                      热门助手
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  className="px-3 py-2 border border-gray-300 rounded-md flex items-center space-x-1 hover:bg-gray-50"
                >
                  <ArrowUpDown size={16} />
                  <span>排序</span>
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200 hidden">
                  <div className="py-1">
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'popular' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setSortBy('popular')}
                    >
                      热门程度
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2 text-sm ${sortBy === 'newest' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setSortBy('newest')}
                    >
                      最新发布
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-2 gap-2">
            <button 
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === null 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              全部类别
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedAgents.length > 0 ? (
              sortedAgents.map((agent) => {
                const isInstalled = installedAgentIds.includes(agent.id);
                const AgentIcon = getAgentIcon(agent.avatar);
                
                return (
                  <div key={agent.id} className="border rounded-lg p-4 hover:border-indigo-300 transition-colors">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                        <AgentIcon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                                {agent.rating}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{agent.downloads.toLocaleString()} 次下载</span>
                              {agent.isNew && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">新</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => isInstalled ? onUninstallAgent(agent.id) : onInstallAgent(agent)}
                              className={`px-3 py-1 rounded-md text-sm ${
                                isInstalled
                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                              }`}
                            >
                              {isInstalled ? (
                                <span className="flex items-center">
                                  <Check size={14} className="mr-1" />
                                  已安装
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <Download size={14} className="mr-1" />
                                  安装
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full mb-2">
                            {agent.category}
                          </span>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {agent.metaPrompt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                没有找到匹配的AI助手
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentMarketplace;
