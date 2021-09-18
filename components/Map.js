import React, { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'

function Map({checkData}) {

    const [selectedLocation, setSelectedLocation] = useState({});

    //Transform the search result object into the { latitude: 52.536262, longitude: 12.367387} object
    
    const coordinates = checkData.map((result) =>({
        longitude: result.long,
        latitude: result.lat,
    }));

    //The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);
   // console.log("Result Type: ", typeof(center), "Value: ", center.latitude);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL mapStyle="mapbox://styles/juwwy/cktoitny61aup17jqks413n9m"
        mapboxApiAccessToken={process.env.mapbox_key} {...viewport}
        onViewportChange={(nextViewport)=>setViewport(nextViewport )}>
            {checkData.map((result) =>(
                <div key={result.long}>
                    <Marker longitude = {result.long}
                        latitude = {result.lat}
                        offsetLeft = {-20}
                        offsetTop = {-10}>
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin" role="img">📌</p>
                    </Marker>

                    {/* The popup that should show if we click on a Marker */}
                    {selectedLocation.long == result.long? (
                        <Popup onClose={() => setSelectedLocation({})} closeOnClick={true} latitude={result.lat} longitude={result.long}>
                            {result.title}
                        </Popup>
                    ): (
                        false
                    )};
                </div>
            ))};

        </ReactMapGL>
    )
}

export default Map
