export function safeJsonParse(data) {
  try {
    return JSON.parse(data);
  } catch {
    return undefined;
  }
}
