"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/seller/Sidebar";
import toast, { Toaster } from "react-hot-toast";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages/list");
        const data = await response.json();
        setMessages(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        toast.error("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <div className="flex-1 flex flex-col">
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Messages</h1>

          {loading ? (
            <p className="text-gray-700">Loading messages...</p>
          ) : messages.length > 0 ? (
            <ul className="space-y-4 md:space-y-6">
              {messages.map((msg) => (
                <li
                  key={msg._id}
                  className="p-4 md:p-6 border border-gray-200 rounded-2xl shadow hover:shadow-lg transition bg-white"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{msg.name}</p>
                    <span className="text-xs md:text-sm text-gray-500 mt-1 md:mt-0">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs md:text-sm">
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p className="text-gray-700 text-xs md:text-sm">
                    <strong>Phone:</strong> {msg.phoneNumber}
                  </p>
                  <p className="text-gray-700 text-xs md:text-sm mt-2">
                    <strong>Message:</strong> {msg.message}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No messages found.</p>
          )}
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default MessagesPage;
