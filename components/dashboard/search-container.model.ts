export interface SearchResponse {
  data: Daum[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

export interface Daum {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family?: string;
  hybrid: any;
  authority: any;
  subspecies: any;
  cultivar?: string;
  variety?: string;
  species_epithet: string;
  genus: string;
  default_image?: DefaultImage;
}

export interface DefaultImage {
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
}
