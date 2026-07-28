const WORDS_PER_MINUTE = 200;

export function getReadingTimeMinutes(text?: string | null) {
  if (!text) {
    return null;
  }

  const words = text.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return null;
  }

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}

export function formatReadingTime(text?: string | null) {
  const minutes = getReadingTimeMinutes(text);

  if (!minutes) {
    return null;
  }

  return `${minutes} min citire`;
}
