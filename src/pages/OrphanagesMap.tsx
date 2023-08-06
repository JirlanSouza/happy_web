import { useEffect, useState } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";
import mapIcon from "../utils/mapIcon";

import api from "../services/api";
import "../styles/pages/orphanagesMap.css";

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get("orphanages").then((response) => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Cuiabá</strong>
                    <span>Mato Grosso</span>
                </footer>
            </aside>

            <MapContainer
                center={[-15.5970906, -56.0953447]}
                zoom={14}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {orphanages.map((orphanage) => {
                    return (
                        <Marker
                            position={[orphanage.latitude, orphanage.longitude]}
                            icon={mapIcon}
                            key={orphanage.id}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                className="map-popup"
                            >
                                {orphanage.name}

                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;
