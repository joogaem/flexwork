export interface FilterItem {
  id: number;
  label: string;
  value: string;
}

export interface Categories {
  jobGroups: FilterItem[];
  locationRequirements: FilterItem[];
  employmentTypes: FilterItem[];
  careerLevels: FilterItem[];
  workingHours: FilterItem[];
}

export interface FilterData {
  categories: Categories;
}