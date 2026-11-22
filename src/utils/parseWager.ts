/** Whole REP amount typed by the player, or null when the text is not only digits. */
export const parseWager = (raw: string): number | null => {
    const text = raw.trim();
    return /^\d+$/.test(text) ? Number(text) : null;
};
