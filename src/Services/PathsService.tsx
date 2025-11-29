import { http } from "../api/http";

export interface PathListItemDto {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  difficulty: string;
  isPublished: boolean;
  modulesCount: number;
  totalSectionsCount: number;
  totalPrice: number;
  modules: PathModuleListItemDto[];
}

export interface PathDetailsDto extends PathListItemDto {
  userStatus?: string | null;
  userPercentCompleted?: number | null;
  lastModuleId?: string | null;
  lastModuleName?: string | null;
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

// 🔹 GET /api/paths
export async function getAllPaths() {
  return await http
    .get<PathListItemDto[]>("/Paths/get-all-paths")
    .then((r) => r.data);
}

// // 🔹 GET /api/paths/{id}
// export function getPathDetails(id: string) {
//   return http.get<PathDetailsDto>(`/Paths/${id}`).then((r) => r.data);
// }

// 🔹 (opcjonalnie) GET /api/paths/with-progress
export async function getUserEnrolledPaths() {
  return await http
    .get<PathDetailsDto[]>("/Paths/get-user-enrolled-paths")
    .then((r) => r.data);
}
