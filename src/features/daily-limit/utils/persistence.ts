import { get, set } from 'idb-keyval';

const KEY = 'nogin:daily-limit';

export type PersistedDailyLimit = {
  usedTodayMs: number;
  lastResetDate: string;
  dailyBudgetMs: number;
};

function isValidPersistedLimit(raw: unknown): raw is PersistedDailyLimit {
  if (typeof raw !== 'object' || raw === null) return false;
  const r = raw as Record<string, unknown>;
  return (
    typeof r['usedTodayMs'] === 'number' &&
    r['usedTodayMs'] >= 0 &&
    typeof r['lastResetDate'] === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(r['lastResetDate']) &&
    typeof r['dailyBudgetMs'] === 'number' &&
    r['dailyBudgetMs'] > 0
  );
}

export async function loadDailyLimit(): Promise<PersistedDailyLimit | null> {
  try {
    const raw = await get<PersistedDailyLimit>(KEY);
    return isValidPersistedLimit(raw) ? raw : null;
  } catch {
    return null;
  }
}

export async function saveDailyLimit(data: PersistedDailyLimit): Promise<void> {
  try {
    await set(KEY, data);
  } catch {
    // Non-fatal
  }
}
