import React, { useEffect, useRef } from "react";
import { Message } from "../types";
import { UserPlus, Settings } from "lucide-react";
import { getAgentIcon } from "../data/agents";

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  onManageAgents: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  currentUserId,
  onManageAgents,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageContent = (content: string) => {
    // Handle code blocks
    const codeBlockRegex = /```([\s\S]*?)```/g;
    let formattedContent = content.replace(codeBlockRegex, (match, code) => {
      return `<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto my-2 text-sm font-mono">${code}</pre>`;
    });

    // Handle inline code
    const inlineCodeRegex = /`([^`]+)`/g;
    formattedContent = formattedContent.replace(
      inlineCodeRegex,
      (match, code) => {
        return `<code class="bg-gray-100 px-1 rounded text-sm font-mono">${code}</code>`;
      }
    );

    // Handle bullet points
    const bulletPointRegex = /^- (.*)$/gm;
    formattedContent = formattedContent.replace(
      bulletPointRegex,
      (match, text) => {
        return `<div class="flex items-start my-1.5">
                <span class="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0"></span>
                <span>${text}</span>
              </div>`;
      }
    );

    // Handle numbered lists
    const numberedListRegex = /^(\d+)\. (.*)$/gm;
    formattedContent = formattedContent.replace(
      numberedListRegex,
      (match, number, text) => {
        return `<div class="flex items-start my-1.5">
                <span class="mr-2 font-medium text-gray-700">${number}.</span>
                <span>${text}</span>
              </div>`;
      }
    );

    // Handle sections like "问题："
    const sectionRegex = /(问题|需求|步骤|解决方案)：(.*?)(?=\n|$)/g;
    formattedContent = formattedContent.replace(
      sectionRegex,
      (match, section, content) => {
        return `<div class="font-medium text-gray-800 mb-1">${section}：<span class="font-normal">${content}</span></div>`;
      }
    );

    // Convert newlines to <br> tags
    formattedContent = formattedContent.replace(/\n/g, "<br>");

    return formattedContent;
  };

  const renderMessageContent = (content: string) => {
    return { __html: formatMessageContent(content) };
  };

  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {Object.keys(messageGroups).map((date) => (
        <div key={date}>
          <div className="flex justify-center my-4">
            <div className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
              {date}
            </div>
          </div>

          {messageGroups[date].map((message, index) => {
            const isCurrentUser = message.senderId === currentUserId;
            const isAgent = message.isAgent;

            // Determine if we should show the avatar (first message or different sender from previous)
            const showAvatar =
              index === 0 ||
              messageGroups[date][index - 1].senderId !== message.senderId;

            // Get avatar component
            let avatarComponent;
            if (message.senderAvatar.startsWith("http")) {
              avatarComponent = (
                <img
                  src={message.senderAvatar}
                  alt={message.senderName}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              );
            } else {
              const AgentIcon = getAgentIcon(message.senderAvatar);
              avatarComponent = (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isAgent
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <AgentIcon size={16} />
                </div>
              );
            }

            return (
              <div
                key={message.id}
                className={`flex mb-5 ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isCurrentUser && showAvatar && (
                  <div className="mr-3 flex-shrink-0">{avatarComponent}</div>
                )}

                {!isCurrentUser && !showAvatar && (
                  <div className="w-11 flex-shrink-0" />
                )}

                <div
                  className={`max-w-[80%] ${
                    isCurrentUser ? "order-1" : "order-2"
                  }`}
                >
                  {showAvatar && (
                    <div
                      className={`text-sm mb-1 ${
                        isCurrentUser ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="font-medium">{message.senderName}</span>
                      <span className="text-gray-500 text-xs ml-2">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-4 py-3 shadow-sm ${
                      isCurrentUser
                        ? "bg-indigo-600 text-white"
                        : isAgent
                        ? "bg-white border border-gray-200 text-gray-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={renderMessageContent(
                        message.content
                      )}
                      className="message-content text-sm leading-relaxed"
                    />
                  </div>
                </div>

                {isCurrentUser && showAvatar && (
                  <div className="ml-3 flex-shrink-0 order-2">
                    {avatarComponent}
                  </div>
                )}

                {isCurrentUser && !showAvatar && (
                  <div className="w-11 flex-shrink-0 order-2" />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-md">
            <UserPlus size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">开始新的对话</h3>
          <p className="text-gray-500 mb-6 max-w-md">
            发送消息开始与AI助手对话，或者添加更多助手来创建多智能体协作。
          </p>
          <div className="flex space-x-4">
            <button
              onClick={onManageAgents}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center shadow-sm transition-all"
            >
              <UserPlus size={18} className="mr-2" />
              添加助手
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center shadow-sm transition-all">
              <Settings size={18} className="mr-2" />
              管理设置
            </button>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
