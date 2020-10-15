import React from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanagesMap.css';
import 'leaflet/dist/leaflet.css';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [48, 58],
    iconAnchor: [24, 58],
    popupAnchor: [174, 13],
})

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Cuiabá</strong>
                    <span>Mato Grosso</span>
                </footer>
            </aside>

            <Map
                center={[-15.5970906, -56.0953447]}
                zoom={14}
                style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker 
                position={[-15.5970940, -56.1153441]}
                icon={mapIcon}>
                    <Popup closeButton={false} minWidth={240} className="map-popup">
                        Casa de Happy e Kids.

                        <Link to="">
                            <FiArrowRight size={20} color="#FFF" />
                        </Link>
                    </Popup>
                </Marker>
                
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;