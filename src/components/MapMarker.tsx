import { Marker, useMapEvents } from "react-leaflet";

import mapIcon from "../utils/mapIcon";

export interface Position {
    latitude: number;
    longitude: number;
}

interface MapMarkerProps {
    position: Position;
    setPosition: (valus: Position) => void;
}

export default function MapMarker({ position, setPosition }: MapMarkerProps) {
    useMapEvents({
        click: (e) =>
            setPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng }),
    });

    return position.latitude !== 0 ? (
        <Marker
            interactive={false}
            icon={mapIcon}
            position={[position.latitude, position.longitude]}
        />
    ) : (
        <></>
    );
}
