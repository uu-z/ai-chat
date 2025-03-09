import React, { useState } from "react";
import { Agent } from "../types";
import { getAgentIcon } from "../data/agents";
import { Search, X, Plus } from "lucide-react";

interface AgentSelectorProps {
  availableAgents: Agent[];
  selectedAgents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  onOpenMarketplace: () => void;
  onClose: () => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({
  availableAgents,
  selectedAgents,
  onSelectAgent,
  onOpenMarketplace,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const selectedAgentIds = selectedAgents.map((agent) => agent.id);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredAgents = availableAgents.filter(
    (agent) =>
      searchTerm === "" ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.metaPrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.category &&
        agent.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.tags &&
        agent.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">选择AI助手</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="搜索助手..."
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

        <p className="text-gray-600 mb-4">
          选择AI助手加入你的聊天群组。每个助手都有特定的专长和回答风格。
        </p>

        <div className="max-h-80 overflow-y-auto mb-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredAgents.map((agent) => {
              const isSelected = selectedAgentIds.includes(agent.id);
              const AgentIcon = getAgentIcon(agent.avatar);

              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent)}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                      <AgentIcon size={18} />
                    </div>
                    <h3 className="font-medium">{agent.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {agent.metaPrompt.substring(0, 60)}...
                  </p>
                  {agent.tags && agent.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {agent.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onOpenMarketplace}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Plus size={18} className="mr-2" />
            获取更多助手
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

export default AgentSelector;
