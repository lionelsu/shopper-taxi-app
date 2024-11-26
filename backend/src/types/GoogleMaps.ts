export type GoogleLocation = {
  lat: number;
  lng: number;
}

type GoogleGeocodingResult = {
  geometry: {
    location: GoogleLocation;
  };
};

export type GoogleGeocodingResponse = {
  status: string;
  results: GoogleGeocodingResult[];
};

export type GoogleDistanceElement = {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  status: string;
};
