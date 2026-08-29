// ⚠️ DEMO ONLY: VITE_OPENROUTER_API_KEY is exposed client-side via import.meta.env.
// Never ship production apps with API keys in frontend bundles — use a backend proxy.

export const OPENROUTER_MODEL =
  import.meta.env.VITE_OPENROUTER_MODEL ?? 'openrouter/free';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function sendChatMessage(messages, userContext) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your .env file.',
    );
  }

  const systemPrompt = `You are Nexora AI, an assistant inside a career and recruitment platform called Nexora. You help candidates understand skill gaps, career paths, and job matches, and help recruiters understand candidate quality and hiring insights. Be concise, encouraging, and practical. Use bullet points when listing multiple items.

Here is the current user's context:
${JSON.stringify(userContext, null, 2)}

Answer questions about their profile, career advice, skill gaps, or how Nexora's matching works. If asked about data not in context, explain what Nexora would typically show and suggest they explore the relevant dashboard section.`;

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Nexora Talent Platform',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'No response received.';
}
