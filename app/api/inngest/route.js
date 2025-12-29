import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion, createUserOrder } from "@/config/inngest";

// Serve Inngest functions via Next.js API route
export const { GET ,POST ,PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder
  ],
});
