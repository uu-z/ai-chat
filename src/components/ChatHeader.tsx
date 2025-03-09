import React, { useState } from "react";
import {
  Info,
  MoreVertical,
  Star,
  Pin,
  UserPlus,
  FileText,
  Bell,
  Search,
} from "lucide-react";
import { ChatGroup, User, Agent } from "../types";
import { getAgentIcon } from "../data/agents";

interface ChatHeaderProps {
  groupName: string;
  participants: Array<User | Agent>;
  onAddAgent: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  groupName,
  participants,
  onAddAgent,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  const togglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  return (
    <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center">
        <div className="flex -space-x-2 mr-3">
          {participants.slice(0, 3).map((participant) => {
            if (participant.avatar.startsWith("http")) {
              return (
                <div
                  key={participant.id}
                  className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm"
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
                  className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center shadow-sm"
                >
                  <AgentIcon size={16} className="text-indigo-600" />
                </div>
              );
            }
          })}
          {participants.length > 3 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shadow-sm">
              +{participants.length - 3}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold text-gray-800">{groupName}</h2>
            {isStarred && (
              <Star
                size={16}
                className="ml-2 text-yellow-400 fill-yellow-400"
              />
            )}
            {isPinned && <Pin size={16} className="ml-2 text-indigo-600" />}
          </div>
          <p className="text-xs text-gray-500">
            {participants.length} 位参与者
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onAddAgent}
          title="添加助手"
        >
          <UserPlus size={18} className="text-gray-600" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="搜索消息"
        >
          <Search size={18} className="text-gray-600" />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="群组信息"
        >
          <Info size={18} className="text-gray-600" />
        </button>
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            title="更多选项"
          >
            <MoreVertical size={18} className="text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 overflow-hidden">
              <div className="py-1" onClick={() => setShowMenu(false)}>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                  onClick={toggleStar}
                >
                  <Star
                    size={16}
                    className={`mr-2 ${
                      isStarred
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                  {isStarred ? "取消星标" : "设为星标"}
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                  onClick={togglePin}
                >
                  <Pin
                    size={16}
                    className={`mr-2 ${
                      isPinned ? "text-indigo-600" : "text-gray-500"
                    }`}
                  />
                  {isPinned ? "取消置顶" : "置顶聊天"}
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                  onClick={onAddAgent}
                >
                  <UserPlus size={16} className="mr-2 text-gray-500" />
                  添加助手
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors">
                  <FileText size={16} className="mr-2 text-gray-500" />
                  查看文件
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors">
                  <Bell size={16} className="mr-2 text-gray-500" />
                  消息通知
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
