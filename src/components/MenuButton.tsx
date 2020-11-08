import React from 'react';
import { IconType } from 'react-icons/lib';

interface Props {
    icon: IconType;
    isActive: boolean;
    onClick: any;
}

export default function MenuButton(props: Props) {
    return (
        <button
            type="button"
            className={ props.isActive ? "active" : "" }
            onClick={ props.onClick }
        >
            <props.icon
                size={24}
                color={ props.isActive ? "#0089A5" : "#FFF" }
                style={{ transition:"all .2s"} } 
            />
        </button>
    )
}