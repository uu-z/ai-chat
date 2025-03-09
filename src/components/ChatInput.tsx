import React, { useState, useRef } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Image,
  FileText,
  Calendar,
  Zap,
  X,
} from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      // In a real app, we'd handle attachments differently
      const fullMessage = [
        message,
        ...attachments.map((a) => `[附件: ${a}]`),
      ].join("\n");

      onSendMessage(fullMessage);
      setMessage("");
      setAttachments([]);
    }
  };

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // In a real app, we'd start recording here
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newAttachments = Array.from(files).map((file) => file.name);
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const quickActions = [
    { icon: Image, label: "图片" },
    { icon: FileText, label: "文件" },
    { icon: Calendar, label: "日程" },
    { icon: Zap, label: "效率工具" },
  ];

  return (
    <div className="border-t border-gray-200 bg-white shadow-sm">
      {attachments.length > 0 && (
        <div className="px-4 pt-3 flex flex-wrap gap-2">
          {attachments.map((name, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-md px-3 py-1.5 flex items-center text-sm shadow-sm"
            >
              <FileText size={14} className="mr-1.5 text-indigo-500" />
              <span className="truncate max-w-[150px] text-gray-700">
                {name}
              </span>
              <button
                onClick={() => removeAttachment(index)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showToolbar && (
        <div className="px-4 py-3 border-t border-gray-200 flex overflow-x-auto gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-2 min-w-[64px] hover:bg-gray-50 rounded-lg transition-colors"
              onClick={
                action.label === "图片" || action.label === "文件"
                  ? handleFileClick
                  : undefined
              }
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-1 shadow-sm">
                <action.icon size={18} />
              </div>
              <span className="text-xs text-gray-600 font-medium">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 flex items-center">
        <button
          type="button"
          onClick={toggleToolbar}
          className={`p-2 rounded-full ${
            showToolbar
              ? "bg-indigo-100 text-indigo-600"
              : "text-gray-500 hover:bg-gray-100"
          } mr-2 transition-colors`}
          title="添加附件"
        >
          <Paperclip size={18} />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isRecording ? "正在录音..." : "输入消息..."}
            className={`w-full py-2.5 px-4 ${
              isRecording ? "bg-red-50" : "bg-gray-100"
            } rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm text-gray-700`}
            disabled={isRecording}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
            title="表情"
          >
            <Smile size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={toggleRecording}
          className={`p-2 ml-2 rounded-full ${
            isRecording
              ? "bg-red-500 text-white animate-pulse shadow-md"
              : "text-gray-500 hover:bg-gray-100"
          } transition-colors`}
          title="语音输入"
        >
          <Mic size={18} />
        </button>

        <button
          type="submit"
          disabled={!message.trim() && attachments.length === 0}
          className={`p-2 ml-2 rounded-full ${
            message.trim() || attachments.length > 0
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              : "bg-gray-200 text-gray-400"
          } transition-colors`}
          title="发送"
        >
          <Send size={18} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </form>
    </div>
  );
};

export default ChatInput;
