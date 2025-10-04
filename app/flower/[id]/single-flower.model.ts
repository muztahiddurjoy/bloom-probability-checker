export interface SingleFlower {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family: string;
  hybrid: any;
  authority: any;
  subspecies: any;
  cultivar: string;
  variety: any;
  species_epithet: string;
  genus: string;
  origin: string[];
  type: string;
  dimensions: Dimension[];
  cycle: string;
  attracts: string[];
  propagation: string[];
  hardiness: Hardiness;
  hardiness_location: HardinessLocation;
  watering: string;
  watering_general_benchmark: WateringGeneralBenchmark;
  plant_anatomy: PlantAnatomy[];
  sunlight: string[];
  pruning_month: string[];
  pruning_count: any[];
  seeds: boolean;
  maintenance: string;
  care_guides: string;
  soil: string[];
  growth_rate: string;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  tropical: boolean;
  indoor: boolean;
  care_level: string;
  pest_susceptibility: string[];
  flowers: boolean;
  flowering_season: string;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  harvest_season: string;
  leaf: boolean;
  edible_leaf: boolean;
  cuisine: boolean;
  medicinal: boolean;
  poisonous_to_humans: boolean;
  poisonous_to_pets: boolean;
  description: string;
  default_image: DefaultImage;
  other_images: string;
  xWateringQuality: string;
  xWateringPeriod: string;
  xWateringAvgVolumeRequirement: string;
  xWateringDepthRequirement: string;
  xWateringBasedTemperature: string;
  xWateringPhLevel: string;
  xSunlightDuration: string;
  xTemperatureTolence: string;
  xPlantSpacingRequirement: string;
}

export interface Dimension {
  type: string;
  min_value: number;
  max_value: number;
  unit: string;
}

export interface Hardiness {
  min: string;
  max: string;
}

export interface HardinessLocation {
  full_url: string;
  full_iframe: string;
}

export interface WateringGeneralBenchmark {
  value: string;
  unit: string;
}

export interface PlantAnatomy {
  part: string;
  color: string[];
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
