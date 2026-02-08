import type { TaskComplexity } from '../types';

/**
 * Vypočítá XP potřebné pro dosažení daného levelu
 * Exponenciální růst s multiplikátorem 1.2
 */
export function getXPForLevel(level: number): number {
  let xp = 100; // základ pro level 2
  for (let i = 1; i < level; i++) {
    xp = Math.round(xp * 1.2);
  }
  return xp;
}

/**
 * Vypočítá celkové XP potřebné pro dosažení daného levelu od začátku
 */
export function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXPForLevel(i);
  }
  return total;
}

/**
 * Vypočítá aktuální level na základě celkového XP
 */
export function getLevelFromXP(totalXP: number): { level: number; currentXP: number; xpForNext: number } {
  let level = 1;
  let accumulatedXP = 0;
  
  while (accumulatedXP + getXPForLevel(level) <= totalXP) {
    accumulatedXP += getXPForLevel(level);
    level++;
  }
  
  const currentXP = totalXP - accumulatedXP;
  const xpForNext = getXPForLevel(level);
  
  return { level, currentXP, xpForNext };
}

/**
 * Vrací základní XP pro složitost úkolu
 */
export function getBaseXPForComplexity(slozitost: TaskComplexity): number {
  const xpMap: Record<TaskComplexity, number> = {
    'snadny': 5,
    'stredni': 15,
    'narocny': 30,
    'epicky': 60,
    'legendarni': 120,
  };
  return xpMap[slozitost];
}

/**
 * Vypočítá finální XP pro splnění úkolu včetně bonusů/penalizací
 */
export function calculateTaskXP(
  slozitost: TaskComplexity,
  completedDate: Date,
  deadline?: Date
): number {
  let xp = getBaseXPForComplexity(slozitost);
  
  if (deadline) {
    if (completedDate < deadline) {
      // Bonus za splnění před deadlinem
      xp += 5;
    } else if (completedDate > deadline) {
      // Penalizace za splnění po deadlinu
      xp = Math.floor(xp * 0.5);
    }
  }
  
  return xp;
}

/**
 * XP bonusy pro streak milestones
 */
export function getStreakMilestoneXP(streak: number): number {
  const milestones: Record<number, number> = {
    3: 15,
    7: 40,
    14: 80,
    30: 200,
    60: 400,
    100: 1000,
    365: 5000,
  };
  
  return milestones[streak] || 0;
}

/**
 * Konstanty pro různé bonusy
 */
export const XP_BONUSES = {
  PERFECT_DAY: 25,
  PERFECT_WEEK: 100,
  RETURN_AFTER_BREAK: 30,
};
