
import { ScoreEntry } from '../types';

const STORAGE_KEY = 'quadramaster_scores';

// Mock initial data to make the leaderboard look populated
const INITIAL_DATA: ScoreEntry[] = [
  { name: 'Dr. Einstein', score: 1250, date: new Date('2024-03-20').toLocaleDateString() },
  { name: 'Pythagoras 2.0', score: 1120, date: new Date('2024-03-19').toLocaleDateString() },
  { name: 'MathWizard', score: 980, date: new Date('2024-03-20').toLocaleDateString() },
];

/**
 * Persists a new score entry. 
 * In a real-world scenario, this would call Supabase or Firebase.
 */
export const saveScore = async (entry: ScoreEntry): Promise<void> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const existingScores = await getScores();
  const updatedScores = [...existingScores, entry].sort((a, b) => b.score - a.score);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
};

/**
 * Retrieves all score entries.
 */
export const getScores = async (): Promise<ScoreEntry[]> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return INITIAL_DATA;
  }
  try {
    return JSON.parse(stored) as ScoreEntry[];
  } catch {
    return INITIAL_DATA;
  }
};
