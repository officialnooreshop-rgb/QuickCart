"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const MessagesPage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not signed in
    if (!isSignedIn) {
      toast.error("You must be signed in to view messages");
      return;
    }

    // Check if user is a seller (you can use custom claims or metadata)
    const isSeller = user?.publicMetadata?.role === "seller";
    if (!isSeller) {
      toast.error("You are not authorized to view this page");
      router.push("/");
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages/list");
 const data = await response.json();
setMessages(
  data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(JSON.stringify) // serialize
    .filter((v, i, a) => a.indexOf(v) === i) // remove duplicates
    .map(JSON.parse) // deserialize
);

      } catch (error) {
        console.error("Failed to fetch messages:", error);
        toast.error("Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [isSignedIn, user, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#fffdf8] via-gray-50 to-[#fff7e6]">
      <main className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Customer Inbox</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Messages</h1>
            <p className="mt-2 text-sm text-gray-500">Stay close to the people shopping your collection.</p>
          </div>
          <div className="w-fit rounded-2xl border border-[#f2e1b8] bg-white px-5 py-3 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Total messages</p>
            <p className="mt-1 text-2xl font-bold text-[#1E2A38]">{messages.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[1.5rem] border border-[#f2e1b8] bg-white p-8 text-center text-gray-600 shadow-sm">Loading messages...</div>
        ) : messages.length > 0 ? (
          <ul className="space-y-4 md:space-y-6">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="group rounded-[1.5rem] border border-[#f2e1b8] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(184,134,11,0.12)] md:p-6"
              >
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff2cf] text-lg text-[#b8860b]">✉</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 md:text-base">{msg.name}</p>
                      <p className="text-xs text-gray-500">{msg.email}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 md:text-sm">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="grid gap-3 text-sm text-gray-700 md:grid-cols-3">
                  <p className="rounded-xl bg-gray-50 px-3 py-2"><span className="text-xs text-gray-500">Phone</span><br />{msg.phoneNumber}</p>
                  <p className="min-w-0 whitespace-normal break-words rounded-xl bg-gray-50 px-3 py-2 md:col-span-2"><span className="text-xs text-gray-500">Message</span><br />{msg.message}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">No messages found.</div>
        )}
      </main>

      <Toaster position="top-right" />
    </div>
  );
};

export default MessagesPage;
