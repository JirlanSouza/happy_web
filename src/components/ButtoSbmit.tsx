import React from 'react';

import '../styles/components/buttonSubmit.css';

interface Props {
    isFilled: boolean;
    text: string;
    onClick: any;
}

export default function ButtonSubmit(props: Props) {
    return (
        <button
            type="submit"
            className="component button-submit"
            onClick={ event => props.onClick(event) }
            style={{
                opacity:props.isFilled ? 1 : .5,
                cursor:props.isFilled ? "pointer" : ""
            }}
        >
            {props.text}
        </button>
    );
}