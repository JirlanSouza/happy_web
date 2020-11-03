import React from 'react';
import { FiActivity, FiEye, FiLifeBuoy } from 'react-icons/fi';

import '../styles/components/inputForm.css';

interface Props {
    label: string;
    type: string;
    typeViewPassword?: boolean;
    value: string;
    handleOnChanged: any;
    handleViewPassword?: any;
    handleNotViewPassword?: any;
}

export default function InputText(props: Props) {
    return (
        <div className="component input-block">
            <label>{ props.label }</label>
            <input
                type={ props.type }
                value={ props.value }
                onChange={ event => props.handleOnChanged(event.target.value) }
            />

            { props.typeViewPassword && (
                <div className="view-password-container" >
                    <FiEye
                        className="view-Password-icon"
                        size={24}
                        color="#8FA7B2"
                        cursor="pointer"
                        onMouseDown={ props.handleViewPassword } 
                        onMouseUp={ props.handleNotViewPassword } 
                    />
                </div>
            )}
        </div>
    );
}