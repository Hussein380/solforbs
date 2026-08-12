export interface IProjectFeature {
  title: string;
  subtitle: string;
  desc: string;
  image?: string;
}

export interface IProjectGalleryImage {
  url: string;
  alt?: string;
}

export interface IProject {
  _id: string;
  name: string;
  slug: string;
  industry: string;
  status: 'live' | 'in_development' | 'planned' | string;
  summary: string;
  description?: string;
  liveUrl?: string;
  subdomain?: string;
  videoUrl?: string;
  heroImageUrl?: string;
  gallery: IProjectGalleryImage[];
  features: IProjectFeature[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  launchDate?: string;
  sortOrder?: number;
}
