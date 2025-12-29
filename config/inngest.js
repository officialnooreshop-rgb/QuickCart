import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/Models/User";
import Order from "@/Models/Order";
import Product from "@/Models/Product";

export const inngest = new Inngest({ id: "noore-next" });

// Sync user creation
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", name: "Sync User Creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const emails = event.data.email_addresses || [];
    const email = emails[0]?.email_address || "no-email@example.com";

    const userData = {
      _Id: event.data.id,
      email,
      name: `${event.data.first_name} ${event.data.last_name}`,
      imageUrl: event.data.image_url,
    };

    await connectDB();
    await User.findOneAndUpdate({ _Id: event.data.id }, userData, { upsert: true });
  }
);


// Sync user update
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk", name: "Sync User Update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _Id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDB();
    await User.findOneAndUpdate({ _Id: id }, userData, { upsert: true });
  }
);

// Sync user deletion
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk", name: "Sync User Deletion" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findOneAndDelete({ _Id: id });
  }
);



//inngest function to create users order to the database
export const createUserOrder = inngest.createFunction(
{
  id: "create-user-order",
  batchEvents: {
    maxSize: 5,
    timeout:'5s',
  }
},

{ event: "order/created" },

async ({ events }) => {
  await connectDB();

  const orders = [];

  for (const event of events) {
    const orderItems = [];
    for (const item of event.data.items) {
      const product = await Product.findById(item.productId);
      orderItems.push({
        product: product,
        quantity: item.quantity
      });
    }
    orders.push({
      userId: event.data.userId,
      items: orderItems,
      amount: event.data.amount,
      address: event.data.address,
      date: event.data.date
    });
  }

  await Order.insertMany(orders);

  return { success: true, processed: orders.length };
}
)