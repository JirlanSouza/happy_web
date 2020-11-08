import React, { useState } from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiEdit3, FiTrash } from 'react-icons/fi';
import Spinner from '../components/Spinner';

import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanagesDashboard.css';

interface Orphanage {
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        id: string
        url: string;
    }>
}


export default function OrphanagesDashboard() {
    const [isLoadede, setIsLoaded] = useState(false);

    const orphanage = {
        latitude: -15.608222,
        longitude: -56.101901,
    }
    
    const orphanages = []
    for (let i = 0; i < 10; i++) {
        orphanages.push("a");
    }
    setTimeout(() => {
        setIsLoaded(true);
    }, 500)

    if (!isLoadede) {
        return <Spinner />
    }

    return (
        <div className="container-orphanages-dashboard" >
            <div className="header-orphanages-dashboard" >
                <h1>Orfanatos cadastrados</h1>
                <span>{orphanages.length} Orfanatos</span>
            </div>

            <div className="orphanages-dashboard-grid" >
                {orphanages.map((item, index) => {
                    return (
                        <div className="orphanage-card" key={ index }  >
                            <Map
                                center={[orphanage.latitude, orphanage.longitude]}
                                zoom={16}
                                style={{ width: '100%', height: 227 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                            </Map>

                            <footer>
                                <h2>Orrf. Esperança</h2>

                                <div className="buttons-container" >
                                    <button type="button" >
                                        <FiEdit3 size={24} color="#15C3D6" />
                                    </button>

                                    <button type="button" >
                                        <FiTrash size={24} color="#15C3D6" />
                                    </button>
                                </div>
                            </footer>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}