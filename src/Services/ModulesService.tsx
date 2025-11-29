import { http } from "../api/http";

export interface ModuleListItemDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  type: string;
  tier: string;
  category?: string | null;
  difficulty: string;
  price?: number | null;
  rewardAmount: number;
  sectionsCount: number;
  exercisesCount: number;
  estimatedHours?: number | null;
  isPublished: boolean;
}

export interface ModuleWithUserProgressDto extends ModuleListItemDto {
  userStatus?: string | null;
  userPercentCompleted?: number | null;
  lastSectionId?: string | null;
}

export interface ModuleSectionDto {
  id: string;
  slug: string;
  title: string;
  orderIndex: number;
  isInteractive: boolean;
  isCurrent: boolean;
}

export interface ModuleDetailsDto extends ModuleListItemDto {
  userStatus?: string | null;
  userPercentCompleted?: number | null;
  lastSectionId?: string | null;
  sections: ModuleSectionDto[];
}

// 🔹 GET /api/modules – wszystkie moduły
export async function getAllModules() {
  return await http
    .get<ModuleListItemDto[]>("/modules/get-all-modules")
    .then((r) => r.data);
}

// 🔹 GET /api/modules/with-progress – moduły + user progress
export async function getAllModulesWithUserProgress() {
  return await http
    .get<ModuleWithUserProgressDto[]>(
      "/Modules/get-all-modules-with-user-progress"
    )
    .then((r) => r.data);
}

// 🔹 GET /api/modules/{id} – szczegóły modułu
export async function getUserModuleWithSections(id: string) {
  return await http.get<ModuleDetailsDto>(`/Modules/${id}`).then((r) => r.data);
}
