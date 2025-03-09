import React, { useState } from "react";
import { Agent, User } from "../types";
import { getAgentIcon } from "../data/agents";

interface NewChatModalProps {
  availableAgents: Agent[];
  onCreateChat: (name: string, selectedAgents: Agent[]) => void;
  onClose: () => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  availableAgents,
  onCreateChat,
  onClose,
}) => {
  const [chatName, setChatName] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);

  const handleAgentToggle = (agent: Agent) => {
    if (selectedAgents.some((a) => a.id === agent.id)) {
      setSelectedAgents(selectedAgents.filter((a) => a.id !== agent.id));
    } else {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatName.trim() && selectedAgents.length > 0) {
      onCreateChat(chatName, selectedAgents);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">创建新聊天</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="chatName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              聊天名称
            </label>
            <input
              type="text"
              id="chatName"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="输入聊天名称"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择AI助手 (至少选择一个)
            </label>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
              {availableAgents.map((agent) => {
                const AgentIcon = getAgentIcon(agent.avatar);
                return (
                  <div
                    key={agent.id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                  >
                    <input
                      type="checkbox"
                      id={`agent-${agent.id}`}
                      checked={selectedAgents.some((a) => a.id === agent.id)}
                      onChange={() => handleAgentToggle(agent)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                        <AgentIcon size={14} />
                      </div>
                      <label
                        htmlFor={`agent-${agent.id}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {agent.name}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!chatName.trim() || selectedAgents.length === 0}
              className={`px-4 py-2 rounded-md ${
                chatName.trim() && selectedAgents.length > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;
