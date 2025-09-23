export type GeocodingError = {
  error: true;
  reason: string;
};

export type GeocodingResults = {
  generationtime_ms: number;
  results?: GeocodingPlaceResult[];
};

export type GeocodingPlaceResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
};
