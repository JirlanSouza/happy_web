import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import {FiArrowRight} from 'react-icons/fi';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
    const [enterAppFocus, setEnterAppFocus] = useState(false);

    useEffect(() => {
        
    }, [enterAppFocus]);
    
    function handleEnterAppOnFocus() {
        setEnterAppFocus(true);
    }

    function handleEnterAppOffFocus() {
        setEnterAppFocus(false);
    }

    return (
        <div id="page-landing">
        <div className="content-wrapper">
            <div className="wrapper-header">
                <img src={logoImg} alt="Happy"/>

                <div className="location">
                    <strong>Cuiabá</strong>
                    <span>Mato Grosso</span>
                </div>
            </div>

            <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>
                <Link to="/dashboard" className="enter-dashboard">
                    Acesso restrito
                </Link>

                <Link to="/app" className="enter-app"
                    onMouseOver={handleEnterAppOnFocus}
                    onMouseOut={handleEnterAppOffFocus} >

                    <FiArrowRight
                        size={30}
                        color={enterAppFocus ? "#15C3D6" : "#8D734B" }
                    />
                </Link>
        </div>
    </div>

    );
}

export default Landing