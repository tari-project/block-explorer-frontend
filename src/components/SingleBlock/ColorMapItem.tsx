import React from 'react';

interface Props {
    title: string;
    className: string;
}

export default function ColorMapItem({ title, className }: Props) {
    return (
        <div>
            <svg width="30" height="30">
                <g>
                    <rect x="0" y="0" rx="5" ry="5" width="20" height="20" className={className} />
                </g>
            </svg>
            <div className="colorTitle">{title}</div>
        </div>
    );
}
