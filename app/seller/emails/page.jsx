'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';
import Footer from '@/components/seller/Footer';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';

const EmailsPage = () => {
  const { getToken, user } = useAppContext();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmails = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/subscriptions', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setEmails(data.subscriptions || []);
      } else {
        toast.error(data.message || 'Failed to load emails');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load emails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchEmails();
  }, [user]);

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#f2e1b8] bg-gradient-to-br from-[#fffdf8] to-[#fff7e6] p-6 shadow-[0_12px_40px_rgba(184,134,11,0.1)] md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b8860b]">Subscriber List</p>
            <h2 className="text-2xl font-semibold text-gray-800">Emails</h2>
          </div>
          <div className="rounded-full bg-[#b8860b] px-4 py-2 text-sm font-semibold text-white">
            {emails.length} subscribed
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : emails.length > 0 ? (
          <div className="grid gap-3">
            {emails.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2cf] text-[#b8860b]">
                    ✉️
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.email}</p>
                    <p className="text-sm text-gray-500">Subscribed on {new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-8 text-center text-gray-600">
            No subscribers yet.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmailsPage;
