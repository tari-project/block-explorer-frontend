import React from 'react';

interface Props {
    title: string;
    color: string;
}

export default function ColorMapItem({ title, color }: Props) {
    return (
        <div>
            <svg width="30" height="30">
                <g>
                    <rect x="0" y="0" rx="5" ry="5" width="20" height="20" fill={color} />
                </g>
            </svg>
            <div className="colorTitle">{title}</div>
        </div>
    )
}