import axios from 'axios';
import { GoogleDistanceElement, GoogleGeocodingResponse, GoogleLocation } from '../types/GoogleMaps';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';

export const getCoordinates = async (address: string): Promise<GoogleLocation> => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`;
  
    try {
      const response = await axios.get<GoogleGeocodingResponse>(geocodingUrl);
      const data = response.data;
  
      if (data.status !== "OK" || !data.results[0]) {
        throw new Error("Error fetching coordinates from Google Maps API");
      }
  
      const location = data.results[0].geometry.location;
      return location;
    } catch (error) {
      console.error("Geocoding API Error:", error);
      throw new Error("Failed to fetch coordinates");
    }
  };
  

export const getDistanceFromGoogleMaps = async (origin: string, destination: string): Promise<GoogleDistanceElement> => {
    
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
    )}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
    
    return axios.get(googleMapsUrl).then((response) => {
        const data = response.data;

        if (data.status !== "OK" || data.rows[0].elements[0].status !== "OK") {
            throw new Error("Error fetching distance from Google Maps API");
        }

        return data.rows[0].elements[0];
    }).catch((error) => {
        console.error("Error fetching distance:", error);
        throw new Error("Error fetching distance from Google Maps API");
    });
};