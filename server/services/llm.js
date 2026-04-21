'use strict';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 1000;

const buildPrompt = (title, author, year) => {
  const yearPart = year ? ` (${year})` : '';
  const authorPart = author ? ` by ${author}` : '';
  return (
    'Return ONLY valid JSON: an array of 3 objects. ' +
    'Each object must contain: "title" (string), "author" (string), "year" (number), ' +
    '"isbn13" (string; use "" if unknown or uncertain), "theme" (string, max 200 chars), ' +
    'and "reason" (string, max 200 chars). ' +
    `Recommend 3 books similar to "${title}"${authorPart}${yearPart}. ` +
    'Rules: Do NOT exclude a book if ISBN13 is unknown. Do NOT invent ISBNs. ' +
    'If unsure about ISBN13, set "isbn13" to "". ' +
    'No markdown, no backticks, no comments, no explanations. Output must be valid JSON only.'
  );
};

exports.getRecommendations = async ({ title, author, year }) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: 'user', content: buildPrompt(title, author, year) },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LLM API failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  const text = data.content && data.content[0] && data.content[0].text;
  if (!text) throw new Error('LLM API returned no text');

  const recs = JSON.parse(text);
  if (!Array.isArray(recs)) throw new Error('LLM API did not return an array');
  return recs;
};
