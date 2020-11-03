import React from 'react';

import '../styles/components/buttonSubmit.css';

interface Props {
    isFilled: boolean;
    text: string;
}

export default function ButtonSubmit(props: Props) {
    return (
        <button
            type="button"
            className="component button-submit"
            style={{
                opacity:props.isFilled ? 1 : .5,
                cursor:props.isFilled ? "pointer" : ""
            }}
        >
            {props.text}
        </button>
    );
}