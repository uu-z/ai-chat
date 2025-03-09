import React, { useState } from "react";
import {
  Plus,
  Search,
  Star,
  Clock,
  Filter,
  X,
  Settings,
  Store,
  Users,
  MessageSquare,
} from "lucide-react";
import { ChatGroup } from "../types";
import { getAgentIcon } from "../data/agents";

interface SidebarProps {
  chatGroups: ChatGroup[];
  activeGroupId: string;
  onGroupSelect: (groupId: string) => void;
  onNewChat: () => void;
  onOpenAgentMarketplace: () => void;
  onOpenAgentManager: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatGroups,
  activeGroupId,
  onGroupSelect,
  onNewChat,
  onOpenAgentMarketplace,
  onOpenAgentManager,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "starred" | "recent">(
    "all"
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredGroups = chatGroups.filter((group) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.participants.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Apply type filter
    if (filterType === "all") return matchesSearch;
    if (filterType === "starred")
      return matchesSearch && group.id.includes("starred"); // Just for demo
    if (filterType === "recent")
      return matchesSearch && group.messages.length > 0;

    return matchesSearch;
  });

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <MessageSquare size={18} className="mr-2 text-indigo-600" />
            聊天
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              title="筛选"
            >
              <Filter size={16} />
            </button>
            <button
              onClick={onNewChat}
              className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
              title="新建聊天"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="flex space-x-2 mb-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterType === "all"
                  ? "bg-indigo-100 text-indigo-600 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setFilterType("starred")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterType === "starred"
                  ? "bg-indigo-100 text-indigo-600 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Star size={14} className="inline mr-1" />
              星标
            </button>
            <button
              onClick={() => setFilterType("recent")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterType === "recent"
                  ? "bg-indigo-100 text-indigo-600 font-medium"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Clock size={14} className="inline mr-1" />
              最近
            </button>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="搜索聊天"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-9 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1];
            const hasUnread = false; // For demo purposes

            return (
              <div
                key={group.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeGroupId === group.id
                    ? "bg-indigo-50 border-l-2 border-indigo-500"
                    : ""
                } ${hasUnread ? "border-l-4 border-indigo-500" : ""}`}
                onClick={() => onGroupSelect(group.id)}
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {group.participants
                      .slice(0, 3)
                      .map((participant, index) => {
                        if (participant.avatar.startsWith("http")) {
                          return (
                            <div
                              key={participant.id}
                              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                            >
                              <img
                                src={participant.avatar}
                                alt={participant.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        } else {
                          const AgentIcon = getAgentIcon(participant.avatar);
                          return (
                            <div
                              key={participant.id}
                              className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center shadow-sm"
                            >
                              <AgentIcon
                                size={18}
                                className="text-indigo-600"
                              />
                            </div>
                          );
                        }
                      })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate text-gray-800">
                        {group.name}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs text-gray-500">
                          {new Date(lastMessage.timestamp).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {lastMessage
                        ? `${
                            lastMessage.senderName
                          }: ${lastMessage.content.substring(0, 30)}${
                            lastMessage.content.length > 30 ? "..." : ""
                          }`
                        : "无消息"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            {searchTerm ? "没有找到匹配的聊天" : "没有聊天记录"}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-200 space-y-2">
        <button
          onClick={onNewChat}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-sm"
        >
          <Plus size={16} className="mr-2" />
          创建新聊天
        </button>

        <div className="flex space-x-2">
          <button
            onClick={onOpenAgentMarketplace}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
          >
            <Store size={16} className="mr-1.5" />
            助手市场
          </button>
          <button
            onClick={onOpenAgentManager}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
          >
            <Users size={16} className="mr-1.5" />
            管理助手
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
