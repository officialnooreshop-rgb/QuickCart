import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await axios.post('/api/subscriptions', { email });
      if (data.success) {
        toast.success(data.message || 'Subscribed successfully');
        setEmail("");
      } else {
        toast.error(data.message || 'Unable to subscribe');
      }
    } catch (error) {
      toast.error(error.message || 'Unable to subscribe');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[2rem] border border-[#f2e1b8] bg-gradient-to-br from-[#fff8e8] via-[#fffdf8] to-[#f6ead0] px-5 py-10 shadow-[0_18px_45px_rgba(184,134,11,0.16)] sm:px-8 md:px-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(184,134,11,0.16),_transparent_40%)]" />
      <div className="relative flex flex-col items-center justify-center text-center space-y-5">
        <div className="rounded-full border border-[#b8860b]/20 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b8860b]">
          Stay in the Loop
        </div>
        <h1 className="text-xl font-bold text-[#1E2A38] sm:text-2xl md:text-3xl">
          Subscribe now to our latest deals!
        </h1>
        <p className="max-w-lg text-sm leading-relaxed text-gray-700 sm:text-base">
          Be the first to know about fresh arrivals, exclusive offers, and styling inspiration for your next favorite outfit.
        </p>

        <div className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-full border border-[#e7d4aa] bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm focus:border-[#b8860b] focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20"
          />
          <button
            onClick={handleSubscribe}
            disabled={submitting}
            className="w-full rounded-full bg-[#B8860B] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a7780a] disabled:opacity-70 sm:w-auto"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </div>

      <style jsx>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.7) inset !important;
          -webkit-text-fill-color: #1E2A38 !important;
        }
      `}</style>
    </div>
  );
};

export default NewsLetter;
