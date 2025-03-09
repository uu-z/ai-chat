import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  Calendar,
  FileText,
  Settings,
  Zap,
  Search,
  HelpCircle,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Sidebar */}
      <div className="w-16 bg-indigo-700 flex flex-col items-center py-6 shadow-lg">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Zap size={20} className="text-indigo-700" />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6 flex-1">
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "chat"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("chat")}
            title="聊天"
          >
            <MessageSquare size={22} />
          </button>
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "contacts"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("contacts")}
            title="联系人"
          >
            <Users size={22} />
          </button>
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "schedule"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("schedule")}
            title="日程"
          >
            <Calendar size={22} />
          </button>
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "files"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("files")}
            title="文件"
          >
            <FileText size={22} />
          </button>
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "tools"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("tools")}
            title="工具"
          >
            <Zap size={22} />
          </button>
        </div>
        <div className="mt-auto flex flex-col items-center space-y-6 mb-4">
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "help"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("help")}
            title="帮助"
          >
            <HelpCircle size={22} />
          </button>
          <button
            className={`p-2.5 rounded-xl ${
              activeTab === "settings"
                ? "bg-indigo-800 shadow-md"
                : "hover:bg-indigo-600"
            } text-white transition-colors`}
            onClick={() => setActiveTab("settings")}
            title="设置"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === "chat" ? (
          <div className="flex flex-1 overflow-hidden">{children}</div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="h-16 border-b border-gray-200 px-6 flex items-center bg-white shadow-sm">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab === "contacts" && "联系人"}
                {activeTab === "schedule" && "日程安排"}
                {activeTab === "files" && "文件管理"}
                {activeTab === "tools" && "效率工具"}
                {activeTab === "help" && "帮助中心"}
                {activeTab === "settings" && "设置"}
              </h1>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-md">
                  {activeTab === "contacts" && <Users size={32} />}
                  {activeTab === "schedule" && <Calendar size={32} />}
                  {activeTab === "files" && <FileText size={32} />}
                  {activeTab === "tools" && <Zap size={32} />}
                  {activeTab === "help" && <HelpCircle size={32} />}
                  {activeTab === "settings" && <Settings size={32} />}
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  {activeTab === "contacts" && "联系人管理"}
                  {activeTab === "schedule" && "日程安排"}
                  {activeTab === "files" && "文件管理"}
                  {activeTab === "tools" && "效率工具集"}
                  {activeTab === "help" && "帮助中心"}
                  {activeTab === "settings" && "系统设置"}
                </h2>
                <p className="text-gray-500 mb-6 max-w-md">
                  {activeTab === "contacts" &&
                    "管理您的联系人和群组，添加新的AI助手或人类联系人。"}
                  {activeTab === "schedule" &&
                    "查看和管理您的日程安排，设置提醒和会议。"}
                  {activeTab === "files" &&
                    "管理您的文件和文档，与AI助手一起分析和处理文件。"}
                  {activeTab === "tools" &&
                    "访问各种效率工具，包括任务管理、笔记和翻译等。"}
                  {activeTab === "help" &&
                    "获取使用指南和常见问题解答，了解如何充分利用AI助手。"}
                  {activeTab === "settings" &&
                    "自定义您的应用设置，管理账户和隐私选项。"}
                </p>
                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-all">
                  {activeTab === "contacts" && "添加联系人"}
                  {activeTab === "schedule" && "创建日程"}
                  {activeTab === "files" && "上传文件"}
                  {activeTab === "tools" && "浏览工具"}
                  {activeTab === "help" && "查看指南"}
                  {activeTab === "settings" && "修改设置"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
