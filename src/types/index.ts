export interface InformationProps {
  name: string;
  contact: { id: number; name: string; href: string; isEmail?: boolean }[];
  markdown?: string;
  imgSrc?: string;
}

export interface WorkExperienceProps {
  id: number;
  name: string;
  description?: string;
  position: string;
  period: string[];
  markdown?: string;
  imgSrc?: string;
}

export type GalleryItem =
  | string
  | { src: string; url?: string; label?: string; description?: string }
  | {
      images: (string | { src: string; label?: string; description?: string })[];
      url?: string;
      label?: string;
      thumbnail?: string;
      scrollTo?: string;
    };

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  repoUrl: string;
  webUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  isTeam?: boolean;
  period: string[];
  stack: string[];
  markdown?: string;
  imgSrc?: string;
  gallery?: GalleryItem[];
}

export interface AwardProps {
  id: number;
  name: string;
  date: string;
  organizer: string;
  description: string;
  gallery?: GalleryItem[];
}

export interface CertificateProps {
  id: number;
  name: string;
  date: string;
  organizer: string;
  gallery?: GalleryItem[];
}

export interface ActivityProps {
  id: number;
  name: string;
  description: string;
  period: string[];
  gallery?: GalleryItem[];
}

export interface DataProps {
  resumeTitle: {
    title: string;
  };
  information: InformationProps;
  workExperience: WorkExperienceProps[];
  project: ProjectProps[];
  activity: ActivityProps[];
  education: {
    id: number;
    name: string;
    description: string;
    period: string[];
  }[];
  certificate: CertificateProps[];
  award: AwardProps[];
}
