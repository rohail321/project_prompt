import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all prompt", { status: 500 });
  }
};
