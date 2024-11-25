import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';

export const getDistanceFromGoogleMaps = async (origin: string, destination: string) => {
    
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
    )}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
    
    return axios.get(googleMapsUrl).then((response) => {
        const data = response.data;
        console.log(data.rows[0].elements[0]);

        if (data.status !== "OK" || data.rows[0].elements[0].status !== "OK") {
            throw new Error("Error fetching distance from Google Maps API");
        }

        return data.rows[0].elements[0];
    }).catch((error) => {
        console.error("Error fetching distance:", error.message || error);
        throw new Error("Error fetching distance from Google Maps API");
    });
};