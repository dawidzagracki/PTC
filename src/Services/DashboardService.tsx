import { http } from "../api/http";

export interface CategoryProgressDto {
  category: string;
  totalModules: number;
  completedModules: number;
  percentCompleted: number;
}

export async function getCategoryProgress(): Promise<CategoryProgressDto[]> {
  return http.get<CategoryProgressDto[]>("/dashboard/category-progress").then((r) => r.data);
}
