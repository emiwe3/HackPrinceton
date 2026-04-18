import "dotenv/config";
import { im } from "./client.js";
import { getAIResponse } from "./ai.js";

console.log("🤖 PulsePoint is starting...");

for await (const event of im.messages.subscribe("message.received")) {
  const { message, chatGuid } = event;

  if (!message.text || message.isFromMe) continue;

  console.log(`📩 Received: "${message.text}" from ${chatGuid}`);

  const reply = await getAIResponse(message.text, String(chatGuid));
  await im.messages.send(chatGuid, reply);
  console.log(`📤 Replied: "${reply}"`);
}
