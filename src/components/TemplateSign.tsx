import React, { ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import logoVertical from '../images/logoVertical.svg';
import '../styles/components/templateSign.css';

interface Props {
    children: ReactNode;
    goBack?: boolean;
}

export default function TemplateSign(props: Props) {
    return (
        <div id="sign">
            <div className="content-wrapper">
                <div className="wrapper-body">
                    <img src={logoVertical} alt="Happy" />

                    <div className="wrapper-location">
                        <strong>Cuiabá</strong>
                        <span>Mato Grosso</span>
                    </div>
                </div>

                <div className="container-form">
                    <div className="content-form">
                        { props.goBack && (
                            <button type="button" className="goBack">
                                < FiArrowLeft size={24} color="#15C3D6"/>
                            </button>
                        )}
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}