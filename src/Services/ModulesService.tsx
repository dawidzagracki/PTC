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

export interface ModuleDetailsNoAuth {
  id: string;
  name: string;
  description?: string | null;
  sectionNames: string[];
  summary: string;
  overview: string;
  type: string;
  category: string;
  imageUrl: string;
}

export interface SectionWithUserProgressDto {
  id: string;
  name: string;
  orderIndex: number;
  isCurrent: boolean;
  isCompleted: boolean;
}

export interface ModuleWithUserProgressDto extends ModuleListItemDto {
  userStatus?: string | null;
  userPercentCompleted?: number | null;
  lastSectionId?: string | null;
  isLastEnrolled: boolean;
  sections: SectionWithUserProgressDto[];
  completedSectionsCount: number;
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

export interface SimpleModuleDetails {
  id: string;
  slug: string;
  name: string;
  difficulty: string;
  type: string;
  tier: string;
  category: string;
  estimatedHours: number;
  rating?: number | null;
  price?: number | null;
  reward: number;
  summary?: string | null;
  description?: string | null;
  sectionsCount: number;
  interactiveSectionsCount: number;
  sections: SimpleModuleSection[];
  userPercentCompleted: number;
  currentSectionId?: string | null;
  currentSectionOrderIndex?: number | null;
  isStarted: boolean;
}

export interface SimpleModuleSection {
  id: string;
  name: string;
  orderIndex: number;
  isInteractive: boolean;
}

export interface ModuleFilters {
  category?: string[];
  difficulty?: string[];
  tier?: string[];
  type?: string[];
  state?: string;
  sortBy?: string;
}

export type FilteredModuleListItem = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  type: string;
  tier: string;
  category?: string | null;
  difficulty: string;
  estimatedHours: number;
  price?: number | null;
  rewardAmount: number;
  sectionsCount: number;
  interactiveSectionsCount: number;
  userPercentCompleted: number;
  userState: string;
};

export async function getModuleDetailsById(moduleId: string) {
  return http
    .get<SimpleModuleDetails>(`/modules/${moduleId}/details`)
    .then((r) => r.data);
}

// 🔹 GET /api/modules – wszystkie moduły
export async function getAllModules() {
  return await http
    .get<ModuleListItemDto[]>("/modules/get-all-modules")
    .then((r) => r.data);
}

export async function getModuleDetailsByIdNoAuth(moduleId: string) {
  return await http
    .get<ModuleDetailsNoAuth>(`/modules/${moduleId}/details/public`)
    .then((r) => r.data);
}

// 🔹 GET /api/modules/with-progress – moduły + user progress
export async function getAllModulesWithUserProgress() {
  return await http
    .get<ModuleWithUserProgressDto>(
      "/Modules/get-last-module-with-user-progress"
    )
    .then((r) => r.data);
}

// 🔹 GET /api/modules/{id} – szczegóły modułu
export async function getUserModuleWithSections(id: string) {
  return await http.get<ModuleDetailsDto>(`/Modules/${id}`).then((r) => r.data);
}

export async function getFilteredModules(moduleFilters: ModuleFilters) {
  return await http
    .get<FilteredModuleListItem[]>(
      `/Modules/filtered?category=${moduleFilters.category}&difficulty=${moduleFilters.difficulty}&tier=${moduleFilters.tier}&type=${moduleFilters.type}&state=${moduleFilters.state}&sortBy=${moduleFilters.sortBy}`
    )
    .then((r) => r.data);
}
