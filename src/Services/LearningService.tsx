import { http } from "../api/http";

export interface ModuleSectionPlayerDto {
  moduleId: string;
  sectionId: string;
  sectionMarkdownBody: string;
  sections: ModuleSectionNavItemDto[];
  modulePercentCompleted: number;
  currentSectionId: string;
  currentSectionNumber: number;
  totalSectionsCount: number;
  completedSectionIds: string[];
}

export interface ModuleSectionNavItemDto {
  id: string;
  name: string;
  orderIndex: number;
  isInteractive: boolean;
}

export async function getModuleSectionPlayer(
  moduleId: string,
  sectionId: string
) {
  return await http
    .get<ModuleSectionPlayerDto>(
      `Learning/modules/${moduleId}/sections/${sectionId}`
    )
    .then((r) => r.data);
}
