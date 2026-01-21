import { http } from "../api/http";

export interface CertificateListItemDto {
  id: string;
  name: string;
  description?: string | null;
  pathId: string;
  pathName: string;
  modulesCount: number;
  price: number;
}

export interface CertificateListItemWithUserProgressDto
  extends CertificateListItemDto {
  userPathPercentCompleted: number;
}

export interface CertificateModuleDto {
  id: string;
  name: string;
  description?: string | null;
  tag: string;
  tier: string;
  difficulty: string;
}

export interface CertificateDetailsDto {
  id: string;
  name: string;
  description?: string | null;
  pathId: string;
  pathName: string;
  price: number;
  overview?: string | null;
  prerequisites?: string | null;
  certificationSteps?: string | null;
  whereToStart?: string | null;
  certificateValidation?: string | null;
  modules: CertificateModuleDto[];
}

export interface CertificatePublicModuleItemDto {
  moduleId: string;
  name: string;
  description?: string | null;
  tag: string;
  difficulty: string;
  tier: string;
}

export interface CertificatePublicDetailsDto {
  id: string;
  name: string;
  description?: string | null;
  pathName: string;
  certificationSteps?: string | null;
  prerequisites?: string | null;
  whereToStart?: string | null;
  certificateValidation?: string | null;
  modules: CertificatePublicModuleItemDto[];
}

export type SinglePathWithModulesDetails = {
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
  startedModules: SinglePathModuleItem[];
  notStartedModules: SinglePathModuleItem[];
  nextModuleId?: string | null;
  nextModuleLastSectionId?: string | null;
};

export type SinglePathModuleItem = {
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
};

const CertificatesApi = {
  getListAnonymous: "/certificates/get-all-certificates",

  getListWithUserProgress: "/certificates/get-all-with-progress",

  getDetailsById: (id: string) => `/certificates/${id}/details`,
};

export async function getCertificates(): Promise<CertificateListItemDto[]> {
  const res = await http.get<CertificateListItemDto[]>(
    CertificatesApi.getListAnonymous
  );
  return res.data;
}

export async function getCertificatesWithUserProgress(): Promise<
  CertificateListItemWithUserProgressDto[]
> {
  const res = await http.get<CertificateListItemWithUserProgressDto[]>(
    CertificatesApi.getListWithUserProgress
  );
  return res.data;
}

export async function getCertificateDetailsById(
  certificateId: string
): Promise<CertificateDetailsDto> {
  const res = await http.get<CertificateDetailsDto>(
    CertificatesApi.getDetailsById(certificateId)
  );
  return res.data;
}

export async function getCertificateDetailsWithUserProgress(
  certificateId: string
): Promise<SinglePathWithModulesDetails> {
  const res = await http.get<SinglePathWithModulesDetails>(
    `/certificates/${certificateId}/details-with-progress`
  );
  return res.data;
}

export async function getCertificatePublicDetailsById(
  certificateId: string
): Promise<CertificatePublicDetailsDto> {
  const res = await http.get<CertificatePublicDetailsDto>(
    `/certificates/${certificateId}/public/details`
  );
  return res.data;
}
