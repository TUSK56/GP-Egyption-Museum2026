export type AdminNamedRef = {
  id?: string;
  name?: string;
};

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  region?: string;
  lastLogin?: string;
  createdAt?: string;
  role?: { name?: string };
};

export type AdminCategory = {
  id: string;
  name: string;
  color?: string;
};

export type AdminEra = {
  id: string;
  name: string;
  color?: string;
  startYear?: number;
  endYear?: number;
};

export type AdminArtifact = {
  id: string;
  slug?: string;
  eraId?: string;
  categoryId?: string;
  materialId?: string;
  modelFileId?: string;
  createdAt?: string;
  era?: AdminNamedRef | null;
  category?: AdminNamedRef | null;
  material?: AdminNamedRef | null;
  discoveryLocation?: AdminNamedRef | null;
  thumbnailFile?: { url?: string } | null;
  modelFile?: { id?: string; url?: string } | null;
  translations?: Array<{
    languageCode?: string;
    name?: string;
    description?: string;
    historicalStory?: string;
  }>;
};
