/** Extracts the number from text like "$29.99" or "Item total: $45.98". */
function parsePrice(text) {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return Number(match[1]);
}

module.exports = { parsePrice };
