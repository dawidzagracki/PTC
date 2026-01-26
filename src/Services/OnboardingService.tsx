import { http } from "../api/http";
import type { OnboardingRequest } from "../Models/OnboardingRequest";

export async function completeOnboarding(payload: OnboardingRequest): Promise<void> {
  await http.post("/onboarding/complete", payload);
}

export async function skipOnboarding(): Promise<void> {
  await http.post("/onboarding/skip");
}
