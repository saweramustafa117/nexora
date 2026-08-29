// ⚠️ DEMO ONLY: VITE_OPENROUTER_API_KEY is exposed client-side via import.meta.env.
// Never ship production apps with API keys in frontend bundles — use a backend proxy.

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const FALLBACK_MODELS = [
  'openrouter/free',
  'google/gemini-2.0-flash-lite-preview-02-05:free',
  'meta-llama/llama-3.2-3b-instruct:free',
];

export const OPENROUTER_MODEL =
  import.meta.env.VITE_OPENROUTER_MODEL ?? 'openrouter/free';

function getModelsToTry() {
  const preferred = OPENROUTER_MODEL;
  return [preferred, ...FALLBACK_MODELS.filter((m) => m !== preferred)];
}

const CANDIDATE_SYSTEM = `You are Nexora AI, a career coach for job candidates on the Nexora platform.
Help with skill gaps, job matches, applications, and career advice. Be concise (2-3 short paragraphs), practical, and encouraging. Use bullet points for lists. Only give candidate-focused advice.`;

const RECRUITER_SYSTEM = `You are Nexora AI, a hiring assistant for recruiters on the Nexora platform.
Help screen candidates, interpret match scores, and prioritize interviews. Be concise (2-3 short paragraphs), data-driven, and professional. Use bullet points for lists. Only give recruiter/hiring advice.`;

function buildSystemPrompt(userContext) {
  const base = userContext.role === 'recruiter' ? RECRUITER_SYSTEM : CANDIDATE_SYSTEM;
  const lines = Object.entries(userContext)
    .filter(([k]) => k !== 'role')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  return `${base}\n\nUser profile data:\n${lines}`;
}

function normalizeMessages(messages) {
  return messages
    .slice(-8)
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content ?? '').trim(),
    }))
    .filter((m) => m.content.length > 0);
}

function extractReply(data) {
  if (data?.error) {
    const msg = data.error.message || data.error.metadata?.raw || JSON.stringify(data.error);
    throw new Error(msg);
  }

  const choice = data?.choices?.[0];
  if (!choice) throw new Error('No response from AI model. Please try again.');

  const message = choice.message ?? {};
  const text =
    (typeof message.content === 'string' ? message.content : '') ||
    (typeof message.reasoning === 'string' ? message.reasoning : '') ||
    (Array.isArray(message.content)
      ? message.content.map((p) => p?.text ?? '').join('')
      : '');

  const trimmed = text.trim();
  if (!trimmed) {
    const reason = choice.finish_reason ?? 'empty';
    throw new Error(`Model returned empty response (${reason}). Click Retry or try again.`);
  }

  return trimmed;
}

async function callModel(model, apiKey, systemPrompt, apiMessages) {
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://nexora.app',
      'X-Title': 'Nexora Talent Platform',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...apiMessages],
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  const raw = await response.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Invalid API response (${response.status}): ${raw.slice(0, 200)}`);
  }

  if (!response.ok) {
    const errMsg = data?.error?.message || raw.slice(0, 300);
    throw new Error(`OpenRouter error ${response.status}: ${errMsg}`);
  }

  return extractReply(data);
}

export async function sendChatMessage(messages, userContext) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      'API key missing. Add VITE_OPENROUTER_API_KEY to .env and restart the dev server.',
    );
  }

  const systemPrompt = buildSystemPrompt(userContext);
  const apiMessages = normalizeMessages(messages);
  const models = getModelsToTry();
  let lastError;

  for (const model of models) {
    try {
      return await callModel(model, apiKey, systemPrompt, apiMessages);
    } catch (err) {
      lastError = err;
      // Try next model only on empty/failed model responses, not auth errors
      if (err.message?.includes('401') || err.message?.includes('403')) break;
    }
  }

  throw lastError ?? new Error('All AI models failed. Please retry.');
}
