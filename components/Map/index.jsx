import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/tanvinh1502/cktb7jbzg7lo717qond2s7x1v"
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                            role="img"
                        >
                            📌
                        </p>
                    </Marker>
                    {/* The popup that shoild show if we click on a Market */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                            className='z-50'
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
