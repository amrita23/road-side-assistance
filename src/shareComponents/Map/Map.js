import React from "react";

const Map = ({ origin,destination,type}) => {

    let place_map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAeXeJS0BA9IykvlFMAg3gOs4y3EKSxPhM&q=${origin}`;
    let direction_map = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAeXeJS0BA9IykvlFMAg3gOs4y3EKSxPhM&origin=${origin}&destination=${destination}`;
    const src = type === "directions" ? direction_map : place_map;

    return (
        <div className="search-map mt-4">
            <iframe
                width="100%"
                height="450"
                frameBorder="0"
                src={src} allowFullScreen>
            </iframe>
        </div>
    )
}

export default Map;