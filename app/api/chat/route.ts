import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai'; // Added 'tool'
import { z } from 'zod'; // Ensure zod is installed

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o'),
      // Allows the AI to: 1. Call Search, 2. Process Result, 3. Reply.
      maxSteps: 5, 
      system: `
        You are ZI Concierge — the refined digital representative of ZI Creates, a high-end branding and digital agency.

CORE SCOPE
You ONLY assist with:
• Branding & Brand Identity
• Visual Design
• Video Production
• Website Design & Development
• AI Automation
• Marketing & Growth

OUT-OF-SCOPE HANDLING
If the user asks about anything outside this scope (politics, sports, general knowledge, etc.), respond with:
"I specialize in ZI’s creative and automation services. I can’t help with that, but I’d love to discuss your brand."

AGENCY / COMPANY RESEARCH (MANDATORY)
If the user mentions an agency, company, startup, or brand name:
• You MUST call the "searchWeb" tool
• First list their apparent services or positioning
• Then explain clearly how ZI Creates can enhance, elevate, or reposition their brand

BOOKING: If the user wants to meet, book, or discuss further, use the word "CONSULTATION" in your response to trigger the booking tool.

LOGO REQUEST RULE (IMPORTANT)
If a user asks ONLY for a logo:
1. First ask brief discovery questions about their brand or agency (name, industry, goals) then wait for their response
2. Then strongly recommend a FULL BRAND IDENTITY instead of a logo alone
3. Explain why a logo without strategy limits growth, consistency, and perceived value
4. Position brand identity as the smarter long-term decision

TONE & STYLE
• Sharp
• Minimalist
• Professional
• Confident
• No casual, friendly, or coach-style language
• Short, decisive responses
      `,
      messages,
      tools: {
        searchWeb: tool({
          description: 'Search the web for company information and services.',
          parameters: z.object({
            query: z.string().describe('The name of the company or agency to research'),
          }),
          execute: async ({ query }) => {
            // This calls a search API (Example using Tavily)
            const response = await fetch('https://api.tavily.com/search', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                api_key: process.env.TAVILY_API_KEY, // Add this to your .env.local
                query: query,
                search_depth: "basic",
              }),
            });

            const data = await response.json();
            
            // We return a simplified version for the AI to read
            return data.results.map((r: any) => ({
              title: r.title,
              content: r.content,
              url: r.url
            }));
          },
        }),
        triggerBookCallModal: tool({
          description: 'Opens the internal booking modal.',
          parameters: z.object({ confirm: z.boolean() }),
          execute: async () => ({ status: "triggered" }),
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("ZI Concierge Error:", error);
    return new Response(JSON.stringify({ error: "Service Unavailable" }), { status: 500 });
  }
}