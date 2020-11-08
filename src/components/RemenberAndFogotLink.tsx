import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/components/remenberAndFogotLink.css';

interface Props {
    remenberLabel: string;
    remenberSignIn: boolean;
    handleRemenberSignIn: any;
    forgotLabel: string;
    forgotLink: string;
}

export default function RemenberAndFogotLink(props: Props) {
    return (
        <div className="component container-checkbox">
            <div className="checkbox-area" onClick={ props.handleRemenberSignIn }>
                <div 
                    className="checkbox"
                    style={{
                        background: props.remenberSignIn ? "#37C77F" : ""
                    }}
                >
                    {props.remenberSignIn && (
                        <FiCheck size={18} color="#FFF" />
                    )}
                </div>

                <label>{ props.remenberLabel }</label>
            </div>

            <Link 
                to={ props.forgotLink }
                className="forgot"
            >
                <label>
                    { props.forgotLabel }
                </label>
            </Link>
        </div>
    )
}