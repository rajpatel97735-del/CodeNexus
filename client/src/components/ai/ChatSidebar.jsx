import { MessageSquare, Plus } from "lucide-react";

export default function ChatSidebar() {

  return (

    <div className="chat-sidebar">

      <button className="sidebar-new-chat">

        <Plus size={18} />

        New Chat

      </button>

      <div className="conversation-list">

        <button className="conversation active">

          <MessageSquare size={16} />

          Portfolio Website

        </button>

        <button className="conversation">

          <MessageSquare size={16} />

          Restaurant Website

        </button>

        <button className="conversation">

          <MessageSquare size={16} />

          Ecommerce Store

        </button>

      </div>

    </div>

  );

}