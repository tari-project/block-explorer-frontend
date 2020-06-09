import React from 'react';
import './SingleBlockViewHeader.css';

interface Props {
    title: string;
}

export default function SingleBlockViewHeader({ title }: Props) {
    return (
        <div className="singleBlockViewHeader">
            <h1>{title}</h1>
            <div className="colorMapping">
                <div>
                    <svg width="30" height="30">
                        <g>
                        <rect x="0" y="0" rx="5" ry="5" width="20" height="20" fill="#F97C0D" />
                        </g>
                    </svg>
                    <div className="colorTitle">Inputs</div>
                </div>
                <div>
                    <svg width="30" height="30">
                        <g>
                            <rect x="0" y="0" rx="5" ry="5" width="20" height="20" fill="#2274AF" />
                        </g>
                    </svg>
                    <div className="colorTitle">Outputs</div>
                </div>
                <div>
                    <svg width="30" height="30">
                        <g>
                            <rect x="0" y="0" rx="5" ry="5" width="20" height="20" fill="#FB576D" />
                        </g>
                    </svg>
                    <div className="colorTitle">Kernels</div>
                </div>
            </div>
        </div>
    );
}
