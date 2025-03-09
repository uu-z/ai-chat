import React, { useState } from 'react';
import { Agent } from '../types';
import { getAgentIcon } from '../data/agents';
import { Edit, Trash, Save, X, Plus, Settings } from 'lucide-react';

interface AgentManagerProps {
  installedAgents: Agent[];
  onUpdateAgent: (updatedAgent: Agent) => void;
  onDeleteAgent: (agentId: string) => void;
  onCreateAgent: (newAgent: Omit<Agent, 'id'>) => void;
  onOpenMarketplace: () => void;
  onClose: () => void;
}

const AgentManager: React.FC<AgentManagerProps> = ({
  installedAgents,
  onUpdateAgent,
  onDeleteAgent,
  onCreateAgent,
  onOpenMarketplace,
  onClose,
}) => {
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editForm, setEditForm] = useState<{
    name: string;
    avatar: string;
    metaPrompt: string;
  }>({
    name: '',
    avatar: 'Brain',
    metaPrompt: '',
  });

  const avatarOptions = ['Brain', 'Lightbulb', 'Zap', 'Code', 'Target', 'Briefcase'];

  const startEditing = (agent: Agent) => {
    setEditingAgentId(agent.id);
    setEditForm({
      name: agent.name,
      avatar: agent.avatar,
      metaPrompt: agent.metaPrompt,
    });
  };

  const cancelEditing = () => {
    setEditingAgentId(null);
    setShowCreateForm(false);
    setEditForm({
      name: '',
      avatar: 'Brain',
      metaPrompt: '',
    });
  };

  const handleSaveEdit = (agentId: string) => {
    if (editForm.name.trim() && editForm.metaPrompt.trim()) {
      onUpdateAgent({
        id: agentId,
        name: editForm.name,
        avatar: editForm.avatar,
        metaPrompt: editForm.metaPrompt,
      });
      setEditingAgentId(null);
    }
  };

  const handleCreateAgent = () => {
    if (editForm.name.trim() && editForm.metaPrompt.trim()) {
      onCreateAgent({
        name: editForm.name,
        avatar: editForm.avatar,
        metaPrompt: editForm.metaPrompt,
      });
      setShowCreateForm(false);
      setEditForm({
        name: '',
        avatar: 'Brain',
        metaPrompt: '',
      });
    }
  };

  const startCreating = () => {
    setShowCreateForm(true);
    setEditingAgentId(null);
    setEditForm({
      name: '',
      avatar: 'Brain',
      metaPrompt: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">管理AI助手</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {showCreateForm ? (
            <div className="border rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-3">创建新助手</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    助手名称
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="输入助手名称"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    选择图标
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {avatarOptions.map((avatar) => {
                      const AvatarIcon = getAgentIcon(avatar);
                      return (
                        <button
                          key={avatar}
                          onClick={() => setEditForm({...editForm, avatar})}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            editForm.avatar === avatar
                              ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-500'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <AvatarIcon size={20} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    提示词
                  </label>
                  <textarea
                    value={editForm.metaPrompt}
                    onChange={(e) => setEditForm({...editForm, metaPrompt: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="输入助手的提示词，定义其行为和回答风格..."
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleCreateAgent}
                    disabled={!editForm.name.trim() || !editForm.metaPrompt.trim()}
                    className={`px-3 py-1.5 rounded-md ${
                      editForm.name.trim() && editForm.metaPrompt.trim()
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    创建
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={startCreating}
              className="w-full border border-dashed border-gray-300 rounded-lg p-4 mb-4 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-300"
            >
              <Plus size={18} className="mr-2" />
              创建自定义助手
            </button>
          )}
          
          <div className="space-y-3">
            {installedAgents.map((agent) => {
              const AgentIcon = getAgentIcon(agent.avatar);
              const isEditing = editingAgentId === agent.id;
              
              return (
                <div key={agent.id} className="border rounded-lg overflow-hidden">
                  {isEditing ? (
                    <div className="p-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            助手名称
                          </label>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            选择图标
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {avatarOptions.map((avatar) => {
                              const AvatarIcon = getAgentIcon(avatar);
                              return (
                                <button
                                  key={avatar}
                                  onClick={() => setEditForm({...editForm, avatar})}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    editForm.avatar === avatar
                                      ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-500'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  <AvatarIcon size={20} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            提示词
                          </label>
                          <textarea
                            value={editForm.metaPrompt}
                            onChange={(e) => setEditForm({...editForm, metaPrompt: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={cancelEditing}
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            取消
                          </button>
                          <button
                            onClick={() => handleSaveEdit(agent.id)}
                            disabled={!editForm.name.trim() || !editForm.metaPrompt.trim()}
                            className={`px-3 py-1.5 rounded-md ${
                              editForm.name.trim() && editForm.metaPrompt.trim()
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            保存
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                          <AgentIcon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{agent.name}</h3>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => startEditing(agent)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => onDeleteAgent(agent.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {agent.metaPrompt}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {installedAgents.length === 0 && !showCreateForm && (
            <div className="text-center py-8 text-gray-500">
              <Settings size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="mb-4">您还没有安装任何AI助手</p>
              <button
                onClick={onOpenMarketplace}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                浏览助手市场
              </button>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={onOpenMarketplace}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            浏览助手市场
          </button>
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

export default AgentManager;
