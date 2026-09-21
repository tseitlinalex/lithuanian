/**
 * Normalizes Lithuanian text for fuzzy answer matching.
 *
 * Rules:
 * - Converts to lowercase.
 * - Trims surrounding whitespace.
 * - Collapses multiple internal spaces into a single space.
 * - Replaces Lithuanian diacritics with their base ASCII equivalents:
 *   ą -> a, č -> c, ę -> e, ė -> e, į -> i, š -> s, ų -> u, ū -> u, ž -> z
 * - Handles both decomposed (NFD) and precomposed unicode characters.
 *
 * @param {string} str - The string to normalize.
 * @returns {string} Normalized ASCII lowercase string.
 */
export function normalizeText(str) {
  if (!str) return '';

  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // Decompose characters with diacritics (e.g. š -> s + ˇ)
    .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
    .replace(/ą/g, 'a')
    .replace(/č/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ė/g, 'e')
    .replace(/į/g, 'i')
    .replace(/š/g, 's')
    .replace(/ų/g, 'u')
    .replace(/ū/g, 'u')
    .replace(/ž/g, 'z')
    .replace(/\s+/g, ' ');
}

/**
 * Checks whether user typed input matches the expected answer, taking into account
 * Lithuanian diacritic normalization and optional whitespace tolerance.
 *
 * @param {string} input - User input string.
 * @param {string|string[]} answer - Correct answer or list of acceptable answers.
 * @returns {boolean} True if input matches any valid answer.
 */
export function checkAnswerMatch(input, answer) {
  const normInput = normalizeText(input);
  if (!normInput) return false;

  const answersArray = Array.isArray(answer) ? answer : [answer];

  return answersArray.some(ans => normalizeText(ans) === normInput);
}
