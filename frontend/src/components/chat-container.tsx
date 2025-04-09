import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/use-auth-store";
import { useChatStore } from "../store/use-chat-store";
import ChatHeader from "./chat-header";
import MessageSkeleton from "./skeletons/message-skeleton";
import MessageInput from "./message-input";
import { formatMessageTime } from "../lib/utils";
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(selectedUser?._id || "");

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100/50 rounded-[12px]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser?._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble bg-primary flex flex-col">
                {message.text && (
                  <p className="text-black/80">{message.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
