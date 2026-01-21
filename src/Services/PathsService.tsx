import { http } from "../api/http";

export interface PathListItemDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  difficulty: string;
  isPublished: boolean;
  type: boolean;
  modulesCount: number;
  totalSectionsCount: number;
  totalPrice: number;
  totalReward: number;
  modules: PathModuleListItemDto[];
}

export interface PathDetailsDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  difficulty: string;
  isPublished: boolean;
  userStatus?: string | null;
  userPercentCompleted: number;
  lastModuleId?: string | null;
  lastModuleName?: string | null;
  modules: PathModuleWithProgressDto[];
  nextModuleId: string;
  nextModuleLastSectionId: string;
}

export interface PathModuleWithProgressDto {
  moduleId: string;
  moduleName: string;
  moduleDescription?: string | null;
  tag: string;
  difficulty: string;
  sectionsCount: number;
  rewardAmount: number;
  userStatus?: string | null;
  userPercentCompleted: number;
}

export interface PathModuleListItemDto {
  moduleId: string;
  moduleSlug: string;
  moduleName: string;
  moduleDescription?: string | null;

  difficulty: string;
  sectionsCount: number;
  exercisesCount: number;

  price?: number | null;
  rewardAmount: number;
}

export interface UserPathSimpleItem {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  difficulty: string;
  type: boolean;
  modulesCount: number;
  estimatedHours: number;
  pathType: string;
}

export interface UserPathsListsDto {
  started: UserPathSimpleItem[];
  notStarted: UserPathSimpleItem[];
}

export interface SimplePathWithModulesDetailsDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  difficulty: string;
  tag: string;
  estimatedHours: number;
  modulesCount: number;
  pathPercentCompleted: number;
  hasStarted: boolean;
  interactiveSectionsCount: number;
  totalPrice?: number | null;
  totalRewardAmount: number;
  startedModules: SimplePathModuleItemDto[];
  notStartedModules: SimplePathModuleItemDto[];
  nextModuleId: string;
  nextModuleLastSectionId: string;
}

export interface SimplePathModuleItemDto {
  moduleId: string;
  name: string;
  description: string;
  difficulty: string;
  type: string;
  tier: string;
  category: string;
  estimatedHours: number;
  price?: number | null;
  rewardAmount: number;
  sectionsCount: number;
  interactiveSectionsCount: number;
  userStatus?: string | null;
  userPercentCompleted: number;
}

// 🔹 GET /api/paths
export async function getAllPaths() {
  return await http
    .get<PathListItemDto[]>("/Paths/get-all-paths")
    .then((r) => r.data);
}

// 🔹 (opcjonalnie) GET /api/paths/with-progress
export async function getUserEnrolledPaths() {
  return await http
    .get<PathDetailsDto>("/Paths/get-user-enrolled-path")
    .then((r) => r.data);
}

export async function getUserPathById(pathId: string) {
  return await http
    .get<SimplePathWithModulesDetailsDto>(`/Paths/${pathId}/details`)
    .then((r) => r.data);
}

export async function getUserPathsLists() {
  return await http
    .get<UserPathsListsDto>(`/Paths/user-paths-lists`)
    .then((r) => r.data);
}

export async function unenrollFromPath(pathId: string) {
  return await http
    .post<boolean>(`/Paths/${pathId}/unenroll`)
    .then((r) => r.data);
}

export async function enrollFromPath(pathId: string) {
  return await http
    .post<boolean>(`/Paths/${pathId}/enroll`)
    .then((r) => r.data);
}
