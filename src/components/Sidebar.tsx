import React, { ReactNode } from 'react';
import { FiArrowLeft, FiPower } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import useAuth from '../contexts/auth';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface Props {
    hasSignOut?: boolean;
    children?: ReactNode;
}

export default function Sidebar(props: Props) {
    const { signOut } = useAuth();
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            <div className="body">
                {props.children}
            </div>

            <footer>
                {props.hasSignOut ? (
                    <button type="button" onClick={signOut}>
                        <FiPower size={24} color="#FFF" />
                    </button>
                ) : (
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                    )}
            </footer>
        </aside>
    );
}
