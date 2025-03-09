import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import NewChatModal from "./components/NewChatModal";
import AgentSelector from "./components/AgentSelector";
import AgentMarketplace from "./components/AgentMarketplace";
import AgentManager from "./components/AgentManager";
import { ChatGroup, Message, Agent } from "./types";
import { mockChatGroups, currentUser } from "./data/mockData";
import { availableAgents } from "./data/agents";
import { generateAgentResponse, autoSelectAgents } from "./utils/agentResponse";

function App() {
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>(mockChatGroups);
  const [activeGroupId, setActiveGroupId] = useState<string>(
    mockChatGroups[0]?.id || ""
  );
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [showAgentMarketplace, setShowAgentMarketplace] = useState(false);
  const [showAgentManager, setShowAgentManager] = useState(false);
  const [installedAgents, setInstalledAgents] = useState<Agent[]>(
    availableAgents.filter((agent) => agent.isInstalled)
  );

  const activeGroup = chatGroups.find((group) => group.id === activeGroupId);

  const handleGroupSelect = (groupId: string) => {
    setActiveGroupId(groupId);
  };

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleCreateChat = (name: string, selectedAgents: Agent[]) => {
    const newGroup: ChatGroup = {
      id: `group-${uuidv4()}`,
      name,
      participants: [currentUser, ...selectedAgents],
      messages: [],
    };

    setChatGroups([...chatGroups, newGroup]);
    setActiveGroupId(newGroup.id);
    setShowNewChatModal(false);
  };

  // 自动创建群组并添加合适的Agent
  const createAutoGroup = (content: string) => {
    // 自动选择合适的Agent
    const selectedAgents = autoSelectAgents(content, installedAgents);

    // 创建新群组
    const newGroup: ChatGroup = {
      id: `group-${uuidv4()}`,
      name: `AI助手群 ${new Date().toLocaleString("zh-CN", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      participants: [currentUser, ...selectedAgents],
      messages: [],
      isAutoCreated: true,
      metaPromptTags: selectedAgents.flatMap((agent) => agent.tags || []),
    };

    setChatGroups([...chatGroups, newGroup]);
    return newGroup;
  };

  const handleSendMessage = (content: string) => {
    // 如果没有活跃群组或者活跃群组没有消息，创建一个新的自动群组
    let targetGroup = activeGroup;
    let isNewGroup = false;

    if (!targetGroup || targetGroup.messages.length === 0) {
      targetGroup = createAutoGroup(content);
      setActiveGroupId(targetGroup.id);
      isNewGroup = true;
    }

    const newMessage: Message = {
      id: `msg-${uuidv4()}`,
      content,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      timestamp: Date.now(),
      isAgent: false,
    };

    // Update the chat group with the new message
    const updatedGroups = chatGroups.map((group) => {
      if (group.id === targetGroup.id) {
        return {
          ...group,
          messages: [...group.messages, newMessage],
        };
      }
      return group;
    });

    // 如果是新创建的群组，需要添加到群组列表中
    if (isNewGroup) {
      updatedGroups.push({
        ...targetGroup,
        messages: [newMessage],
      });
    }

    setChatGroups(updatedGroups);

    // Generate responses from agents in this group
    const agents = targetGroup.participants.filter(
      (p) => "metaPrompt" in p
    ) as Agent[];

    // Simulate a delay for each agent response
    agents.forEach((agent, index) => {
      setTimeout(() => {
        const response = generateAgentResponse(content, agent);

        const agentMessage: Message = {
          id: `msg-${uuidv4()}`,
          content: response,
          senderId: agent.id,
          senderName: agent.name,
          senderAvatar: agent.avatar,
          timestamp: Date.now(),
          isAgent: true,
        };

        setChatGroups((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id === targetGroup.id) {
              return {
                ...group,
                messages: [...group.messages, agentMessage],
              };
            }
            return group;
          })
        );
      }, 1000 + index * 1500); // Stagger the responses
    });
  };

  const handleAgentSelect = (agent: Agent) => {
    if (!activeGroup) return;

    // Check if the agent is already in the group
    const isAgentInGroup = activeGroup.participants.some(
      (p) => "id" in p && p.id === agent.id
    );

    if (isAgentInGroup) {
      // Remove the agent from the group
      const updatedGroups = chatGroups.map((group) => {
        if (group.id === activeGroupId) {
          return {
            ...group,
            participants: group.participants.filter(
              (p) => !("id" in p) || p.id !== agent.id
            ),
          };
        }
        return group;
      });

      setChatGroups(updatedGroups);
    } else {
      // Add the agent to the group
      const updatedGroups = chatGroups.map((group) => {
        if (group.id === activeGroupId) {
          return {
            ...group,
            participants: [...group.participants, agent],
          };
        }
        return group;
      });

      setChatGroups(updatedGroups);

      // If there are messages in the group, generate a response from the new agent
      if (activeGroup.messages.length > 0) {
        const lastUserMessage = [...activeGroup.messages]
          .reverse()
          .find((m) => !m.isAgent);

        if (lastUserMessage) {
          setTimeout(() => {
            const response = generateAgentResponse(
              lastUserMessage.content,
              agent
            );

            const agentMessage: Message = {
              id: `msg-${uuidv4()}`,
              content: response,
              senderId: agent.id,
              senderName: agent.name,
              senderAvatar: agent.avatar,
              timestamp: Date.now(),
              isAgent: true,
            };

            setChatGroups((prevGroups) =>
              prevGroups.map((group) => {
                if (group.id === activeGroupId) {
                  return {
                    ...group,
                    messages: [...group.messages, agentMessage],
                  };
                }
                return group;
              })
            );
          }, 1000);
        }
      }
    }

    setShowAgentSelector(false);
  };

  const handleInstallAgent = (agent: Agent) => {
    // 更新agent的安装状态
    const updatedAgent = { ...agent, isInstalled: true };

    // 更新已安装的agent列表
    setInstalledAgents((prev) => [...prev, updatedAgent]);

    // 更新availableAgents中的agent状态
    const updatedAvailableAgents = availableAgents.map((a) =>
      a.id === agent.id ? updatedAgent : a
    );

    // 这里在实际应用中可能需要更新到服务器
  };

  const handleUninstallAgent = (agentId: string) => {
    // 从已安装列表中移除
    setInstalledAgents((prev) => prev.filter((agent) => agent.id !== agentId));

    // 更新availableAgents中的agent状态
    const updatedAvailableAgents = availableAgents.map((a) =>
      a.id === agentId ? { ...a, isInstalled: false } : a
    );

    // 从所有群组中移除该agent
    setChatGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        participants: group.participants.filter(
          (p) => !("id" in p) || p.id !== agentId
        ),
      }))
    );

    // 这里在实际应用中可能需要更新到服务器
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    // 更新已安装的agent列表
    setInstalledAgents((prev) =>
      prev.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent))
    );

    // 更新群组中的agent信息
    setChatGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        participants: group.participants.map((p) =>
          "id" in p && p.id === updatedAgent.id ? updatedAgent : p
        ),
      }))
    );

    // 这里在实际应用中可能需要更新到服务器
  };

  const handleCreateAgent = (newAgentData: Omit<Agent, "id">) => {
    const newAgent: Agent = {
      ...newAgentData,
      id: `agent-custom-${uuidv4()}`,
      isInstalled: true,
      rating: 0,
      downloads: 0,
      isNew: true,
    };

    setInstalledAgents((prev) => [...prev, newAgent]);

    // 这里在实际应用中可能需要更新到服务器
  };

  const handleDeleteAgent = (agentId: string) => {
    // 只能删除自定义agent
    if (!agentId.startsWith("agent-custom-")) return;

    // 从已安装列表中移除
    setInstalledAgents((prev) => prev.filter((agent) => agent.id !== agentId));

    // 从所有群组中移除该agent
    setChatGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        participants: group.participants.filter(
          (p) => !("id" in p) || p.id !== agentId
        ),
      }))
    );

    // 这里在实际应用中可能需要更新到服务器
  };

  return (
    <Layout>
      <Sidebar
        chatGroups={chatGroups}
        activeGroupId={activeGroupId}
        onGroupSelect={handleGroupSelect}
        onNewChat={handleNewChat}
        onOpenAgentMarketplace={() => setShowAgentMarketplace(true)}
        onOpenAgentManager={() => setShowAgentManager(true)}
      />
      <div className="flex flex-col flex-1 h-full">
        {activeGroup && (
          <>
            <ChatHeader
              groupName={activeGroup.name}
              participants={activeGroup.participants}
              onAddAgent={() => setShowAgentSelector(true)}
            />
            <ChatMessages
              messages={activeGroup.messages}
              currentUserId={currentUser.id}
              onManageAgents={() => setShowAgentSelector(true)}
            />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        )}

        {!activeGroup && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">选择或创建一个聊天</h2>
              <p className="text-gray-500 mb-4">
                从左侧选择一个已有的聊天，或者创建一个新的聊天
              </p>
              <button
                onClick={handleNewChat}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                创建新聊天
              </button>
            </div>
          </div>
        )}
      </div>

      {showNewChatModal && (
        <NewChatModal
          availableAgents={installedAgents}
          onCreateChat={handleCreateChat}
          onClose={() => setShowNewChatModal(false)}
        />
      )}

      {showAgentSelector && activeGroup && (
        <AgentSelector
          availableAgents={installedAgents}
          selectedAgents={
            activeGroup.participants.filter((p) => "metaPrompt" in p) as Agent[]
          }
          onSelectAgent={handleAgentSelect}
          onOpenMarketplace={() => {
            setShowAgentSelector(false);
            setShowAgentMarketplace(true);
          }}
          onClose={() => setShowAgentSelector(false)}
        />
      )}

      {showAgentMarketplace && (
        <AgentMarketplace
          installedAgents={installedAgents}
          onInstallAgent={handleInstallAgent}
          onUninstallAgent={handleUninstallAgent}
          onClose={() => setShowAgentMarketplace(false)}
        />
      )}

      {showAgentManager && (
        <AgentManager
          installedAgents={installedAgents}
          onUpdateAgent={handleUpdateAgent}
          onDeleteAgent={handleDeleteAgent}
          onCreateAgent={handleCreateAgent}
          onOpenMarketplace={() => {
            setShowAgentManager(false);
            setShowAgentMarketplace(true);
          }}
          onClose={() => setShowAgentManager(false)}
        />
      )}
    </Layout>
  );
}

export default App;
