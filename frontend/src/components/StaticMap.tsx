type StaticMapProps = {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  apiKey: string;
};

const StaticMap = ({ origin, destination, apiKey }: StaticMapProps) => {
  const getStaticMapUrl = () => {
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    const originParam = `${origin.latitude},${origin.longitude}`;
    const destinationParam = `${destination.latitude},${destination.longitude}`;
    const pathParam = `path=color:blue|weight:5|${originParam}|${destinationParam}`;
    const markerOrigin = `markers=color:green|label:A|${originParam}`;
    const markerDestination = `markers=color:red|label:B|${destinationParam}`;
    return `${baseUrl}?size=600x300&${pathParam}&${markerOrigin}&${markerDestination}&key=${apiKey}`;
  };

  return (
    <div className="static-map">
      <img
        src={getStaticMapUrl()}
        alt="Mapa com rota"
        className="map-image"
      />
    </div>
  );
};

export default StaticMap;
