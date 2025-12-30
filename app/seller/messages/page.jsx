"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages/list");
        const data = await response.json();
        setMessages(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort by newest first
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1">
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length > 0 ? (
            <ul className="space-y-4">
              {messages.map((message) => (
                <li key={message._id} className="p-4 border rounded-lg">
                  <p><strong>Name:</strong> {message.name}</p>
                  <p><strong>Email:</strong> {message.email}</p>
                  <p><strong>Message:</strong> {message.message}</p>
                  <p><strong>Phone:</strong> {message.phoneNumber}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No messages found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;