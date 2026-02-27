/**
 * Onboarding profile — persisted in localStorage so the recommendation
 * system can use it even before a backend is connected.
 */

export interface OnboardingProfile {
    role: string;          // caregiver | professional | educator | other
    ageGroup: string;      // 0-2 | 3-5 | 6-9 | 10-13 | 14-18
    challenges: string[];  // e.g. ["social skills", "sensory sensitivities"]
    goals: string[];       // IDs from onboarding step 4
}

const STORAGE_KEY = 'careclarity_onboarding_profile';

export function saveOnboardingProfile(profile: OnboardingProfile): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
}

export function getOnboardingProfile(): OnboardingProfile | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as OnboardingProfile;
    } catch {
        return null;
    }
}

export function clearOnboardingProfile(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
    }
}
